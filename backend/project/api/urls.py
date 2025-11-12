from django.urls import path
from .views import RegisterUserAPIView, LoginUserAPIView, TestAPIView, QuestionAPIView, AnswerAPIView

urlpatterns = [
    path('signup', RegisterUserAPIView.as_view(), name='signup'),
    path('login', LoginUserAPIView.as_view(), name='login'),
    path('tests', TestAPIView.as_view(), name='tests'),
    path('test/int:id', TestAPIView.as_view(), name='test'),
    path('questions', QuestionAPIView.as_view(), name='questions'),
    path('question/int:id', QuestionAPIView.as_view(), name='question'),
    path('answers', AnswerAPIView.as_view(), name='answers'),
]
