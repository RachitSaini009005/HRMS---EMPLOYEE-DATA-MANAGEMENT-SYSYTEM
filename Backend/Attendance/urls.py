from django.urls import path
from Attendance.views import AttendanceView

urlpatterns = [
     path("attendance/",AttendanceView.as_view(),name = "attendance"),
]
