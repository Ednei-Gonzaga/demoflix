import { resetarAnimacao } from "./home.js";
import { containerFavorito } from "./favorito.js";
import { urlImage, abrirTrailer } from "./media.js";
import { pesquisaFilmeSerie } from "./consumoApiTmdb/tmdbAPI.js";

let paginaTotalFilmes = 0;
let paginaTotalSeries = 0;
let paginaAtualSerie = 1;
let paginaAtualFilme = 1;
let controller = null;

export const divLinks = document.querySelector("#div_links");
export const containerPesquisa = document.querySelector(".container_pesquisa");
const linkAbrirPesquisa = document.querySelector("#btn_abrir_pesquisa");
const btnfecharPesquisa = document.querySelector("#btn_fechar_pesquisa");
export const divInputPesquisa = document.querySelector("#div_pesquisa");

const btnRealizarPesquisa = document.querySelector("#btn_pesquisa");

export const containerPopulares = document.querySelector(".container_populares");
const containerCategorias = document.querySelector(".container_categorias");
const containerFilmes = document.querySelector(".container_filmes");
const containerSeries = document.querySelector(".container_series");



const containerCadsFilmesPesquisado = document.querySelector(".container_cards_filmes_pesquisado");
const containerCadsSeriesPesquisado = document.querySelector(".container_cards_series_pesquisado");

const divPesquisaFilme = document.querySelector(".pesquisa_filme");
const divPesquisaSerie = document.querySelector(".pesquisa_serie");

const totalFilmesEncontrado = document.querySelector("#text_qtd_filmes");
const totalSeriesEncontrado = document.querySelector("#text_qtd_series");

const spanPaginaAtualFilme = document.querySelector("#pagina_atual_filme");
const spanTotalPaginaFilmes = document.querySelector("#total_pagina_filme");

const spanPaginaAtualSerie = document.querySelector("#pagina_atual_serie");
const spanTotalPaginaSerie = document.querySelector("#total_pagina_serie");


const btnCarregarFilmesBuscados = document.querySelector("#btn_carregar_filmes");
const btnCarregarSeriesBuscadas = document.querySelector("#btn_carregar_series");

const btnVoltarPaginaFilme = document.querySelector("#btn_voltar_pesquisa_filme");
const btnAvancarPaginaFilme = document.querySelector("#btn_buscar_pesquisa_filme");


const btnVoltarPaginaSerie = document.querySelector("#btn_voltar_pesquisa_serie");
const btnAvancarPaginaSerie = document.querySelector("#btn_buscar_pesquisa_serie");


const btnMostraQtd = document.querySelectorAll(".botoes_conta");


btnMostraQtd.forEach(btn => {

    btn.addEventListener("click", () => {
        btnMostraQtd.forEach(b => {
            b.classList.remove("btn_ativo");
            b.classList.add("btn_normal");
            b.style.background = "black";
        });
        btn.classList.add("btn_ativo");
        btn.style.background = "aqua"
        btn.classList.remove("btn_normal");

    });
});

btnCarregarFilmesBuscados.style.background = "aqua";

linkAbrirPesquisa.addEventListener("click", () => {
    ocultarContainers();
    containerPesquisa.style.display = "flex";
    divInputPesquisa.style.display = "flex";
    containerFavorito.style.display = "none";


})

btnfecharPesquisa.addEventListener("click", () => {
    if (controller) controller.abort();
    containerPesquisa.style.display = "none";
    divInputPesquisa.style.display = "none";
    mostrarContainers();

    containerFavorito.style.display = "none";

    totalFilmesEncontrado.textContent = "0";
    totalSeriesEncontrado.textContent = "0";
    divPesquisaFilme.textContent = "";
    divPesquisaSerie.textContent = "";
    const input = document.querySelector("#text_pesquisado").value = "";
})

btnRealizarPesquisa.addEventListener("click", () => {
    divPesquisaFilme.textContent = "";
    divPesquisaSerie.textContent = "";
    spanPaginaAtualFilme.textContent = paginaAtualFilme;
    spanPaginaAtualSerie.textContent = paginaAtualSerie;

    const input = document.querySelector("#text_pesquisado").value;

    pesquisaSeriesFilmes("filme", input, 1);
    pesquisaSeriesFilmes("serie", input, 1);
})

btnCarregarFilmesBuscados.addEventListener("click", () => {
    containerCadsSeriesPesquisado.style.display = "none";
    containerCadsFilmesPesquisado.style.display = "grid";
})

btnCarregarSeriesBuscadas.addEventListener("click", () => {
    containerCadsFilmesPesquisado.style.display = "none";
    containerCadsSeriesPesquisado.style.display = "grid";
})

