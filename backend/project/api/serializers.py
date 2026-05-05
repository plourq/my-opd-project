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
    avatar = serializers.FileField(required=False)
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'patronymic', 'password', 'group', 'is_teacher', 'is_staff', 'avatar']

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
    correct_answer = serializers.CharField(required=False, write_only=True)  # write_only=True
    image = serializers.FileField(required=False)
    
    class Meta:
        model = Question
        fields = ['id', 'text', 'question_type', 'choices', 'matching_pairs', 'correct_answer', 'image']
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        question_type = instance.question_type
        
        result = {
            'id': data['id'],
            'text': data['text'],
            'question_type': data['question_type'],
            'image': data['image']
        }
        
        if question_type == 'choice':
            result['choices'] = data['choices']
            # Не включаем correct_answer для вывода
        elif question_type == 'matching':
            result['matching_pairs'] = data['matching_pairs']
            # Не включаем correct_answer для вывода
        elif question_type == 'text':
            # Для текстовых вопросов тоже не возвращаем правильный ответ
            pass
            
        return result


class TestSerializer(serializers.ModelSerializer):
    available_groups = serializers.PrimaryKeyRelatedField(
        queryset=Group.objects.all(),
        many=True,
        required=False
    )
    
    # Одно поле для всего - и записи, и чтения
    questions = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all(),
        many=True
    )
    
    class Meta:
        model = Test
        fields = ['id', 'title', 'questions', 'available_groups']
    
    def to_representation(self, instance):
        """
        Переопределяем вывод: вместо ID вопросов возвращаем полные объекты
        """
        data = super().to_representation(instance)
        # Получаем детали вопросов
        questions_data = QuestionSerializer(instance.questions.all(), many=True).data
        # Заменяем массив ID на массив объектов
        data['questions'] = questions_data
        return data
    
class TestTitleSerializer(serializers.Serializer):
    title = serializers.CharField()
    questions_quantity = serializers.IntegerField()

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'