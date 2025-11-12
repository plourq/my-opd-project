from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_401_UNAUTHORIZED, HTTP_400_BAD_REQUEST, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import PermissionDenied, NotAuthenticated
from django.shortcuts import get_list_or_404, get_object_or_404

from .exc import custom_response
from .serializers import UserSerializer, LoginUserSerializer, TestSerializer, QuestionSerializer, AnswerSerializer
from .permissions import IsAdminUser, IsAuthenticated, AllowAny, IsTeacherOrAdmin
from .models import Test, Group, Question, Answer


class RegisterUserAPIView(APIView):
    serializer_class = UserSerializer
    def post(self, request: Request) -> Response:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            return custom_response({'user': serializer.data, 'token': token.key}, 'success', None, HTTP_200_OK)
        return custom_response(None, 'error', serializer.errors, HTTP_422_UNPROCESSABLE_ENTITY)



class LoginUserAPIView(APIView):
    serializer_class = LoginUserSerializer
    def post(self, request: Request) -> Response:
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if not user:
            return custom_response(None, 'error', {'error': 'User not found'}, HTTP_401_UNAUTHORIZED)
        serializer = UserSerializer(user)
        token, _ = Token.objects.get_or_create(user=user)
        return custom_response({'user': serializer.data, 'token': token.key}, 'success', None, HTTP_200_OK)
            

class TestAPIView(APIView):
    def get(self, request: Request) -> Response:
        if request.user.is_staff:
            tests = get_list_or_404(Test)
            serializer = TestSerializer(tests, many=True)
            return custom_response(serializer.data, 'success', None, HTTP_200_OK)
        else:
            if request.user.group:
                tests = Test.objects.filter(available_groups = request.user.group)
                serializer = TestSerializer(tests, many=True)
                return custom_response(serializer.data, 'success', None, HTTP_200_OK)
            else:
                raise PermissionDenied
    def post(self, request: Request) -> Response:
        serializer = TestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return custom_response(serializer.data, 'success', None, HTTP_201_CREATED)
        return custom_response(None, 'error', serializer.errors, HTTP_422_UNPROCESSABLE_ENTITY)
        
    def delete(self, request: Request, id: int) -> Response:
        test = get_object_or_404(Test, pk=id)
        test.delete()
        return custom_response(None, 'success', None, HTTP_204_NO_CONTENT)
    def patch(self, request: Request, id: int) -> Response:
        test = get_object_or_404(Test, pk=id)
        serializer = TestSerializer(test, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return custom_response(serializer.data, 'success', None, HTTP_200_OK)
        return custom_response(None, 'error', serializer.errors, HTTP_422_UNPROCESSABLE_ENTITY)
        
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsTeacherOrAdmin()]
    

class QuestionAPIView(APIView):
    def post(self, request: Request) -> Response:
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return custom_response(serializer.data, 'success', None, HTTP_201_CREATED)
        return custom_response(None, 'error', serializer.errors, HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request: Request, id: int) -> Response:
        question = get_object_or_404(Question, pk=id)
        question.delete()
        return custom_response(None, 'success', None, HTTP_204_NO_CONTENT)

    def patch(self, request: Request, id: int) -> Response:
        question = get_object_or_404(Question, pk=id)
        serializer = QuestionSerializer(question, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return custom_response(serializer.data, 'success', None, HTTP_200_OK)
        return custom_response(None, 'error', serializer.errors, HTTP_422_UNPROCESSABLE_ENTITY)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [IsTeacherOrAdmin()]
    

class AnswerAPIView(APIView):
    def get(self, request: Request, id: int, test: str) -> Response:
        answers = get_list_or_404(Answer, user_id=id, test_title=test)
        serializer = AnswerSerializer(answers, many=True)
        return custom_response(serializer.data, 'success', None, HTTP_200_OK)
    
    def post(self, request: Request) -> Response:
        data = request.data.copy()
        user_answer = data.get('user_answer')
        question_id = data.get('question')
        question = get_object_or_404(Question, id=question_id)
        if user_answer == question.choices or question.matching_pairs or question.correct_answer:
            data['is_correct'] = True
        serializer = AnswerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return custom_response(serializer.data, 'success', None, HTTP_201_CREATED)
        return custom_response(None, 'error', serializer.errors, HTTP_422_UNPROCESSABLE_ENTITY)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [IsTeacherOrAdmin()]