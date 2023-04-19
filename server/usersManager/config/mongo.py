import os
from mongoengine import connect , disconnect

def init_db():
    url = os.environ.get('MONGO_URL')
    db_name = 'socializinator'
    
    url = f'{url}/{db_name}'
    
    connect('usersManager', host = url)
    print('Connected to MongoDB')


def close_db():
    disconnect()
    print('Disconnected from MongoDB')