//função para criar o usuário que será utilizado (por meio da importação) no authController

import { openDB } from '../config/database.js';

export async function createUser(email, senhaHash) {
    const db = await openDB();
    const result = await db.run(
        'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
        email,
        senhaHash
    );
    return { id: result.lastID, email };
}

export async function createUser(email, senha) {
    const db = await openDB();
    const result = await db.run(
        'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
        email,
        senha
    );
    return { id: result.lastID, email };
}