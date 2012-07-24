from vector import Vector

class User():
    id = 0
    position = Vector()
    direction = Vector(0,0,1)
    up = Vector(0,1,0)
    spd = 0
    anotherUser = {}

    def __init__(self,uid):
        self.id=uid
	
    def setPosition(self,position):
        self.position=position
    
    def getPosition(self):  
        return self.position

    def setUp(self,up):
        self.up=up
    
    def getUp(self):  
        return self.up

    def setDirection(self,direction):
        self.direction=direction

    def getDirection(self):
        return self.direction

    def addAnotherUser(self,user):
		self.anotherUser.add(user)

    def setSpeed(self, spd):
        self.spd=spd

    def getSpeed(self):
        return self.spd

    def calculate(self):
        self.position=self.position*speed+self.direction

    def addAnotherUser(self,user):
        self.anotherUser[user.id]=user

    def getAnotherUser(self,uid):
        if self.anotherUser.has_key(uid):
            return self.anotherUser[uid]
        else: 
            return false

