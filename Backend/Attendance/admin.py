from django.contrib import admin
from .models import Attendance
from Employees.models import Employee

@admin.register(Attendance)

class AttendanceAdmin(admin.ModelAdmin):
    # This  shows multiple columns in the list view
    list_display = ('employee_name','date','status')
    # This adds a filter on the right sidebar (filter by date)
    list_filter = ('date','status')

    def employee_name(self,obj):
        return obj.employee.Full_name

# Register your models here.
