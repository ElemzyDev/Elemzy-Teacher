from rest_framework.serializers import ModelSerializer
from .models import ClassRoom,Student,Semester,Subject
import pdb

class ClassRoomSerializer(ModelSerializer):
    
    class Meta:
        model=ClassRoom
        fields="__all__"


class StudentSerializer(ModelSerializer):
    class Meta:
        model=Student
        fields="__all__"


class SemesterSerializer(ModelSerializer):
    class Meta:

        model=Semester
        fields=['pk','name']


    
class SubjectSerializer(ModelSerializer):

    class Meta:
        model=Subject
        fields=["pk","name","subject_teacher","semester"]

