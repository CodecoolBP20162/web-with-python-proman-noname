from peewee import *


db = PostgresqlDatabase("d616hb6tnalq4g", user="hluavdtoxzzzzi",
                        password="2440940a23469502a3016704cbd19f32ccc04e9ba9dddab25ac3503af1bf5c12",
                        host="ec2-54-75-249-162.eu-west-1.compute.amazonaws.com", port="5432")

class BaseModel(Model):
    class Meta:
        database = db
