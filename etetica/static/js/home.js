// ==========================================
// SEU CÓDIGO ORIGINAL (Menu, Scroll e Ano)
// ==========================================

// Atualizar ano do footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menu Mobile Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Fechar menu mobile ao clicar num link
const mobileLinks = menu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});

// Efeito de sombra na Navbar ao rolar a página
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// ==========================================
// CÓDIGO DO DECAP CMS (Carregar Dados)
// ==========================================

async function carregarDadosCMS() {
    try {
        // Tenta buscar o arquivo dados.json que o CMS cria
        const resposta = await fetch('dados.json');
        
        // Se o arquivo ainda não existir (cliente não salvou nada ainda), ele para por aqui sem dar erro
        if (!resposta.ok) return; 
        
        const dados = await resposta.json();

        // Substitui os textos na página
        if (dados.titulo_hero) {
            document.getElementById('cms-titulo-hero').innerHTML = dados.titulo_hero;
        }
        if (dados.subtitulo_hero) {
            document.getElementById('cms-subtitulo-hero').textContent = dados.subtitulo_hero;
        }
        if (dados.foto_sobre) {
            document.getElementById('cms-foto-sobre').src = dados.foto_sobre;
        }
        if (dados.texto_sobre) {
            document.getElementById('cms-texto-sobre').innerHTML = dados.texto_sobre;
        }

        // Substitui a galeria de imagens
        if (dados.galeria && dados.galeria.length > 0) {
            const galeriaContainer = document.getElementById('cms-galeria-container');
            galeriaContainer.innerHTML = ''; // Limpa as imagens antigas

            dados.galeria.forEach(item => {
                const div = document.createElement('div');
                div.className = 'aspect-square overflow-hidden rounded-lg';
                div.innerHTML = `<img src="${item.foto}" alt="Resultado" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500">`;
                galeriaContainer.appendChild(div);
            });
        }

    } catch (erro) {
        console.log("Ainda não há dados do CMS para carregar ou ocorreu um erro.", erro);
    }
}

// Executa a função assim que a página carrega
carregarDadosCMS();