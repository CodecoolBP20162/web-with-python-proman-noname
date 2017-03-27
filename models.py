import os

from peewee import *

path = os.path.dirname(os.path.abspath(__file__))

with open(path+"/dbopen.txt", 'r') as f:
    db = PostgresqlDatabase(f.readline()[:-1], user=f.readline()[:-1])


class BaseModel(Model):
    class Meta:
        database = db
