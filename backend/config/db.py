from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://root:Tomaslopera801@localhost:3306/recircular", echo=True)

meta = MetaData()

conn = engine.connect()

Session = sessionmaker(bind=engine)
session = Session()
