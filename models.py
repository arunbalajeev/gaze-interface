from flask_sqlalchemy import SQLAlchemy
from application import app

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    boxX = db.Column(db.Integer)
    boxY = db.Column(db.Integer)
    boxW = db.Column(db.Integer)
    boxH = db.Column(db.Integer)
    color = db.Column(db.String)
    description = db.Column(db.String)

    def __init__(self, boxX, boxY, boxW, boxH, color, description):
        self.boxX = boxX
        self.boxY = boxY
        self.boxW = boxW
        self.boxH = boxH
	self.color = color
	self.description = description
