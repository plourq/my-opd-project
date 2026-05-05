from django.db import models
from django.contrib.auth.models import AbstractUser

class Group(models.Model):
    title = models.CharField(max_length=128)

    def __str__(self):
        return self.title
    

class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    patronymic = models.CharField(max_length=128, blank=True, null=True)
    is_teacher = models.BooleanField(default=False)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, blank=True, null=True)
    avatar = models.FileField(upload_to='avatars/%Y/%M/d/', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email
        return super().save(*args, **kwargs)
    

class Question(models.Model):
    text = models.TextField(verbose_name="Вопрос")
    image = models.FileField(upload_to='question_images/%Y/%M/d/', blank=True, null=True)
    question_type = models.CharField(max_length=10, choices=(('choice', 'Варианты ответа'),('text', 'Свободный ответ'),('matching', 'Сопоставление')))
    choices = models.TextField(blank=True, help_text="Перечислите варианты через |, например: Москва|Париж|Лондон")
    matching_pairs = models.TextField(blank=True, help_text='Перечислите в формате: "ключ|ключ|ключ:значение|значение|значение"')
    correct_answer = models.TextField(blank=True, help_text="Для свободного ответа — правильный текст. Для choice — индекс (0,1,2...) или текст.")

    def __str__(self):
        return self.text

class Test(models.Model):
    title = models.CharField(max_length=255)
    questions = models.ManyToManyField(Question)
    available_groups = models.ManyToManyField(Group, blank=True, null=True)

    def __str__(self):
        return self.title
    
    def get_user_score_percentage(self, user):
        total_questions = self.questions.count()
        if total_questions == 0:
            return 0

        user_answers = Answer.objects.filter(
            user=user, 
            question__in=self.questions.all()
        ).order_by('-created_at')
        
        latest_answers = {}
        for answer in user_answers:
            if answer.question_id not in latest_answers:
                latest_answers[answer.question_id] = answer
        
        correct_count = sum(1 for answer in latest_answers.values() if answer.is_correct)
        percentage = (correct_count / total_questions) * 100
        return round(percentage, 2)


class Answer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user_answer = models.TextField(blank=True, null=True)
    is_correct = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'test', 'question')

    def __str__(self):
        return self.test.title