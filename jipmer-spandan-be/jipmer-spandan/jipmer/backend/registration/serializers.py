from rest_framework import serializers
from .models import EventRegistration, DelegateCardRegistration, PassPurchase
import json
import logging
from django.core.exceptions import ValidationError
logger = logging.getLogger(__name__)
from django.utils import timezone


class DelegateCardRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DelegateCardRegistration
        fields = '__all__'
        read_only_fields = ['amount', 'user_id', 'is_verified', 'status', 'verified_at', 'created_at']



class EventRegistrationSerializer(serializers.ModelSerializer):
    payment_screenshot = serializers.ImageField(required=False, allow_null=True)
    delegate_info = serializers.JSONField(required=False, allow_null=True)
    amount = serializers.IntegerField(read_only=True)
    events = serializers.JSONField()

    class Meta:
        model = EventRegistration
        fields = [
            'id', 'user_id', 'name', 'email', 'phone', 'college',
            'events', 'delegate_info', 'amount', 'payment_screenshot',
            'transaction_id', 'status', 'is_verified', 'verified_at',
            'created_at'
        ]
        read_only_fields = [
            'id', 'user_id', 'amount', 'status', 
            'is_verified', 'verified_at', 'created_at'
        ]

    def validate_email(self, value):
        """Normalize and validate email format"""
        value = value.lower().strip()
        if not '@' in value:
            raise serializers.ValidationError("Enter a valid email address")
        return value

    def validate_events(self, value):
        """
        Validate events list structure and content
        """
        if not value:
            logger.error("Empty events list received")
            raise serializers.ValidationError("At least one event must be selected")

        # Convert single event to list
        if isinstance(value, str):
            try:
                value = json.loads(value)
                if not isinstance(value, list):
                    value = [value]
            except json.JSONDecodeError:
                value = [value]

        # Normalize event names
        normalized_events = []
        for event in value:
            event = str(event).lower().strip()
            normalized_events.append(event)

        # Validate against known events
        from .views import CATEGORY_EVENT_MAP  # Import your event mapping
        valid_events = set().union(*CATEGORY_EVENT_MAP.values())
        
        for event in normalized_events:
            if event not in valid_events:
                logger.warning(f"Invalid event detected: {event}")
                raise serializers.ValidationError(f"Invalid event: {event}")

        return normalized_events

    def validate_delegate_info(self, value):
        """
        Validate delegate info structure and verify delegate credentials
        """
        if not value:
            return []

        if not isinstance(value, (list, str)):
            raise serializers.ValidationError("Delegate info must be a list or JSON string")

        # Handle JSON string input
        if isinstance(value, str):
            try:
                value = json.loads(value)
            except json.JSONDecodeError:
                raise serializers.ValidationError("Invalid JSON format for delegate info")

        validated_teammates = []
        for i, teammate in enumerate(value, start=1):
            # Required fields check
            if not isinstance(teammate, dict):
                raise serializers.ValidationError(f"Teammate {i} must be an object")

            required_fields = ['delegate_id', 'email', 'name']
            if not all(field in teammate for field in required_fields):
                missing = [f for f in required_fields if f not in teammate]
                raise serializers.ValidationError(
                    f"Teammate {i} missing required fields: {', '.join(missing)}"
                )

            # Normalize email
            teammate['email'] = teammate['email'].lower().strip()

            # Verify delegate exists and is verified
            try:
                delegate = DelegateCardRegistration.objects.get(
                    user_id=teammate['delegate_id'],
                    email=teammate['email'],
                    is_verified=True
                )
                
                # Use verified data instead of user input
                validated_teammates.append({
                    'delegate_id': delegate.user_id,
                    'email': delegate.email,
                    'name': delegate.name,
                    'phone': teammate.get('phone', ''),
                    'college': delegate.college_name
                })

            except DelegateCardRegistration.DoesNotExist:
                logger.warning(
                    f"Invalid delegate attempt: {teammate['delegate_id']} ({teammate['email']})"
                )
                raise serializers.ValidationError(
                    f"Delegate {teammate['delegate_id']} not found or not verified"
                )

        return validated_teammates

    def validate(self, data):
        """
        Final cross-field validation
        """
        # Verify payment requirements for paid events
        if data.get('events'):
            from .views import EVENT_PRICE_MAP  # Import your price map
            total_amount = sum(EVENT_PRICE_MAP.get(event, 0) for event in data['events'])
            
            if total_amount > 0:
                if not data.get('payment_screenshot'):
                    raise serializers.ValidationError(
                        "Payment screenshot required for paid events"
                    )
                if not data.get('transaction_id'):
                    raise serializers.ValidationError(
                        "Transaction ID required for paid events"
                    )
        
        # Verify delegate requirements for non-exempt events
        from .views import EXEMPT_EVENTS  # Import your exempt events
        needs_delegate = any(
            event not in EXEMPT_EVENTS
            for event in data.get('events', [])
        )
        
        if needs_delegate and not data.get('delegate_info'):
            raise serializers.ValidationError(
                "Delegate information required for selected events"
            )

        return data

    def create(self, validated_data):
        """
        Custom create with additional processing
        """
        # Auto-generate user_id if not set
        if not validated_data.get('user_id'):
            validated_data['user_id'] = f"EVENT-{timezone.now().strftime('%Y%m%d')}-{EventRegistration.objects.count() + 1}"
        
        # Calculate amount
        from .views import EVENT_PRICE_MAP
        validated_data['amount'] = sum(
            EVENT_PRICE_MAP.get(event, 0)
            for event in validated_data['events']
        )

        try:
            instance = super().create(validated_data)
            logger.info(f"New event registration created: {instance.user_id}")
            return instance
        except Exception as e:
            logger.error(f"Failed to create registration: {str(e)}")
            raise

    def to_representation(self, instance):
        """
        Custom output representation
        """
        ret = super().to_representation(instance)
        # Format dates for output
        ret['created_at'] = instance.created_at.strftime('%Y-%m-%d %H:%M')
        if instance.verified_at:
            ret['verified_at'] = instance.verified_at.strftime('%Y-%m-%d %H:%M')
        return ret
    
class PassPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassPurchase
        fields = '__all__'
        read_only_fields = ['amount', 'user_id', 'is_verified', 'status', 'verified_at', 'created_at']