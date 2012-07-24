import threading
import time
import logging
class MyThread(threading.Thread):
    var=3
    def run ( self ):
        while (self.var>0):
            for i in xrange(10):
                print 'MyThread working. ' + str(i)
            self.var=self.var-1
            time.sleep(1)


logging.getLogger().setLevel(logging.DEBUG)
logging.log(logging.DEBUG,'awd')
MyThread().start()
print 'go to...'
