import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

//função para abrir a conexao com o arquivo do banco
export async function openDB() {
    return open({
        filename: './database.db', //o arquivo sera criado na raiz
        driver: sqlite3.Database
    })
}

//função para criar as tabela se ela nao existir

export async function setupDatabase() {
    const db = await openDB();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS piadas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pergunta TEXT NOT NULL,
            resposta TEXT NOT NULL,
            aprovada INTEGER DEFAULT 0,
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    console.log('Tabelas criadas ou já existiam.');

    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        );
    `);

    console.log('Tabela de usuários criada.');
}
