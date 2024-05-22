from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from typing import List

def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn



def insert_sample_data():
    conn = get_db_connection()
    
    # Inserir dados na tabela users
    conn.executemany(
        "INSERT INTO users (name, username, password, email, cpf, telephone, type_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            ("Pedro Silva", "pedro.silva", "password123", "pedro.silva@example.com", "12345678901", "5511999999999", 1),
            ("Maria Oliveira", "maria.oliveira", "password456", "maria.oliveira@example.com", "23456789012", "5511988888888", 2),
            ("João Santos", "joao.santos", "password789", "joao.santos@example.com", "34567890123", "5511977777777", 1)
        ]
    )
        # Inserir dados na tabela status
    conn.executemany(
        "INSERT INTO status (descricao) VALUES (?)",
        [
            ("Ativo"),
            ("Inativo"),
            ("Pendente")
        ]
    )
    
    # Inserir dados na tabela events
    conn.executemany(
        "INSERT INTO events (name_event, title, subject, date, created_at) VALUES (?, ?, ?, ?, ?)",
        [
            ("Evento A", "Título A", "Assunto A", "2024-06-01 10:00:00", "2024-05-20 08:00:00"),
            ("Evento B", "Título B", "Assunto B", "2024-06-02 11:00:00", "2024-05-20 09:00:00"),
            ("Evento C", "Título C", "Assunto C", "2024-06-03 12:00:00", "2024-05-20 10:00:00")
        ]
    )
    
    # Inserir dados na tabela child
    conn.executemany(
        "INSERT INTO child (username, registration, age, cod_responsible, created_at) VALUES (?, ?, ?, ?, ?)",
        [
            ("child1", 1001, 10, 1, "2024-05-20 08:00:00"),
            ("child2", 1002, 12, 2, "2024-05-20 09:00:00"),
            ("child3", 1003, 11, 3, "2024-05-20 10:00:00")
        ]
    )
    

    
    # Inserir dados na tabela activity
    conn.executemany(
        "INSERT INTO activity (subject, date_start, date_end, created_at, cod_status) VALUES (?, ?, ?, ?, ?)",
        [
            ("Atividade A", "2024-06-01 10:00:00", "2024-06-01 12:00:00", "2024-05-20 08:00:00", 1),
            ("Atividade B", "2024-06-02 11:00:00", "2024-06-02 13:00:00", "2024-05-20 09:00:00", 2),
            ("Atividade C", "2024-06-03 12:00:00", "2024-06-03 14:00:00", "2024-05-20 10:00:00", 3)
        ]
    )
    
    # Inserir dados na tabela posts
    conn.executemany(
        "INSERT INTO posts (subject, descricao) VALUES (?, ?)",
        [
            ("Post A", "Descrição do Post A"),
            ("Post B", "Descrição do Post B"),
            ("Post C", "Descrição do Post C")
        ]
    )
    
    # Inserir dados na tabela schedule
    conn.executemany(
        "INSERT INTO schedule (subject, cod_events, cod_activity, cod_posts) VALUES (?, ?, ?, ?)",
        [
            ("Agenda A", 1, 1, 1),
            ("Agenda B", 2, 2, 2),
            ("Agenda C", 3, 3, 3)
        ]
    )
    
    conn.commit()
    conn.close()

# Inserir os dados de exemplo
insert_sample_data()
