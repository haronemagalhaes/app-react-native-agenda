from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from typing import List

app = FastAPI()

# banco de dados SQLite
def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

# tabelas de usuários e produtos
def create_tables():
    conn = get_db_connection()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name_event VARCHAR(255),
            title VARCHAR(255),
            subject VARCHAR(255),
            date DATETIME,
            created_at DATETIME
            )
    """
    )
    conn.execute(
        """
       CREATE TABLE IF NOT EXISTS child (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255),
            registration INTEGER,
            age INTEGER,
            cod_responsible INTEGER,
            created_at DATETIME,
            FOREIGN KEY (cod_responsible) REFERENCES users (id)
            )
    """
    )
    conn.execute(
        """
       CREATE TABLE IF NOT EXISTS status (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descricao VARCHAR(255)
            )
    """
    )
    conn.execute(
        """
       CREATE TABLE IF NOT EXISTS activity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject VARCHAR(255),
            date_start DATETIME,
            date_end DATETIME,
            created_at DATETIME,
            cod_status INTEGER,
            FOREIGN KEY (cod_status) REFERENCES status (id)
            )
    """
    )
    conn.execute(
        """
       CREATE TABLE IF NOT EXISTS schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject VARCHAR(255),
            cod_events INTEGER,
            cod_activity INTEGER,
            cod_posts INTEGER,
            FOREIGN KEY (cod_events) REFERENCES events (id),
            FOREIGN KEY (cod_activity) REFERENCES activity (id),
            FOREIGN KEY (cod_posts) REFERENCES posts (id)
            )
    """
    )
    conn.execute(
        """
       CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject VARCHAR(255),
            descricao TEXT
            )
    """
    )
    conn.execute(
        """
       CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            cpf VARCHAR(11) NOT NULL,
            telephone VARCHAR(15) NOT NULL,
            type_usuario INT NOT NULL
            )
    """
    )
    conn.commit()
    conn.close()

create_tables()

# Pydantic models
class User(BaseModel):
    name: str
    username: str
    password: str
    email: str
    cpf: str
    telephone: str
    type_usuario: int

class Event(BaseModel):
    name_event: str
    title: str
    subject: str
    date: str
    created_at: str

class Activity(BaseModel):
    subject: str
    date_start: datetime
    date_end: datetime
    created_at: datetime
    cod_status: int


@app.get("/activity/")
def get_activities():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM activity")
    rows = cursor.fetchall()
    activities = []
    for row in rows:
        activity = Activity(
            id=row["id"],
            subject=row["subject"],
            date_start=row["date_start"],
            date_end=row["date_end"],
            created_at=row["created_at"],
            cod_status=row["cod_status"]
        )
        activities.append(activity)
    conn.close()
    return activities



@app.post("/activity/")
def create_activity(activity: Activity):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO activity (subject, date_start, date_end, created_at, cod_status) VALUES (%s, %s, %s, %s, %s)",
        (
            activity.subject,
            activity.date_start,
            activity.date_end,
            activity.created_at,
            activity.cod_status,
        )
    )
    conn.commit()
    conn.close()
    return {"message": "Activity created successfully"}


# Endpoints para a API
@app.post("/users/")
def create_user(user: User):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (name, username, password, email, cpf, telephone, type_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (user.name, user.username, user.password, user.email, user.cpf, user.telephone, user.type_usuario),
    )
    conn.commit()
    conn.close()
    return {"message": "User created successfully"}

@app.get("/users/")
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()
    users = []
    for row in rows:
        user = User(
            id=row["id"],
            name=row["name"],
            username=row["username"],
            password=row["password"],
            email=row["email"],
            cpf=row["cpf"],
            telephone=row["telephone"],
            type_usuario=row["type_usuario"]
        )
        users.append(user)
    conn.close()
    return users

@app.post("/events/")
def create_event(event: Event):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO events (name_event, title, subject, date, created_at) VALUES (?, ?, ?, ?, ?)",
        (event.name_event, event.title, event.subject, event.date, event.created_at),
    )
    conn.commit()
    conn.close()
    return {"message": "Event created successfully"}

@app.get("/events/", response_model=List[Event])
def get_events():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events")
    rows = cursor.fetchall()
    events = []
    for row in rows:
        event = Event(
            name_event=row["name_event"],
            title=row["title"],
            subject=row["subject"],
            date=row["date"],
            created_at=row["created_at"],
        )
        events.append(event)
    conn.close()
    return events

# Rodar o servidor com uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
