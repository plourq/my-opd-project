from rest_framework import serializers
from .models import User, Group, Question, Test, Answer


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_staff = serializers.BooleanField(read_only=True)
    is_teacher = serializers.BooleanField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'patronymic', 'password', 'group', 'is_teacher', 'is_staff']

    def create(self, validated_data):
        user = User(**validated_data)
        password = validated_data.pop('password')
        user.set_password(password)
        user.save()
        return user
    

class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    choices = serializers.CharField(required=False)
    matching_pairs = serializers.CharField(required=False)
    correct_answer = serializers.CharField(required=False)
    class Meta:
        model = Question
        fields = ['id', 'text', 'question_type', 'choices', 'matching_pairs', 'correct_answer']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        question_type = instance.question_type

        result = {
            'id': data['id'],
            'text': data['text'],
            'question_type': data['question_type'],
        }

        if question_type == 'text':
            result['correct_answer'] = data['correct_answer']
        elif question_type == 'choice':
            result['choices'] = data['choices']
            result['correct_answer'] = data['correct_answer']
        elif question_type == 'matching':
            result['matching_pairs'] = data['matching_pairs']
            result['correct_answer'] = data['correct_answer']

        return result


class TestSerializer(serializers.ModelSerializer):
    available_groups = serializers.PrimaryKeyRelatedField(
        queryset=Group.objects.all(),
        many=True,
        required=False
    )
    questions = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all(),
        many=True
    )
    class Meta:
        model = Test
        fields = ['title', 'questions', 'available_groups']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'