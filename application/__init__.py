from flask import Flask, render_template, request, redirect, url_for, abort, session
from jinja2 import environmentfilter
from flask_sqlalchemy import SQLAlchemy
import jinja2
import glob
import simplejson as json
import sqlite3
from sqlalchemy.engine import create_engine
import unicodedata
import csv
from sqlalchemy import text
from boto.mturk.connection import MTurkConnection
from boto.mturk.question import ExternalQuestion
from boto.mturk.price import Price
import cgi,json
import cgitb,time
import numpy as np
import logging
from flask import jsonify
import struct,base64,time
cgitb.enable()


######## obj_desc_annotator ######
app = Flask(__name__)
app.config['SECRET_KEY'] = 'F34TF$($e34E';
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example_cityscape.db'
app.config['SESSION_TYPE']='image_keys'
environment = jinja2.Environment(app)
environment.globals.update(zip=zip)
environment.filters['glob'] = glob
db1 = SQLAlchemy(app)

########Logging##########
fh = logging.FileHandler('server.log')
#fh.setFormatter(formatter)
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
logger.addHandler(fh)
#######################
AWS_ACCESS_KEY_ID = ''
AWS_SECRET_ACCESS_KEY = ''
HOST = 'mechanicalturk.amazonaws.com'

@app.route('/')
def home():
    logger.info("\nRender main page")
    try:
        if request.args.get("assignmentId") == "ASSIGNMENT_ID_NOT_AVAILABLE":
            # worker hasn't accepted the HIT (task) yet
            pass
        else:
            # worked accepted the task
            pass

        worker_id = request.args.get("workerId", "")
        session['worker_id'] = request.args.get("workerId","None")
        session['speech_id'] = request.args.get("speech_id","None_0_0")
        session['assignment_id'] = request.args.get("assignmentId", "ASSIGNMENT_ID_NOT_AVAILABLE")
        session['hit_id'] = request.args.get("hitId", "None")
        session['image_id'] = request.args.get('image_id')
	session['keys']="None"
        logger.info("Worker ID: "+session['worker_id'])
        logger.info("Assignment ID: "+session['assignment_id'])
        logger.info("HIT ID: "+session['hit_id'])
        logger.info("Image ID: "+str(session['image_id']))
	session['video_tag'] = "_".join(str(session['image_id']).split("_")[:2])
	session['video_folder'] = str(session['image_id']).split("_")[0]
	session['saved']=0
	############# Cityscape #################
	csvreader0 = csv.reader(open('application/static/cityscapes_videoid_keys.csv','r'), delimiter=",")
	if session['image_id']!="None":
		for enum,l0 in enumerate(csvreader0):
			if l0[0]==session['image_id']:
				session['keys']=l0[1]
	logger.info("Keys ID: "+session['keys'])
	session['image_id'] = "https://data.vision.ee.ethz.ch/arunv/obj_desc_annotator/cityscape/"+str(session['image_id']).split("_")[0]+"/"+str(session['image_id'])+".png"
        return render_template('index.html',session = session)
    except Exception as e:
    	logging.exception('Got exception on main handler')
    	raise e

@app.route('/static/gaze/', methods=['POST','GET'])
def gaze():
    logger.info("\nRender gaze page")
    try:
	session["image_set"]=[]
	for i1 in range(30):
		session['image_set'].append("https://data.vision.ee.ethz.ch/arunv/obj_desc_annotator/cityscape/"+str(session['video_folder'])+"/"+session['video_tag']+'_%06d'%(29-i1)+'_leftImg8bit.png')
	sqlstring = "select user.boxX,user.boxY,user.boxW,user.boxH,user.color,user.description from user where user.imageid = '"+session['image_id']+"'"
	sql = text(sqlstring)
	#result = db1.engine.execute(sql).fetchall()
	session['xbox'] = []
	session['ybox'] = []
	session['wbox'] = []
	session['hbox'] = []
	session['colbox'] = []
	session['text'] = []
	#logger.info(result[0])
	#for row in result:
	#	session['xbox'].append(row[0])
	#	session['ybox'].append(row[1])
	#	session['wbox'].append(row[2])
	#	session['hbox'].append(row[3])
	#	session['colbox'].append(row[4])
	#	session['text'].append(row[5])
	csvreader1 = csv.reader(open('application/boxes.csv','r'), delimiter=",")
	if session['image_id']!="None":
		for enum,l0 in enumerate(csvreader1):
			if l0[0]==session['image_id']:
				session['xbox'].append(l0[1])
				session['ybox'].append(l0[2])
				session['wbox'].append(l0[3])
				session['hbox'].append(l0[4])
				session['colbox'].append(l0[5])
				session['text'].append(l0[6])
	db1.session.close()
        return render_template('gaze.html', session=session)
    except Exception as e:
    	logging.exception('Got exception on main handler')
    	raise e

