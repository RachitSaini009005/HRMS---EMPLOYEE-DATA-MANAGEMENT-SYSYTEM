from django.shortcuts import render

# Create your views here.
# 1. Employee Management Views
# These views handle the CRUD (Create, Read, Update, Delete) operations for your staff.
# List Employees (GET): Fetches all employee records from the database to show in your frontend table.
# Add Employee (POST): Validates the incoming data (Unique ID, Email format) and saves a new record.
# Note: This must handle the "Duplicate ID" error Django REST Framework Validation.
# Delete Employee (DELETE): Removes a specific employee using their Employee_Id.
# Note: Due to your models.CASCADE setting, this will also delete their attendance.


# from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework import filters

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    lookup_field = 'Employee_Id'
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['Full_name','Department']

    




