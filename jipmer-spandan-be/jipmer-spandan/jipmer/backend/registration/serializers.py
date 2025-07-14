from rest_framework import serializers
from .models import EventRegistration, DelegateCardRegistration, PassPurchase
import json


class DelegateCardRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DelegateCardRegistration
        fields = '__all__'
        read_only_fields = ['amount', 'user_id', 'is_verified', 'status', 'verified_at', 'created_at']

class EventRegistrationSerializer(serializers.ModelSerializer):
    payment_screenshot = serializers.ImageField(required=False, allow_null=True)
    delegate_id = serializers.JSONField(required=False, allow_null=True)
    amount = serializers.IntegerField(required=False)
    
    class Meta:
        model = EventRegistration
        fields = '__all__'
        read_only_fields = ['user_id', 'amount', 'is_verified', 'status', 'verified_at', 'created_at']
        
    def validate_events(self, value):
        if not value or len(value) == 0:
            raise serializers.ValidationError("At least one event must be selected")
        return value
    
    def to_internal_value(self, data):
        # Handle JSON string fields
        if isinstance(data.get('events'), str):
            try:
                data['events'] = json.loads(data['events'])
            except json.JSONDecodeError:
                raise serializers.ValidationError({"events": "Invalid JSON format"})
                
        if isinstance(data.get('delegate_id'), str):
            try:
                data['delegate_id'] = json.loads(data['delegate_id'])
            except json.JSONDecodeError:
                raise serializers.ValidationError({"delegate_id": "Invalid JSON format"})
                
        return super().to_internal_value(data)
    
class PassPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassPurchase
        fields = '__all__'
        read_only_fields = ['amount', 'user_id', 'is_verified', 'status', 'verified_at', 'created_at']