@app.route('/static/savevideo1/', methods=['POST','GET'])
def saveaudio1():
    logger.info("Render Saving to DB")
    try:
    	session['data_save'] = request.json
	workerid = str(session['worker_id'])
    	imageid = str(session['image_id'])#data['video_id']
    	boxdesc = session['data_save']['blob']
    	box_selfie = session['data_save']['selfie']
	session['count']=0
	randno=np.random.randint(10,1000)
	if session['data_save']['submitted']!=-1:
		for x in range(len(session['data_save']['blob'])):
			blob=base64.decodestring(session['data_save']['blob'][x])
			with open("gaze_output/output_"+str(session['video_tag'])+"_"+str(x)+"_"+str(session['assignment_id'])+".mp4", "wb") as output_file:
			    	output_file.write(blob)
		for x in range(len(session['data_save']['selfie'])):
			blob=base64.decodestring(session['data_save']['selfie'][x])
			with open("gaze_output/selfie_"+str(session['video_tag'])+"_"+str(x)+"_"+str(session['assignment_id'])+".png", "wb") as output_file:
			    	output_file.write(blob)		
		session['saved']=1			
		logger.info("Saving to DB")
		logger.info("Number: "+str(len(session['data_save']['blob'])))
	    	for j in range(len(session['data_save']['blob'])):
			speech_output="gaze_output/output_"+str(session['video_tag'])+"_"+str(j)+"_"+str(session['assignment_id'])+".mp4"
			user = User(session['worker_id'],session['assignment_id'],str(session['text'][j]),speech_output,0)
		session['data_save']['status']="OK";
		logger.info("Checking for the saved ones.")
		return json.dumps({'status':'OK'})
	return json.dumps({'status':'Fail'})
    except Exception as e:
    	logging.exception('Got exception on Saving handler')
    	raise e

@app.route('/static/savevideo/', methods=['POST','GET'])
def saveaudio():
    logger.info("Render Saving to DB")
    try:
    	session['data_save'] = request.json
	workerid = str(session['worker_id'])
    	imageid = str(session['image_id'])
    	boxdesc = session['data_save']['blob']
    	box_selfie = session['data_save']['selfie']
	session['count']=0
	randno=np.random.randint(10,1000)
	if session['data_save']['submitted']!=-1:
		for x in range(len(session['data_save']['blob'])):
			blob=base64.decodestring(session['data_save']['blob'][x])
			with open("gaze_output/output_"+str(session['video_tag'])+"_"+str(x)+"_"+str(session['assignment_id'])+".mp4", "wb") as output_file:
			    	output_file.write(blob)
		for x in range(len(session['data_save']['selfie'])):
			blob=base64.decodestring(session['data_save']['selfie'][x])
			with open("gaze_output/selfie_"+str(session['video_tag'])+"_"+str(x)+"_"+str(session['assignment_id'])+".png", "wb") as output_file:
			    	output_file.write(blob)					
		logger.info("Saving to DB")
		logger.info("Number: "+str(len(session['data_save']['blob'])))
	    	for j in range(len(session['data_save']['blob'])):
			speech_output="gaze_output/output_"+str(session['video_tag'])+"_"+str(j)+"_"+str(session['assignment_id'])+".mp4"
			user = User(session['worker_id'],session['assignment_id'],str(session['text'][j]),speech_output,0)
	if session['saved']==1:
		session['data_save']['status']="OK";
		logger.info("Checking for the saved ones.")
		return json.dumps({'status':'OK'})
	return json.dumps({'status':'OK'})
    except Exception as e:
    	logging.exception('Got exception on Saving handler')
    	raise e

@app.route('/message/<username>')
def message(username):
    return render_template('message.html', username="arun",
                                           message="Done")

from models import *

if __name__ == '__main__':
	app.debug = True
	app.run()
