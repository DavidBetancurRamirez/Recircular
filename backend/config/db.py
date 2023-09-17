from sqlalchemy import create_engine, MetaData

engine = create_engine("mysql+pymysql://root:Password@localhost:3306/recircular")

meta = MetaData()

conn = engine.connect()
