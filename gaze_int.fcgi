#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import logging
import traceback
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.realpath(__file__)))+'/div_rel_annotator/python-packages/lib/python2.7/site-packages/')

from flup.server.fcgi import WSGIServer

ENV_CONFIG_NAME = 'OBJ_CONFIG'
os.environ[ENV_CONFIG_NAME] = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'config/config.txt')

from application import app
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
fh = logging.FileHandler('startup.log')
fh.setFormatter(formatter)
logger=logging.getLogger('fcgi')
logger.addHandler(logging.NullHandler())
logger.addHandler(fh)

try:
    WSGIServer(app, environ={ENV_CONFIG_NAME: os.environ[ENV_CONFIG_NAME]}).run()
except Exception as e:
    logger.error('init: %s (%s)' % (e.message,traceback.format_exc()))
    logger.debug('Python interpreter: %s' % sys.executable)
    logger.debug('Path: %s' % '\n'.join(sys.path))
    raise e

