from django.contrib import admin
from .models import User, Question, Group, Test, Answer

admin.site.register(User)
admin.site.register(Question)
admin.site.register(Group)
admin.site.register(Test)
admin.site.register(Answer)