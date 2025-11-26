import { login, criarConta } from "./banco.js";

export const usuarioLogado = {
    id: null,
    nome: null,
    email: null
};

const mensagem = document.querySelector("#mensagem_situacao_login");
const divMensagem = document.querySelector(".mensagem_situacao");

let resetTimeount;

const btnLogin = document.querySelector("#btn_login");
const btnCriar = document.querySelector("#btn_criar_conta");

const divCriar = document.querySelector("#div_criar");
const divLogin = document.querySelector("#div_login");
const btnAbrirCriar = document.querySelector("#btn_abrir_div_criar");
const btnAbrirLogin = document.querySelector("#btn_abrir_div_login");


btnLogin.addEventListener("click", () => {
    efetuarLogin();
})

btnCriar.addEventListener("click", () => {
    cadastro();
})

btnAbrirCriar.addEventListener("click", () => {
    divCriar.classList.remove("animacao_menssagem");
    void divCriar.offsetWidth;
    divCriar.classList.add("animacao_menssagem");
    divLogin.style.display = "none";
    divCriar.style.display = "grid";
})

btnAbrirLogin.addEventListener("click", () => {
    divLogin.classList.remove("animacao_menssagem");
    void divLogin.offsetWidth;
    divLogin.classList.add("animacao_menssagem");
    divCriar.style.display = "none";
    divLogin.style.display = "grid";
})


function exibirMensagem(tipo, texto) {
    clearTimeout(resetTimeount);

    if (tipo == "erro") {
        mensagem.textContent = "";
        mensagem.innerHTML = '<img src="/public/excluir.png" alt="" width="32">' + " " + texto;
        divMensagem.style.background = "#FF1C0C";
    } else {
        mensagem.textContent = "";
        mensagem.innerHTML = '<img src="/public/verificar.png" alt="" width="32">' + " " + texto;
        divMensagem.style.background = "#54d40ac9";
    }

    divMensagem.classList.remove("animacao_menssagem");
    void window.offsetWidth;
    divMensagem.classList.add("animacao_menssagem");

    divMensagem.style.display = "flex";

    resetTimeount = setTimeout(() => {
        divMensagem.style.display = "none";
    }, 4000);

}


async function efetuarLogin() {
    clearTimeout(resetTimeount);
    const inputEmail = document.querySelector("#input_email_login").value;
    const inputSenha = document.querySelector("#input_senha_login").value;

    const response = await login(inputEmail, inputSenha);

    console.log(response)
    if (inputEmail == "" || inputSenha == "") {

        exibirMensagem('erro', "PorFavor preencha todos os campos!");

    } else if (response.login) {

        exibirMensagem("", response.situacao);

        usuarioLogado.id = response.usuario[0].id;
        usuarioLogado.nome = response.usuario[0].nome;
        usuarioLogado.email = response.usuario[0].email;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));


        resetTimeount = setTimeout(() => {
            window.location.href = "/scr/pages/app.html"
        }, 2500)
        document.querySelector("#input_email_login").value = "";


    } else {
        exibirMensagem("erro", response.situacao);
    }

    document.querySelector("#input_senha_login").value = "";
}

async function cadastro() {
    clearTimeout(resetTimeount);
    const inputNome = document.querySelector("#input_criar_usuario").value;
    const inputEmail = document.querySelector("#input_criar_email").value;
    const inputSenha = document.querySelector("#input_criar_senha").value;
    const inputConfirmar = document.querySelector("#input_confirmar_senha").value;

    let response;

    if (inputEmail == "" || inputNome == "" || inputSenha == "" || inputConfirmar == "") {

        exibirMensagem('erro', "PorFavor preencha todos os campos!");

    } else if (inputSenha != inputConfirmar) {

        exibirMensagem("erro", "A senha tem que ser igual nos dois campos!");

    } else if (inputSenha.length < 8) {
        exibirMensagem("erro", "Minimo da senha e 8 Digitos!");
    } else {

        response = await criarConta(inputNome, inputEmail, inputSenha);

        if (response.login) {

            exibirMensagem("", response.situacao);
            resetTimeount = setTimeout(() => {
                divLogin.classList.remove("animacao_menssagem");
                void divLogin.offsetWidth;
                divLogin.classList.add("animacao_menssagem");
                divCriar.style.display = "none";
                divLogin.style.display = "grid";
            }, 1500)

        } else {

            exibirMensagem("erro", response.situacao);

        }
    }
    document.querySelector("#input_confirmar_senha").value = "";
}
