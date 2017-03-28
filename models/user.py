from models.models import *
from flask_login import UserMixin

class User(BaseModel,UserMixin):
    name = CharField()
    password = CharField()
    login_name = CharField()