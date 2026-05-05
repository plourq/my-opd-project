from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated, AllowAny

class IsTeacherOrAdmin(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated:
            return False
        return user.is_teacher or user.is_staff

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated:
            return False
        return True if user.group else False
        # return not user.is_teacher and not user.is_staff and user.group is not None