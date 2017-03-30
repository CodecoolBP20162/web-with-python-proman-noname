from peewee import *


db = PostgresqlDatabase("de2fj2o6je21ba", user="xcivudbzfszher",
                        password="88d799d5d7f787d802f519ab8d21676965279cf9199e7007fca16374fdc23abb",
                        host="ec2-54-217-232-100.eu-west-1.compute.amazonaws.com", port="5432")

class BaseModel(Model):
    class Meta:
        database = db
