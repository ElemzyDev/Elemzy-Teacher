from django.contrib import admin
from .models import Teacher,TeacherMembership,ClassRoom,Student
from .models import ClassroomPage,Semester,Subject,StudentResponse

# Register your models here.

admin.site.register([Teacher,TeacherMembership,ClassRoom,Student,ClassroomPage,Semester,Subject,StudentResponse])
