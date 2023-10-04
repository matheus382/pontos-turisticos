// Função para rolar suavemente até o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listener para o botão "Voltar ao Topo"
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopButton = document.getElementById('scrollToTopButton');

    scrollToTopButton.addEventListener('click', function () {
        scrollToTop();
    });
});

// Função para alternar entre "Ler Mais" e "Ler Menos" nos destinos
const lerMaisBotoes = document.querySelectorAll(".ler-mais");

lerMaisBotoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const destino = botao.parentElement.querySelector(".pop-up");
        const lerMenosBotao = botao.parentElement.querySelector(".ler-menos");

        if (destino.style.display === "none" || destino.style.display === "") {
            destino.style.display = "block";
            botao.style.display = "none";
            lerMenosBotao.style.display = "block";
        } else {
            destino.style.display = "none";
            botao.style.display = "block";
            lerMenosBotao.style.display = "none";
        }
    });
});

// Função para exibir informações do estado quando o usuário clica no botão !?
const estadoInfoButtons = document.querySelectorAll(".estado-info");

estadoInfoButtons.forEach((botao) => {
    botao.addEventListener("click", (e) => {
        e.preventDefault();
        const estado = botao.getAttribute("data-estado");
        const mensagem = obterMensagemEstado(estado); // Função para obter a mensagem do estado
        exibirBalao(e.target, mensagem); // Alterado para exibir o balão ao lado do botão
    });
});

// Função para exibir um balão com informações sobre o estado
function exibirBalao(target, mensagem) {
    const balao = document.createElement("div");
    balao.classList.add("balao");
    balao.textContent = mensagem;

    // Posicione o balão próximo ao botão clicado
    const rect = target.getBoundingClientRect();
    balao.style.top = rect.bottom + "px";
    balao.style.left = rect.left + "px";

    // Adicione o balão à página
    document.body.appendChild(balao);

    // Feche o balão quando clicado em qualquer lugar fora dele
    document.addEventListener("click", (e) => {
        if (e.target !== target && e.target !== balao) {
            balao.remove();
        }
    });
}

// Função para obter a mensagem do estado (substitua pelo conteúdo real)
function obterMensagemEstado(estado) {
    switch (estado) {
        case "Pernambuco":
            return "Pernambuco é um estado localizado na região nordeste do Brasil, conhecido por suas belas praias e cultura rica.";
        // Adicione mensagens para outros estados aqui
        default:
            return "Informações não disponíveis.";
    }
}

// Variáveis para rastrear o estado do arrastar
let isDragging = false;
let offsetX, offsetY;

// Elemento do cabeçalho do pop-up
const popUpHeader = document.querySelector('.pop-up-header');

// Elemento do pop-up
const popUp = document.querySelector('.pop-up');

// Evento para iniciar o arrastar quando o mouse é pressionado
popUpHeader.addEventListener('mousedown', (e) => {
    isDragging = true;

    // Salvar a posição do mouse no momento do clique em relação ao pop-up
    offsetX = e.clientX - popUp.getBoundingClientRect().left;
    offsetY = e.clientY - popUp.getBoundingClientRect().top;
});

// Evento para parar o arrastar quando o mouse é liberado
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Evento para mover o pop-up quando o mouse é movido
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // Calcular a nova posição do pop-up com base na posição atual do mouse
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    // Definir a nova posição do pop-up
    popUp.style.left = newX + 'px';
    popUp.style.top = newY + 'px';
});

// Função para mostrar o pop-up
function mostrarPopUp() {
    popUp.style.display = 'block';
}

// Função para fechar o pop-up
function fecharPopUp() {
    popUp.style.display = 'none';
}

// Event listener para o botão de informações
const infoButton = document.querySelector('.info-button');
if (infoButton) {
    infoButton.addEventListener('click', mostrarPopUp);
}

// Event listener para o botão de fechar no pop-up
const fecharPopUpButton = document.querySelector('.fechar-pop-up');
if (fecharPopUpButton) {
    fecharPopUpButton.addEventListener('click', fecharPopUp);
}
