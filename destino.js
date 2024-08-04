const destinos = [
    { nome: 'Lençóis Maranhenses', municipio: 'Barreirinhas', imagem: './img/pikaso_texttoimage_35mm-film-photography-Aweinspiring-4K-aerial-shot-.jpeg', descricao: 'Um paraíso de dunas brancas e lagoas azuis.', favoritos: [] },
    { nome: 'Centro Histórico de São Luís', municipio: 'São Luís', imagem: './img/centrohistorico.jpeg', descricao: 'Um conjunto arquitetônico colonial com casarões e igrejas.', favoritos: [] },
    { nome: 'Alcântara', municipio: 'Alcântara', imagem: './img/alcantara.jpeg', descricao: 'Um vilarejo histórico com construções coloniais e paisagens deslumbrantes.', favoritos: [] }
];

function renderizarDestinos(destinos) {
    const listaDestinos = document.getElementById('lista-destinos');
    listaDestinos.innerHTML = '';

    destinos.forEach(destino => {
        const divDestino = document.createElement('div');
        divDestino.classList.add('destino');
        divDestino.dataset.destinoId = destino.nome;


        divDestino.addEventListener('click', () => {
            openModal(destino);
        });

        const imgDestino = document.createElement('img');
        imgDestino.src = destino.imagem;
        imgDestino.alt = destino.nome;

        const h3Destino = document.createElement('h3');
        h3Destino.textContent = destino.nome;

        const pDestino = document.createElement('p');
        pDestino.textContent = `Município: ${destino.municipio}`;

        divDestino.appendChild(imgDestino);
        divDestino.appendChild(h3Destino);
        divDestino.appendChild(pDestino);

        listaDestinos.appendChild(divDestino);
    });
}


function openModal(destino) {
    const modal = document.getElementById('modal-destino');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalImagem = document.getElementById('modal-imagem');
    const modalDescricao = document.getElementById('modal-descricao');
    const btnFavoritar = document.getElementById('btn-favoritar');

    modalTitulo.textContent = destino.nome;
    modalImagem.src = destino.imagem;
    modalDescricao.textContent = destino.descricao;

    if (destino.favoritos.includes(localStorage.getItem('usuario'))) {
        btnFavoritar.textContent = 'Remover dos Favoritos';
    } else {
        btnFavoritar.textContent = 'Favoritar';
    }

    btnFavoritar.addEventListener('click', () => {
        if (btnFavoritar.textContent === 'Favoritar') {
            destino.favoritos.push(localStorage.getItem('usuario'));
            btnFavoritar.textContent = 'Remover dos Favoritos';
        } else {
            const index = destino.favoritos.indexOf(localStorage.getItem('usuario'));
            destino.favoritos.splice(index, 1);
            btnFavoritar.textContent = 'Favoritar';
        }
    });

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal-destino');
    modal.style.display = 'none';
}

renderizarDestinos(destinos);

const buscaDestinoInput = document.getElementById('busca-destino');
const btnPesquisa = document.getElementById('btn-pesquisa');

btnPesquisa.addEventListener('click', () => {
    const termoBusca = buscaDestinoInput.value.toLowerCase();
    const destinosFiltrados = destinos.filter(destino => 
        destino.nome.toLowerCase().includes(termoBusca)
    );
    renderizarDestinos(destinosFiltrados);
});

const filtroMunicipioSelect = document.getElementById('filtro-municipio');

filtroMunicipioSelect.addEventListener('change', () => {
    const municipioSelecionado = filtroMunicipioSelect.value;
    const destinosFiltrados = destinos.filter(destino => 
        destino.municipio === municipioSelecionado || municipioSelecionado === ''
    );
    renderizarDestinos(destinosFiltrados);
});