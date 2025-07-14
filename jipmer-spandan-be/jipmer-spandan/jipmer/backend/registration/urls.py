from django.urls import path
from .views import (
    DelegateCardRegisterView, verify_registration, reject_delegate_registration, export_verified_delegate_cards,
    EventRegisterView, verify_event_registration, reject_event_registration_soft, export_verified_event_registrations,
    PassPurchaseView, verify_pass, reject_pass_soft, export_verified_passes, check_delegate_eligibility
)

urlpatterns = [
    path('delegate-card/', DelegateCardRegisterView.as_view(), name='delegate-card-register'),
    path('delegate-card/verify/<int:pk>/', verify_registration, name='delegate-card-verify'),
    path('delegate-card/reject/<int:pk>/', reject_delegate_registration, name='reject_delegate_card'),
    path('delegate-card/export/', export_verified_delegate_cards, name='delegate-card-export'),
    path('delegate-card/check/<str:email>/', check_delegate_eligibility, name='check-delegate-eligibility'),
    
    path('event-register/', EventRegisterView.as_view(), name='event-register'),
    path('event-register/verify/<int:pk>/', verify_event_registration, name='event-register-verify'),
    path('event-register/reject/<int:pk>/', reject_event_registration_soft, name='event-register-reject'),
    path('event-register/export/', export_verified_event_registrations, name='event-register-export'),
    
    path('pass-purchase/', PassPurchaseView.as_view(), name='pass-purchase'),
    path('pass-purchase/verify/<int:pk>/', verify_pass, name='verify-pass'),
    path('pass-purchase/reject/<int:pk>/', reject_pass_soft, name='reject-pass'),
    path('pass-purchase/export/', export_verified_passes, name='export-pass'),
]