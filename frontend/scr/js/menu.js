import { containerFavorito, carregarCards } from "./favorito.js";
import { linksPaginacao } from "./home.js";
import { ocultarContainers, containerPesquisa, divLinks, divInputPesquisa } from "./pesquisa.js";
import { deletar} from "./banco.js";



const btnAbrirMenu = document.querySelector("#btn_cinfiguracao");
const btnFecharMenu = document.querySelector("#btn_fechar_menu");
const btnAbrirFavorito = document.querySelector("#btn_abrir_favoritos");
const menu = document.querySelector(".menu");
const animacao = document.querySelector(".animacao_menu");
const btnSairConta = document.querySelector("#btn_sair_conta");
const btnAbrirConfirmacaoDeletar = document.querySelector("#btn_deletar_conta");


const confirmacaoDeletar = document.querySelector(".div_confirmacao");
const btnSimDeletar = document.querySelector("#btn_sim");
const btnNaoDeletar = document.querySelector("#btn_nao");

const nomeUsuario = document.querySelector("#nome_usuario");
const emailUsuario = document.querySelector("#gmail_usuario");


export const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));



btnAbrirMenu.addEventListener("click", () => {
    nomeUsuario.textContent = "";
    emailUsuario.textContent = "";
    nomeUsuario.textContent = usuarioLogado.nome;
    emailUsuario.textContent = usuarioLogado.email;
    resetarAnimacaoMenu();
    menu.style.display = "flex";
})

btnFecharMenu.addEventListener("click", () => {
    animacaoMenuDesaparecer();
    setTimeout(() => {

        menu.style.display = "none";
    }, 700)
})

btnAbrirFavorito.addEventListener("click", () => {
    ocultarTodosContainers();
    carregarCards();
    containerFavorito.style.display = "grid";

    linksPaginacao.forEach(btn => {
        btn.classList.remove("ativa");
        btn.classList.add("categoria_filme");
        btn.style.color = "white";
    })
})

btnSairConta.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado")
    window.location.href = "/index.html";
})


btnAbrirConfirmacaoDeletar.addEventListener("click", () => {
    void confirmacaoDeletar.offsetWidth;
    confirmacaoDeletar.style.display = "grid";
})

btnNaoDeletar.addEventListener("click", () => {
        confirmacaoDeletar.style.display = "none";
})

btnSimDeletar.addEventListener("click", async () => {
    await deletarConta( usuarioLogado.id);
})

function resetarAnimacaoMenu() {
    animacao.style.animation = "animacaoMenu 1s ease";
    menu.classList.remove("animacao_menu");
    void menu.offsetWidth;
    menu.classList.add("animacao_menu");
}

function animacaoMenuDesaparecer() {
    animacao.style.animation = "desaparecerMenu 1s ease";
    menu.classList.remove("animacao_menu");
    void menu.offsetWidth;
    menu.classList.add("animacao_menu");
}

function ocultarTodosContainers() {
    ocultarContainers();
    containerPesquisa.style.display = 'none';
    divInputPesquisa.style.display = "none";
    divLinks.style.display = 'flex';

}


async function deletarConta(id) {
    try {
        deletar(id);
        localStorage.removeItem("usuarioLogado");
        window.location.href = "/index.html"
    } catch {
        console.log("erro")
    }
}



