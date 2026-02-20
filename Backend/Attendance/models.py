from django.db import models
from django.utils import timezone
from Employees.models import Employee

class Attendance(models.Model):
    date = models.DateField(blank= False, null= False,default= timezone.now)
# Create your models here.
    class StatusChoices(models.TextChoices):
        PRESENT = "P","Present"
        ABSENT = "A","Absent"
        # status.ABSENT.label
    status = models.CharField(max_length=1 ,choices = StatusChoices.choices, blank= False, null = False)
    employee = models.ForeignKey(Employee,on_delete= models.CASCADE, related_name= "attendances")

    def __str__(self):
        return f"{self.employee.Full_name}-{self.date}"