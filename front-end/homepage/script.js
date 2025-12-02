//fazer post da piada

document.getElementById('piadaForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const pergunta = document.getElementById('pergunta').value;
    const resposta = document.getElementById('resposta').value;

    console.log('Enviando piada:', { pergunta, resposta });
    const response = await fetch('http://localhost:3000/api/piadas/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pergunta, resposta })
    });

    if (response.ok) {
        document.getElementById('mensagem').innerText='Piada criada e esperando aprovação.'
        document.getElementById('piadaForm').reset();
    } else {
        document.getElementById('mensagem').innerText='Erro ao criar piada.'
    }
});

//pegar piada aleatória

document.getElementById('pegarPiadaBtn').addEventListener('click', async function () {
    const response = await fetch('http://localhost:3000/api/piadas/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    if (response.ok) {
        const piada = await response.json();
        document.getElementById('piadaDisplay').innerText = `Pergunta: ${piada.pergunta}\nResposta: ${piada.resposta}`;
    }
    else {
        document.getElementById('piadaDisplay').innerText = 'Nenhuma piada aprovada encontrada.';
    }
});