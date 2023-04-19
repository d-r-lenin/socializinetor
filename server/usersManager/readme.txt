Run: (win - bash)
    py -3 -m venv venv
    . venv\Scripts\activate
    pip install -r requirements.txt

    (or)

    (linux - bash)
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    


create '.env' file here and add required env variables:
    MONGO_URL
    MONGO_DB

run this for development server
    flask --app app --debug run
