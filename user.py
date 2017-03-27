from models import *

class User(BaseModel):
    name = CharField()
    password = CharField()
    login_name = CharField()