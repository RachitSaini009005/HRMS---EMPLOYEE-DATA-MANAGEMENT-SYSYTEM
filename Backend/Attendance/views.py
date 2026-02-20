# from django.shortcuts import render

# # Create your views here.
# from rest_framework.views import APIView
# from Employees.models import Employee
# from .models import Attendance
# from rest_framework.response import Response
# from rest_framework import status
# from .serializer import AttendanceSerializer
# from django.shortcuts  import get_object_or_404


# class AttendanceView(APIView):

#     def post(self,request):

      
#         employee_id = request.data.get('Employee_Id')

#         date= request.data.get('date')
#         value_of_status = request.data.get('status')

#         # here it checks the required field
#         if not employee_id or not date or not value_of_status:
#             return Response(
#                   {"error": "all the fields are required"},
#                   status= status.HTTP_400_BAD_REQUEST

#             )
        
#         # we check if the employee exists or not

#         employee = get_object_or_404(Employee,pk =employee_id)

#         # we implement a logic to prevent duplicate attendance
#         if Attendance.objects.filter(employee = employee,date = date).exists():
#             return Response(
#                 {"error":"FOR THIS  DATE  ATTENDANCE  IS  ALREADY MARKED"},
#                 status= status.HTTP_400_BAD_REQUEST
#             )
        
#         attendance = Attendance.objects.create(
#             employee = employee,
#             date = date,
#             status = value_of_status
#         )
#         serializer = AttendanceSerializer(attendance)

#         return Response(serializer.data , status = status.HTTP_201_CREATED)
    
#     def get(self,request):

#         # we write a logic to get the attendance recored of an employee
       
#        employee_id = request.query_params.get("employee")

#        if not employee_id:
#            return Response(
#                {"error":"employee is required"},
#                status=status.HTTP_400_BAD_REQUEST
#            )
#        employee = get_object_or_404(Employee,pk = employee_id)

#        records = Attendance.objects.filter(employee = employee)
#        serializer = AttendanceSerializer(records, many = True)
#        return Response (serializer.data , status = status.HTTP_200_OK)
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Attendance
from .serializer import AttendanceSerializer

class AttendanceView(APIView):

    def get(self, request):
        employee = request.query_params.get("employee")

        if employee:
            records = Attendance.objects.filter(employee_id=employee)
        else:
            records = Attendance.objects.all()

        serializer = AttendanceSerializer(records, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)