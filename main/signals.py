from django.db.models.signals import post_save
from .models import UserProfile
from django.dispatch import receiver

from teachers.models import Student,Teacher

import pdb

@receiver(post_save, sender=UserProfile) 
def create_profile(sender, instance, created, **kwargs):

    if created:
        if instance.is_student:
            # Creating Student profile
            Student.objects.create(user=instance,name=instance.firstname)
        elif instance.is_teacher:
            Teacher.objects.create(user=instance)



@receiver(post_save, sender=UserProfile)
def save_profile(sender, instance,created, **kwargs):
    if not created:
        if instance.is_student:
            instance.student.name=instance.firstname
            instance.student.save()
            
        elif instance.is_teacher:
            pass






