#import json
class Vector():
    x=0
    y=0
    z=0

    def toJSON(self):
        #return str(self)
        return {"x":self.x,"y":self.y,"z":self.z}

    def __init__(self,x=0,y=0,z=0):
        self.x=x
        self.y=y
        self.z=z

    def __add__(self,v):
        if isinstance(v,Vector):
            return Vector(
                 self.x+v.x
                ,self.y+v.y
                ,self.z+v.z
            )
        elif isinstance(v,int) or isinstance(v,float):
            return Vector(
                 self.x+v
                ,self.y+v
                ,self.z+v
            )

    def __sub__(self,v):
        if isinstance(v,Vector):
            return Vector(
                 self.x-v.x
                ,self.y-v.y
                ,self.z-v.z
            )
        elif isinstance(v,int) or isinstance(v,float):
            return Vector(
                 self.x-v
                ,self.y-v
                ,self.z-v
            )

    def __div__(self,v):
        return Vector(
                 self.x/v
                ,self.y/v
                ,self.z/v
            )

    def __rdiv__(self,v):
        return Vector(
                 self.x/v
                ,self.y/v
                ,self.z/v
            )

    def __repr__(self):
        return '{"x":'+str(self.x)+',"y":'+str(self.y)+',"z":'+str(self.z)+'}'