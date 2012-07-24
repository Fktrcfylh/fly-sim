from os import path as op

import datetime
import threading
import time
import logging
from vector import Vector

from user import User

from tornado import web

from tornadio2 import SocketConnection, TornadioRouter, SocketServer, event, session


ROOT = op.normpath(op.dirname(__file__))








class Compiler(threading.Thread):
    working=True 
    list={}

    def add_list(self,list):
        self.list=list

    def run(self):
        while self.working:
            for user in self.list:
                i=0
                position=Vector()
                for anotherUsers in user.anotherUsers :
                    position=anotherUsers[user.id]+position
                    i+=1
                if(i>0):
                    position=position/i
                    logging.debug(position)
            logging.debug("Thread")
            time.sleep(3)



class PingConnection(SocketConnection):
    rooms = []
    
    #clients = set()
    client_list={}
    MY_Compile=Compiler()
    MY_Compile.add_list(client_list)
    MY_Compile.start()
    def __init__(self, *args, **kwargs):
        self.id = None
        super(PingConnection,self).__init__(*args, **kwargs)
    @event 
    def auth(self,auth_key):
        if not self.client_list.has_key(auth_key):
            self.id = auth_key
            self.user = User(self.id)
            self.client_list[auth_key]=self
        else:
            self=self.client_list[auth_key]
            #self.user.addAnotherUser([self.client_list[user] for user in self.client_list])
        responce={}
        responce["uid"]=auth_key
        anotherUsers={}
        for user in self.client_list:
            print user
            print self.client_list[user]
            templ={}
            templ['uid']=self.client_list[user].id
            templ['position']=self.client_list[user].user.getPosition().toJSON()
            templ['direction']=self.client_list[user].user.getDirection().toJSON()
            templ['up']=self.client_list[user].user.getUp().toJSON()
            templ['speed']=self.client_list[user].user.getSpeed()
            anotherUsers[self.client_list[user].id]=templ
        responce["list"]=anotherUsers    
        return responce

    '''@event
    def on_open(self, info):
        self.accesskey='awdawdawdawd'
        self.send({'key':self.accesskey,'action':'auth'})
    '''   
    @event
    def ping(self,*var,**kwars):
    	return Vector(1,2,3).toJSON()

    @event
    def move(self, speed):
        self.user.setSpeed(speed)
        self.send({'action':'speed','speed':self.user.getSpeed()})
    '''
    def on_message(self, message):
        if not self.id:
            if message.find(self.accesskey):
                self.id = message
                self.user=User(self.id)
                self.clients.add(self)
    '''





# Create tornadio router
PingRouter = TornadioRouter(PingConnection)

# Create socket application
application = web.Application(
     PingRouter.apply_routes([]),

    flash_policy_port = 843,
    flash_policy_file = op.join(ROOT, 'flashpolicy.xml'),
    socket_io_port = 8001
)

if __name__ == "__main__":
  
    logging.getLogger().setLevel(logging.DEBUG)

    # Create and start tornadio server
    SocketServer(application)
