from rest_framework import permissions

class IsTeacher(permissions.BasePermission):

    """
        GLobal Permission to check if the user is teacher
    
    """
    def has_permission(self, request, view):

        if request.user.is_authenticated:
            if request.user.is_teacher:
                return True

        return False


class IsManager(permissions.BasePermission):


    "Global Permission to check if the user is manager"
    
    def has_permission(self,request,view):
        
        if request.user.is_authenticated:
            if request.user.is_manager:
                return True

        return False
