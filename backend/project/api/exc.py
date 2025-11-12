from rest_framework.views import exception_handler
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated, PermissionDenied
from django.http import Http404
from rest_framework.response import Response

def my_exc_handler(exc, context):
    result = exception_handler(exc, context)
    if isinstance(exc, PermissionDenied | NotAuthenticated):
        result.status_code = 403
        result.data = {
            'data': None,
            'message': 'error',
            'errors': {
                'error': 'Forbidden For You'
            }
        }

    elif isinstance(exc, AuthenticationFailed):
        result.status_code = 401
        result.data = {
            'data': None,
            'message': 'error',
            'errors': {
                'error': 'Authentication Failed'
            }
        }

    elif isinstance(exc, Http404):
        result.status_code = 404
        result.data = {
            'data': None,
            'message': 'error',
            'errors': {
                'error': 'Not Found'
            }
        }

    return result

def custom_response(data, message, errors, status):
    return Response({
        'data': data,
        'message': message,
        'errors': errors
    }, status=status)