btnVoltarPaginaFilme.addEventListener("click", () => {

    if (paginaAtualFilme > 1) {
        divPesquisaFilme.textContent = "";
        paginaAtualFilme -= 1;
        const input = document.querySelector("#text_pesquisado").value;
        pesquisaSeriesFilmes("filme", input, paginaAtualFilme);
    }
    spanPaginaAtualFilme.textContent = paginaAtualFilme;

})

btnAvancarPaginaFilme.addEventListener("click", () => {
    if (paginaAtualFilme != paginaTotalFilmes) {
        divPesquisaFilme.textContent = "";
        paginaAtualFilme += 1;
        const input = document.querySelector("#text_pesquisado").value;
        pesquisaSeriesFilmes("filme", input, paginaAtualFilme);
    }
    spanPaginaAtualFilme.textContent = paginaAtualFilme;

})


btnVoltarPaginaSerie.addEventListener("click", () => {

    if (paginaAtualSerie > 1) {
        divPesquisaSerie.textContent = "";
        paginaAtualSerie -= 1;
        const input = document.querySelector("#text_pesquisado").value;
        pesquisaSeriesFilmes("serie", input, paginaAtualSerie);
    }
    spanPaginaAtualSerie.textContent = paginaAtualSerie;

})

btnAvancarPaginaSerie.addEventListener("click", () => {
    if (paginaAtualSerie != paginaTotalSeries) {
        divPesquisaSerie.textContent = "";
        paginaAtualSerie += 1;
        const input = document.querySelector("#text_pesquisado").value;
        pesquisaSeriesFilmes("serie", input, paginaAtualSerie);
    }
    spanPaginaAtualSerie.textContent = paginaAtualSerie;

})



export function ocultarContainers() {
    divLinks.style.display = "none";
    containerPesquisa.style.display = "none";
    containerPopulares.style.display = "none";
    containerCategorias.style.display = "none";
    containerFilmes.style.display = "none";
    containerSeries.style.display = "none";
}

export function mostrarContainers() {
    resetarAnimacao();
    divLinks.style.display = "flex";
    containerPopulares.style.display = "flex";
    containerCategorias.style.display = "flex";
    containerFilmes.style.display = "block";
    containerSeries.style.display = "block";

}

async function pesquisaSeriesFilmes(tipo, nome, pagina) {

    if (nome != "") {
        const response = await pesquisaFilmeSerie(tipo, nome, pagina);
        const obj = response.results;

        switch (tipo) {
            case "filme":
                paginaTotalFilmes = response.total_pages;
                spanTotalPaginaFilmes.textContent = response.total_pages;

                criarCardsPesquisa(obj, tipo, divPesquisaFilme);
                totalFilmesEncontrado.textContent = response.total_results;
                break;
            case "serie":
                paginaTotalSeries = response.total_pages;
                spanTotalPaginaSerie.textContent = response.total_pages;

                criarCardsPesquisa(obj, tipo, divPesquisaSerie);
                totalSeriesEncontrado.textContent = response.total_results;
                break;
        }
    }
}


function criarCardsPesquisa(obj, tipo, elementoPrincipal) {
    let mensagemErro = document.createElement("h1");

    if (obj.length == 0) {
        mensagemErro.textContent = "Nada foi encontrado!!";
        mensagemErro.style.color = "white";

        elementoPrincipal.appendChild(mensagemErro);
    }

    obj.forEach(element => {
        let divPrincipal = document.createElement("div");
        let img = document.createElement("img");
        let divInfo = document.createElement("div");
        let titulo = document.createElement("h3");
        let data = document.createElement("p");
        let tituloSinopse = document.createElement("h3");
        let textoSinopse = document.createElement("p");

        divPrincipal.id = "resultado_filme";


        img.src = urlImage + element.poster_path;

        data.id = "sinopse_pesquisa";

        tituloSinopse.textContent = "Sinopse";

        textoSinopse.id = "sinopse_pesquisa"
        textoSinopse.textContent = element.overview || "Sem sinopse disponivel!";


        if (tipo == "filme") {

            divPrincipal.addEventListener("click", () => {
                abrirTrailer(element.id, "filme");
            })

            titulo.textContent = element.title;
            data.textContent = element.release_date + "    •   " + "Filme";

        } else if (tipo == "serie") {
            divPrincipal.addEventListener("click", () => {
                abrirTrailer(element.id, "serie");
            })

            titulo.textContent = element.name;
            data.textContent = element.first_air_date + "    •   " + "Serie";
        }


        divInfo.appendChild(titulo);
        divInfo.appendChild(data);
        divInfo.appendChild(tituloSinopse);
        divInfo.appendChild(textoSinopse);

        divPrincipal.appendChild(img);
        divPrincipal.appendChild(divInfo);

        elementoPrincipal.appendChild(divPrincipal);

    });
}