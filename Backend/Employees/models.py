from django.db import models

# Create your models here.
class Employee(models.Model):
    Employee_Id = models.CharField(max_length=20,primary_key=  True, unique = True,blank = False , null = False ,default="UNDEFINED")
    Full_name = models.CharField(max_length = 150, blank= False , null = False)
    Email_Field = models.EmailField(unique= True, blank= False, null= False)
    Departments = models.CharField(max_length= 100, blank = False, null = False )

    def __str__(self):
        return self.Full_name
