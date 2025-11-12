from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated, AllowAny

class IsTeacherOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return True if request.user.is_teacher or request.user.is_staff else False