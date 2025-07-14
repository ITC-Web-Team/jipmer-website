from django.contrib import admin
from .models import DelegateCardRegistration, EventRegistration, PassPurchase

@admin.register(DelegateCardRegistration)
class DelegateCardAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'tier','payment_screenshot' , 'is_verified', 'verified_at', 'created_at')

@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'amount','payment_screenshot' , 'is_verified', 'verified_at', 'created_at')
  list_filter = ('is_verified',)

@admin.register(PassPurchase)
class PassPurchaseAdmin(admin.ModelAdmin):
  list_display = ('name', 'email','pass_type', 'amount','payment_screenshot' , 'is_verified', 'verified_at', 'created_at')
  list_filter = ('is_verified',)