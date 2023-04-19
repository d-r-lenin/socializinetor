from models.master import Master

from config.mongo import init_db, close_db

def getMaster(key):
    try:
        init_db()
        master = Master.objects.get(key=key)
        close_db()
        return master.value
    except (Exception):
        return None

MASTER_KEY = getMaster('MASTER_KEY')