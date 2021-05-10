from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from main.models import UserProfile

# Create your models here.
class Teacher(models.Model):
    # name=models.CharField(max_length=100)
    # Base User
    user=models.OneToOneField(UserProfile,on_delete=models.CASCADE,related_name="teacher")
    created_at=models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Teacher- {self.user.firstname}"

class Student(models.Model):
    
    name=models.CharField(max_length=100)
    user=models.OneToOneField(UserProfile, on_delete=models.CASCADE,related_name="student")

    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class ClassRoom(models.Model):
    # /Class Standard like 9th 8th
    standard=models.IntegerField(validators=[MinValueValidator(1,"Class can not be less than 1"),MaxValueValidator(12,"Class can not be greater than 12")])

    # Main Class Teacer
    class_teacher=models.OneToOneField(Teacher,on_delete=models.CASCADE,related_name="classroom")
    # Secondary Teachers
    secondary_teachers=models.ManyToManyField(Teacher,through="TeacherMembership",related_name="classrooms")

    #Students
    students=models.ManyToManyField(Student,related_name="classroom",blank=True)

    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Class Teacher- {self.class_teacher.user.firstname}- Class- {self.standard}"
   

class TeacherMembership(models.Model):
    # The teacher who got the invitation
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name='memberships')
    # The classroom the teacher is invited to
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    # The subject why the teacher is inviteed
    subject=models.CharField(max_length=100)
    date_joined = models.DateField(auto_now_add=True)

    accepted=models.BooleanField(default=False)
    
    created_at=models.DateTimeField(auto_now_add=True)

class StudentProfile(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name="student")
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name="profiles")
    classroom=models.ForeignKey(ClassRoom,on_delete=models.CASCADE) 

    created_at=models.DateTimeField(auto_now_add=True)


class SubjectMarks(models.Model):

    """
        This model will be created when teacher will start the subject,
        it will be created autmatically in case of Class TEACHER

    """

    subject=models.CharField(max_length=30)
    marks=models.IntegerField(default=0)
    student_profile=models.ForeignKey(StudentProfile,on_delete=models.CASCADE)

    created_at=models.DateTimeField(auto_now_add=True)
    teacher=models.ForeignKey(Teacher,related_name="marks",on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.subject} Marks- {self.marks} Student- {self.student.user.firstname}" 
  


class Semester(models.Model):

    name=models.CharField(max_length=100)
    teacher=models.ForeignKey(Teacher,related_name="semesters",on_delete=models.CASCADE)
    classroom=models.ForeignKey(ClassRoom,related_name="semesters",on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)


class Subject(models.Model):
    name=models.CharField(max_length=50)
    # Of which semester the subject is
    semester=models.ForeignKey(Semester,related_name="subjects",on_delete=models.CASCADE)

    #Which teacher is teaching this subject
    subject_teacher=models.ForeignKey(Teacher,related_name="subjects",on_delete=models.CASCADE)

class ClassroomPage(models.Model):
    title=models.CharField(max_length=400)
    content=models.TextField()

    # The subject which it is related to
    subject=models.ForeignKey(Subject,related_name="classroom_pages",on_delete=models.CASCADE)

class StudentResponse(models.Model):
    response_text=models.CharField(max_length=200)

    student=models.ForeignKey(Student,related_name="responses",on_delete=models.CASCADE)
    classroom_page=models.ForeignKey(ClassroomPage,related_name="responses",on_delete=models.CASCADE)

