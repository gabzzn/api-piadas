import { openDB } from "../config/database.js";

//função responsável apenas por INSERIR no banco
export async function createPiada(pergunta, resposta) {
    const db = await openDB();

    //executa o insert
    //o '?' é um placeholder para evitar SQL Injection (segurança básica)
    const result = await db.run(
        'INSERT INTO piadas (pergunta, resposta) VALUES (?, ?)',
        pergunta,
        resposta
    );

    //retorna um objeto com ID que acabou de ser criado
    return {
        id: result.lastID,
        pergunta,
        resposta
    };
}

//pega uma piada aleatoria aprovada
export async function getPiadaAleatoria() {
    const db = await openDB();

    //1 SELECT: pega uma piada aleatória aprovada
    //2 FROM PIADAS: da tabela de piadas
    //3 WHERE APROVADO = 1: apenas as moderadas e aprovadas
    //4 ORDER BY RANDOM(): embaralha tudo
    //5 LIMIT 1: pega só uma
    const piada = await db.get(
        `
           SELECT id, pergunta, resposta
           FROM piadas where aprovada = 1 ORDER BY RANDOM() LIMIT 1
        `
     );
    
    return piada;
}

//lista apenas as piadas que ainda NÃO foram moderadas
export async function getPiadasPendentes() {
    const db = await openDB();
    return await db.all('SELECT * FROM piadas WHERE aprovada = 0');
}

//modera (aprova ou rejeita) uma piada pelo id
export async function moderarPiada(id, aprovada) {
    const db = await openDB();

    //altera os dados existentes
    const result = await db.run(
        'UPDATE piadas SET aprovada = ? WHERE id = ?',
        aprovada,
        id
    );
    
    //se alterou alguma linha, retorna true
    return result.changes > 0;
}