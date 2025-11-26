import { linkHome } from "./home.js";
import { mostrarContainers } from "./pesquisa.js";
import { favoritos, deletarFavoritos } from "./banco.js";
import { usuarioLogado } from "./menu.js";
import { urlImage, abrirTrailer } from "./media.js";



export const containerFavorito = document.querySelector(".container_favoritar");
const btnfecharDivFavorito = document.querySelector("#btn_fechar_favorito");
const btnsFiltrarFavoritos = document.querySelectorAll(".btn_normal_favoritar");
const btnTodos = document.querySelector("#btn_todos");

const containerFilmes = document.querySelector(".div_filmes_favoritos");
const containerSeries = document.querySelector(".div_series_favoritos");

const divCadsFilmes = document.querySelector(".card_favorito_filme");
const divCadsSeries = document.querySelector(".card_favorito_serie");


//padrao frilto
btnTodos.classList.remove("btn_normal_favoritar");
btnTodos.classList.add("btn_ativo_favoritar")


btnsFiltrarFavoritos.forEach(btn => {
    btn.addEventListener("click", () => {
        btnsFiltrarFavoritos.forEach(b => {
            b.classList.remove("btn_ativo_favoritar");
            b.classList.add("btn_normal_favoritar");
        })
        btn.classList.remove("btn_normal_favoritar");
        btn.classList.add("btn_ativo_favoritar");
        filtroButtons(btn.id);
    })
})

btnfecharDivFavorito.addEventListener("click", () => {
    containerFavorito.style.display = "none";
    mostrarContainers();
    linkHome.classList.add("ativa");
    linkHome.style.color = "black";
})

function filtroButtons(id) {
    switch (id) {
        case "btn_todos":

            containerFilmes.style.display = "grid";
            containerSeries.style.display = "grid";
            break;

        case "btn_filmes_favoritar":

            containerFilmes.style.display = "grid";
            containerSeries.style.display = "none";
            break;


        case "btn_series_favoritar":

            containerFilmes.style.display = "none";
            containerSeries.style.display = "grid";
            break;


    }
}


export async function carregarCards() {
    const favoritoDoUsuario = await favoritos(usuarioLogado.id);

    divCadsFilmes.textContent = "";
    divCadsSeries.textContent = "";

    favoritoDoUsuario.forEach(elemento => {
        if (elemento.tipo == "Filme") {
            criarCadsFavorito(elemento.titulo, elemento.imagem, divCadsFilmes, elemento.idTmdb, elemento.tipo);
        } else if (elemento.tipo == "Série") {
            criarCadsFavorito(elemento.titulo, elemento.imagem, divCadsSeries, elemento.idTmdb, elemento.tipo);
        }
    })

    if (divCadsFilmes.textContent == "") {
        cardBuscaZero(divCadsFilmes);
    }
    if (divCadsSeries.textContent == "") {
        cardBuscaZero(divCadsSeries);
    }

}


function criarCadsFavorito(titulo, keyImg, elementoPrinciapal, idTmdb, tipo) {

    const divPrincipal = document.createElement("div");
    const divSombra = document.createElement("div");
    const button = document.createElement("button");
    const buttonIMG = document.createElement("img");
    const h5 = document.createElement("h5");
    const img = document.createElement("img");

    divSombra.onclick = async () => {
        let tipoConvertido = tipo == "Filme" ? "filme" : "serie";
        
        abrirTrailer(idTmdb, tipoConvertido);
    }


    button.onclick = async () => {
        event.stopPropagation()
        await deletarFavoritos(tipo, idTmdb, usuarioLogado.id);
        divPrincipal.remove();
    }


    divPrincipal.style.boxShadow = "2px 2px 8px white";
    divPrincipal.style.display = "grid";
    divPrincipal.style.borderRadius = "20px";
    divPrincipal.style.position = "relative";
    divPrincipal.style.zIndex = "1";

    divSombra.id = "efeito_sombra_favoritar";

    buttonIMG.src = "/public/excluir.png";
    buttonIMG.style.width = "32px";



    button.appendChild(buttonIMG);

    h5.textContent = titulo;

    divSombra.appendChild(button);
    divSombra.appendChild(h5);


    img.src = urlImage + keyImg;
    img.id = "img_favoritar";

    divPrincipal.appendChild(divSombra);
    divPrincipal.appendChild(img);

    elementoPrinciapal.appendChild(divPrincipal);
}

function cardBuscaZero(elementoPrinciapal) {
    const h1 = document.createElement("h1");
    const divPrincipal = document.createElement("div");

    h1.textContent = "Sem Favorito Adicionado!";

    divPrincipal.appendChild(h1);

    elementoPrinciapal.appendChild(divPrincipal)

}
