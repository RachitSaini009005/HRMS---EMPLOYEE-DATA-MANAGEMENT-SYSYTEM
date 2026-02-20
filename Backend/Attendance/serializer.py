from rest_framework import serializers
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    # This helps modern browsers show a calendar in the Browsable API form
    date = serializers.DateField(style={'input_type': 'date'})

    class Meta:
        model = Attendance
        # Including 'id' is a best practice for frontend record tracking
        fields = ['id', 'employee', 'date', 'status']
