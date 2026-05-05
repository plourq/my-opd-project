from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_401_UNAUTHORIZED, HTTP_400_BAD_REQUEST, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import PermissionDenied, NotAuthenticated
from django.shortcuts import get_list_or_404, get_object_or_404

from .exc import custom_response
from .serializers import UserSerializer, TestSerializer, QuestionSerializer, AnswerSerializer, GroupSerializer, TestTitleSerializer
from .permissions import IsAuthenticated, IsTeacherOrAdmin, IsStudent, AllowAny
from .models import Test, Group, Question, Answer, User


class RegisterUserAPIView(APIView):
    def post(self, request: Request) -> Response:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            return custom_response({'user': serializer.data, 'token': token.key}, 'success', None, HTTP_200_OK)
        return custom_response(None, 'error', serializer.errors, HTTP_422_UNPROCESSABLE_ENTITY)



class LoginUserAPIView(APIView):
    def post(self, request: Request) -> Response:
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if not user:
            return custom_response(None, 'error', {'error': 'User not found'}, HTTP_401_UNAUTHORIZED)
        serializer = UserSerializer(user)
        token, _ = Token.objects.get_or_create(user=user)
        return custom_response({'user': serializer.data, 'token': token.key}, 'success', None, HTTP_200_OK)
    

class GroupAPIView(APIView):
    def get(self, request: Request) -> Response:
        groups = get_list_or_404(Group)
        serializer = GroupSerializer(groups, many=True)
        return custom_response(serializer.data, 'success', None, HTTP_200_OK)
    
    def post(self, request: Request) -> Response:
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return custom_response(serializer.data, 'success', None, HTTP_201_CREATED)
        return custom_response(None, 'error', serializer.errors, HTTP_422_UNPROCESSABLE_ENTITY)
    
    def get_permissions(self): 
        if self.request.method == 'POST':
            return [IsTeacherOrAdmin()]
        return [AllowAny()]

            

class TestAPIView(APIView):
    def get(self, request: Request, id:int = None) -> Response:
        if request.user.is_staff or request.user.is_teacher:
            if id: 
                test = get_object_or_404(Test, pk=id)
                serializer = TestTitleSerializer({'title':test.title, 'questions_quantity':test.questions.count()})
            else:
                tests = get_list_or_404(Test)
                serializer = TestSerializer(tests, many=True)
            return custom_response(serializer.data, 'success', None, HTTP_200_OK) 
        else:
            if id:
                test = get_object_or_404(Test, pk=id)
                serializer = TestTitleSerializer({'title':test.title, 'questions_quantity':test.questions.count()})
            else:
                tests = Test.objects.filter(available_groups = request.user.group) 
                serializer = TestSerializer(tests, many=True) 
            return custom_response(serializer.data, 'success', None, HTTP_200_OK) 
        
    def post(self, request: Request, id: int=None) -> Response:
        if not id:
            serializer = TestSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save() 
                return custom_response(serializer.data, 'success', None, HTTP_201_CREATED)
            return custom_response(None, 'error', serializer.errors, HTTP_422_UNPROCESSABLE_ENTITY) 
        else:
            test = get_object_or_404(Test, pk=id)
            group = get_object_or_404(Group, id=request.data.get('group_id'))
            test.available_groups.add(group)
            return custom_response({'group_id': group, 'test_id': test}, 'success', None, HTTP_201_CREATED)

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
    def get(self, request: Request, id: int) -> Response:   
        question_number = request.GET.get('q') 
        
        if not question_number: 
            return custom_response(None, 'error', {'error': 'Укажите номер вопроса ?q=1'}, HTTP_400_BAD_REQUEST)
        
        try:
            question_number = int(question_number)
        except:
            return custom_response(None, 'error', {'error': 'Номер вопроса должен быть числом'}, HTTP_400_BAD_REQUEST)
        
        test = get_object_or_404(Test, pk=id)
        
        all_questions = list(test.questions.all())
        
        if question_number < 1 or question_number > len(all_questions):
            return custom_response(
                None, 
                'error', 
                {'error': f'Вопрос {question_number} не найден. В тесте {len(all_questions)} вопросов.'}, 
                HTTP_404_NOT_FOUND
            )
        
        question = all_questions[question_number - 1]
        
        serializer = QuestionSerializer(question) 
        return custom_response(serializer.data, 'success', None, HTTP_200_OK) 

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
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsTeacherOrAdmin()]
    

class AnswerAPIView(APIView):

    def get(self, request: Request, test_id: int, question_id: int) -> Response:
        test = get_object_or_404(Test, id=test_id)
        question = get_object_or_404(Question, id=question_id)

        existing_answer = Answer.objects.filter(
            user=request.user,
            test=test,
            question=question
        ).first()

        return custom_response({'is_complete': True if existing_answer else False}, 'success', None, HTTP_200_OK)
    
    def post(self, request: Request, test_id: int, question_id: int) -> Response:
        test = get_object_or_404(Test, id=test_id)
        questions = list(test.questions.all()) 
        question = questions[question_id - 1] 
        
        existing_answer = Answer.objects.filter(
            user=request.user,
            test=test,
            question=question
                    ).first()
        
        if existing_answer:
            return custom_response(
                None, 
                'error', 
                {'error': 'Вы уже ответили на этот вопрос'}, 
                HTTP_400_BAD_REQUEST
            )
        
        user_answer = request.data.get('user_answer', '')
        
        is_correct = user_answer.lower().strip() == question.correct_answer.lower().strip()
        
        answer = Answer.objects.create(
            user=request.user,
            test=test,
            question=question,
            user_answer=user_answer,
            is_correct=is_correct
        )
        
        serializer = AnswerSerializer(answer)
        return custom_response(serializer.data, 'success', None, HTTP_201_CREATED)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsStudent()]
        return [IsTeacherOrAdmin()]
    
class TestResultAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request: Request, test_id: int, group_id:int=None) -> Response:
        test = get_object_or_404(Test, id=test_id)
        if request.user.is_staff or request.user.is_teacher:
            group = get_object_or_404(Group, id=group_id)
            
            students = User.objects.filter(group=group_id)
            
            group_percentage = 0
            results = []
            for student in students:
                percentage = test.get_user_score_percentage(student)
                answer_count = Answer.objects.filter(test=test, user=student).count()
                group_percentage += percentage
                
                results.append({
                    'user_id': student.id,
                    'first_name': student.first_name,
                    'last_name': student.last_name,
                    'score_percentage': round(percentage),
                    'answer_count': answer_count,
                })
            
            return custom_response(
                {
                    'test_id': test.id,
                    'test_title': test.title,
                    'group_id': group.id,
                    'group_title': group.title,
                    'students_count': len(results),
                    'group_percentage': round(group_percentage / students.count()),
                    'results': results
                },
                'success',
                None,
                HTTP_200_OK
            )

        else:         
            percentage = test.get_user_score_percentage(request.user)
            answer_count = Answer.objects.filter(test=test, user=request.user).count()
            
            return custom_response(
                {'test_id': test.id, 'score_percentage': percentage, 'answer_count': answer_count},
                'success',
                None,
                HTTP_200_OK
            )