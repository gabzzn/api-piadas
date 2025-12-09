async function carregarPiadasPendentes() {
    const response = await fetch('http://localhost:3000/api/piadas/pendentes');
    const piadas = await response.json();
    const lista = document.getElementById('listaPiadasPendentes');
    lista.innerHTML = '';

    piadas.forEach(piada => {
        const li = document.createElement('li');
        li.innerText = `Pergunta: ${piada.pergunta} - Resposta: ${piada.resposta} `;

        const aprovarBtn = document.createElement('button');
        aprovarBtn.innerText = 'Aprovar';
        aprovarBtn.onclick = async () => {
            await fetch(`http://localhost:3000/api/piadas/${piada.id}/aprovar`, {
                method: 'PUT'
            });
            carregarPiadasPendentes();
        };

        li.appendChild(aprovarBtn);
        lista.appendChild(li);
    });
}

carregarPiadasPendentes();