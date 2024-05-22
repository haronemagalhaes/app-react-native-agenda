from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from typing import List

app = FastAPI()

# Conectar ao banco de dados SQLite
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Criar as tabelas de usuários e produtos
def create_tables():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

create_tables()

# Modelos de dados para o Pydantic
class User(BaseModel):
    name: str
    email: str

class Product(BaseModel):
    name: str
    price: float

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float

@app.post("/users/", response_model=UserResponse)
def create_user(user: User):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (name, email) VALUES (?, ?)', (user.name, user.email))
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()
    return {"id": user_id, "name": user.name, "email": user.email}

@app.post("/products/", response_model=ProductResponse)
def create_product(product: Product):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO products (name, price) VALUES (?, ?)', (product.name, product.price))
    conn.commit()
    product_id = cursor.lastrowid
    conn.close()
    return {"id": product_id, "name": product.name, "price": product.price}

@app.get("/users/", response_model=List[UserResponse])
def list_users():
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users').fetchall()
    conn.close()
    return [dict(user) for user in users]

@app.get("/products/", response_model=List[ProductResponse])
def list_products():
    conn = get_db_connection()
    products = conn.execute('SELECT * FROM products').fetchall()
    conn.close()
    return [dict(product) for product in products]

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    conn.close()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(user)

@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int):
    conn = get_db_connection()
    product = conn.execute('SELECT * FROM products WHERE id = ?', (product_id,)).fetchone()
    conn.close()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return dict(product)

@app.delete("/users/{user_id}", response_model=UserResponse)
def delete_user(user_id: int):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    if user is None:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
    conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
    conn.commit()
    conn.close()
    return dict(user)

@app.delete("/products/{product_id}", response_model=ProductResponse)
def delete_product(product_id: int):
    conn = get_db_connection()
    product = conn.execute('SELECT * FROM products WHERE id = ?', (product_id,)).fetchone()
    if product is None:
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")
    conn.execute('DELETE FROM products WHERE id = ?', (product_id,))
    conn.commit()
    conn.close()
    return dict(product)


@app.put("/products/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product: Product):
    conn = get_db_connection()
    existing_product = conn.execute('SELECT * FROM products WHERE id = ?', (product_id,)).fetchone()
    if existing_product is None:
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")
    conn.execute('UPDATE products SET name = ?, price = ? WHERE id = ?', (product.name, product.price, product_id))
    conn.commit()
    conn.close()
    return dict(existing_product)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

