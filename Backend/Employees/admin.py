from django.contrib import admin
from .models import Employee
# Register your models here.
admin.site.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('Employee_Id','Full_name','Department')