from django.core.mail import send_mail
import os

def send_smtp_email(to_email, subject, message):
    send_mail(
        subject,
        message,
        os.getenv("DEFAULT_FROM_EMAIL"),  # From
        [to_email],                       # To
        fail_silently=False,
    )
