from django.urls import path
from .views import RegisterUserAPIView, LoginUserAPIView, TestAPIView, QuestionAPIView, AnswerAPIView, GroupAPIView, TestResultAPIView

urlpatterns = [
    path('auth/signup', RegisterUserAPIView.as_view(), name='signup'),
    path('auth/login', LoginUserAPIView.as_view(), name='login'),
    path('groups', GroupAPIView.as_view(), name='groups'),
    path('tests', TestAPIView.as_view(), name='tests'),
    path('tests/<int:id>', TestAPIView.as_view(), name='test'),
    path('questions', QuestionAPIView.as_view(), name='questions'),
    path('questions/<int:id>', QuestionAPIView.as_view(), name='question'),
    path('answers/<int:test_id>/<int:question_id>', AnswerAPIView.as_view()),
    path('tests/<int:test_id>/result', TestResultAPIView.as_view()),
    path('tests/<int:test_id>/<int:group_id>/result', TestResultAPIView.as_view()),
]
