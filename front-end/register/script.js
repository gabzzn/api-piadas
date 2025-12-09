document.getElementById('registroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    console.log('Registrando usuário:', { email, senha });

    const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
        document.getElementById('mensagem').innerText = 'Usuário registrado com sucesso.';
        document.getElementById('registroForm').reset();
    } else {
        document.getElementById('mensagem').innerText = 'Erro ao registrar usuário.';
    }
});
