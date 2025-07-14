from django.db import models
from django.utils import timezone
import random

# Delegate Card Model
TIERS = (('tier1', 'Issue #1'), ('tier2', 'Deluxe Edition'), ('tier3', 'Collectors Print'))
TIER_PREFIX = {'tier1': 'ISSU', 'tier2': 'DEED', 'tier3': 'COPR'}
TIER_PRICES = {'tier1': 375, 'tier2': 650, 'tier3': 850}

class DelegateCardRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    college_name = models.CharField(max_length=100)
    tier = models.CharField(max_length=10, choices=TIERS)
    amount = models.IntegerField()
    payment_screenshot = models.ImageField(upload_to='delegate_payments/')
    user_id = models.CharField(max_length=20, unique=True, blank=True)
    status = models.CharField(max_length=20, default='pending')
    transaction_id = models.CharField(max_length=50, blank=True)
    is_verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.user_id:
            self.user_id = f"{TIER_PREFIX[self.tier]}-{random.randint(10000, 99999)}"
        self.amount = TIER_PRICES.get(self.tier, 0)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.tier}"

# Event Registration Model
class EventRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    college = models.CharField(max_length=100)
    events = models.JSONField()
    delegate_id = models.JSONField(blank=True, null=True)
    amount = models.PositiveIntegerField(default=0)
    payment_screenshot = models.ImageField(upload_to='event_payments/', null=True, blank=True)
    user_id = models.CharField(max_length=20, blank=True)
    transaction_id = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, default='pending')
    is_verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.user_id:
            self.user_id = f"USER-EV-{random.randint(10000, 99999)}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.events}"

# Pass Purchase Model
PASS_CHOICES = [
    ('sports', 'Sports Pass'), ('cult', 'Cult Pass'),
    ('lit_quiz', 'Literary Quiz Pass'), ('lit_lit', 'Literary Pass'),
    ('lit_premium', 'Premium Literary Pass')
]
PASS_PREFIX = {
    'sports': 'PANA', 'cult': 'PANS',
    'lit_quiz': 'PANFQ', 'lit_lit': 'PANFL',
    'lit_premium': 'PANFP'
}
PASS_AMOUNTS = {
    'sports': 250, 'cult': 250,
    'lit_quiz': 500, 'lit_lit': 500,
    'lit_premium': 750
}

class PassPurchase(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    college_name = models.CharField(max_length=100)
    pass_type = models.CharField(max_length=20, choices=PASS_CHOICES)
    amount = models.IntegerField()
    user_id = models.CharField(max_length=20, unique=True, blank=True)
    transaction_id = models.CharField(max_length=50, blank=True)
    payment_screenshot = models.ImageField(upload_to='pass_screenshots/')
    status = models.CharField(max_length=20, default='pending')
    is_verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.user_id:
            prefix = PASS_PREFIX.get(self.pass_type, 'PANX')
            self.user_id = f"{prefix}-{random.randint(10000, 99999)}"
        self.amount = PASS_AMOUNTS.get(self.pass_type, 0)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.pass_type}"