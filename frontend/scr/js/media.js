import { adicionarFavoritos, favoritos, deletarFavoritos } from "./banco.js";
import { usuarioLogado } from "./menu.js";
import { carregarPupulares, carregarFilmeSeries, buscarDetalhesMidia } from "./consumoApiTmdb/tmdbAPI.js";


export const urlImage = "https://image.tmdb.org/t/p/w500";


export const containerCardPopulares = document.querySelector(`#div_populares`);
export const btnEsquerda = document.querySelector(`#btn_esquerda`);
export const btnDireita = document.querySelector(`#btn_direita`);


export const botoesCategoria = document.querySelectorAll(".categorias");
export const btnAcao = document.getElementById(`28`);

const divFilmes = document.querySelector("#div_filmes");
export const btnVoltarFilme = document.querySelector(`#btn_voltar_filmes`);
export const btnBuscarFilmes = document.querySelector(`#btn_buscar_filmes`);

const divSeries = document.querySelector("#div_series");
export const btnVoltarSerie = document.querySelector(`#btn_voltar_series`);
export const btnBuscarSerie = document.querySelector(`#btn_buscar_series`);

const btnAbrirVideoTrailer = document.querySelectorAll(".btn_trailer_info");

const tituloInfo = document.querySelector("#titulo_info");
const textoDataCategoria = document.querySelector("#ano_lancamento");
const imgInfo = document.querySelector("#img_container_info");
const textoSinopse = document.querySelector("#texto_sinopse");
const avaliacao = document.querySelector("#avaliacao");
const divElenco = document.querySelector(".elenco");
const btnFavoritar = document.querySelector("#btn_favoritar");
const divBtnFavoritar = document.querySelector("#div_btn_favoritar");


let categoriaSelecionada = 28;
const corCategoriaSelecionada = "#40ECFF";

let paginaUrl = 1;
let inicio = 0;
let fim = 4;


const containerVideo = document.querySelector(".container_video");
const ifrimeVideo = document.querySelector("#iframe_video");
const fechar_Trailer = document.querySelector("#btn_fechar_trailer");
const fechar_div_video = document.querySelector("#btn_fechar_video");
const containerPrincipalInfo = document.querySelector(".container_trailer_info");




export async function buscarPopulares(tipo) {
    const lista = await carregarPupulares(tipo, inicio, fim);
    containerCardPopulares.innerHTML = "";
    lista.forEach((element, index) => {
        const card = criarCardPopulares(element, tipo, index);
        containerCardPopulares.appendChild(card);
    });
}

function criarCardPopulares(element, tipo, index) {
    const principal = document.createElement("div");
    const sombra = document.createElement("div");
    const titulo = document.createElement("h1");
    const divButton = document.createElement("div");
    const button = document.createElement("button");

    principal.className = index === 1 ? "estilo_com_mouse" : "estilo_sem_mouse";
    sombra.className = index === 1 ? "estilo_degrade_com_mouse" : "estilo_degrade_popular";
    principal.style.backgroundImage = `url("${urlImage + element.poster_path}")`;

    sombra.addEventListener("click", () => {
        abrirTrailer(element.id, tipo);
    });

    titulo.textContent = tipo === "filme" ? element.title : element.name;

    button.onclick = async (event) => {
        event.stopPropagation();
        const tipoMidia = tipo === "filme" ? "movie" : "tv";
        const response = await fetch(`https://demoflix-api.onrender.com/tmdb/trailer/${tipoMidia}/${element.id}`);
        const trailer = await response.json();
        ifrimeVideo.src = "https://www.youtube.com/embed/" + trailer.results[0].key;
        containerVideo.style.display = "grid";
    };

    button.innerHTML = '<img src="/public/botao-play.png" alt=""> Player Trailer';

    divButton.appendChild(button);
    principal.appendChild(sombra);
    principal.appendChild(titulo);
    principal.appendChild(divButton);

    return principal;
}


export function adicionarCardPopulares(tipo) {
    if (fim != 20) {
        inicio += 4;
        fim += 4;
        containerCardPopulares.textContent = "";
        containerCardPopulares.classList.remove("animacao_div_populares");
        void containerCardPopulares.offsetWidth;
        buscarPopulares(tipo, inicio, fim);
        containerCardPopulares.classList.add("animacao_div_populares");
    }
}

export function voltarCardPopulares(tipo) {
    if (inicio != 0) {
        inicio -= 4;
        fim -= 4;
        containerCardPopulares.textContent = "";

        containerCardPopulares.classList.remove("animacao_div_populares");
        void containerCardPopulares.offsetWidth;
        buscarPopulares(tipo, inicio, fim);
        containerCardPopulares.classList.add("animacao_div_populares");
    }
}

export async function buscarFilmeSerie(tipo, categoria, pagina) {

    const lista = await carregarFilmeSeries(tipo, categoria, pagina);
    lista.forEach((element) => {
        criarCardFilmeSerie(element, tipo);
    })

}


function criarCardFilmeSerie(element, tipo) {
    const principal = document.createElement("div");
    const divSombra = document.createElement("div");
    const titulo = document.createElement("p");
    const divAvaliacao = document.createElement("div");
    const avaliacao = document.createElement("p");
    const date = document.createElement("p");
    const img = document.createElement("img");

    principal.className = "div_cards";

    divSombra.addEventListener("click", async() => {

        await abrirTrailer(element.id, tipo);

    });

    divSombra.id = "estilo_div_cards";

    titulo.id = "titulo_div_Filmes";

    if (tipo == "filme") {
        titulo.textContent = element.title;
        date.textContent = element.release_date;
    } else {
        titulo.textContent = element.name;
        date.textContent = element.first_air_date;
    }

    avaliacao.innerHTML = `<img src="/public/estrela.png" alt=""> <span>${element.vote_average.toFixed(1)}</span>`;


    img.src = urlImage + element.poster_path;

    divAvaliacao.appendChild(avaliacao);
    divAvaliacao.appendChild(date);

    divSombra.appendChild(titulo);
    divSombra.appendChild(divAvaliacao);

    principal.appendChild(divSombra);
    principal.appendChild(img);

    if (tipo == "filme") {
        divFilmes.appendChild(principal);
    } else {
        divSeries.appendChild(principal);
    }
}


export async function adicionarCardsDivFilmeSerie(tipo, categoria, conversorCategoriaSerie) {
    switch (tipo) {
        case "filme":
            if (paginaUrl != 26) {

                divFilmes.textContent = "";
                divFilmes.classList.remove("animacao_div_populares");
                void divFilmes.offsetWidth;
                paginaUrl += 1;
                await buscarFilmeSerie("filme", categoria, paginaUrl);

                divFilmes.classList.add("animacao_div_populares");
            }
            break;
        case "serie":
            if (paginaUrl != 26) {

                divSeries.textContent = "";
                divSeries.classList.remove("animacao_div_populares");
                void divSeries.offsetWidth;
                paginaUrl += 1;

                await buscarFilmeSerie("serie", conversorCategoriaSerie[categoria], paginaUrl);

                divSeries.classList.add("animacao_div_populares");
            }
            break;

    }

}

export function voltarCardsDivFilmeSerie(tipo, categoria, conversorCategoriaSerie) {
    switch (tipo) {
        case "filme":
            if (paginaUrl != 1) {

                divFilmes.textContent = "";
                divFilmes.classList.remove("animacao_div_populares");
                void divFilmes.offsetWidth;
                paginaUrl -= 1;
                buscarFilmeSerie("filme", categoria, paginaUrl);

                divFilmes.classList.add("animacao_div_populares");
            }
            break;

        case "serie":
            if (paginaUrl != 1) {

                divSeries.textContent = "";
                divSeries.classList.remove("animacao_div_populares");
                void divSeries.offsetWidth;
                paginaUrl -= 1;

                buscarFilmeSerie("serie", conversorCategoriaSerie[categoria], paginaUrl);

                divSeries.classList.add("animacao_div_populares");
            }
            break;
    }

}



fechar_Trailer.addEventListener("click", () => {
    containerPrincipalInfo.style.display = "none";
})

fechar_div_video.addEventListener("click", () => {
    containerVideo.style.display = "none";
    ifrimeVideo.src = "none";
})

function atualizarInfoMidia(detalhes, tipo) {
    tituloInfo.textContent = tipo === "serie" ? detalhes.name : detalhes.title;
    textoDataCategoria.textContent = tipo === "serie"
        ? `${detalhes.first_air_date} • ${detalhes.number_of_seasons} Temporadas • Série`
        : `${detalhes.release_date} • Filme`;
    imgInfo.src = urlImage + detalhes.poster_path;
    textoSinopse.textContent = detalhes.overview || "Sem sinopse disponível";
    avaliacao.innerHTML = `<img src="/public/estrela.png" alt=""> ${detalhes.vote_average.toFixed(1)}`;
}

function configurarBotaoFavorito(detalhes, tipo, videos, favoritosUsuario) {
    const button = document.createElement("button");
    const img = document.createElement("img");
    img.src = '/public/love.png';
    button.id = "btn_favoritar";
    button.appendChild(img);
    divBtnFavoritar.textContent = '';
    divBtnFavoritar.appendChild(button);

    const jaFavoritado = favoritosUsuario.some(f => f.idTmdb === detalhes.id);
    button.style.background = jaFavoritado ? "red" : "none";

    button.addEventListener("click", async () => {
        const nome = tipo === "serie" ? detalhes.name : detalhes.title;
        const categoria = tipo === "serie" ? "Série" : "Filme";
        const key = videos.results[0]?.key;

        if (button.style.background === "none") {
            button.style.background = "red";
            await adicionarFavoritos(nome, categoria, detalhes.poster_path, key, detalhes.id, usuarioLogado.id);
        } else {
            button.style.background = "none";
            await deletarFavoritos(categoria, detalhes.id, usuarioLogado.id);
        }
    });
}

function renderizarElenco(elenco) {
    divElenco.textContent = "";
    elenco.cast.slice(0, 6).forEach(ator => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const p = document.createElement("p");
        img.src = urlImage + ator.profile_path;
        p.textContent = ator.name;
        div.appendChild(img);
        div.appendChild(p);
        divElenco.appendChild(div);
    });
}

function configurarTrailer(videos) {
    const key = videos.results[0]?.key;
    btnAbrirVideoTrailer.forEach(btn => {
        btn.onclick = () => {
            ifrimeVideo.src = `https://www.youtube.com/embed/${key}`;
            containerVideo.style.display = "grid";
        };
    });
}


export async function abrirTrailer(id, tipo) {
    const favoritosUsuario = await favoritos(usuarioLogado.id);
    const { detalhes, elenco, videos } = await buscarDetalhesMidia(id, tipo);

    await atualizarInfoMidia(detalhes, tipo);
    await configurarBotaoFavorito(detalhes, tipo, videos, favoritosUsuario.content);
    await renderizarElenco(elenco);
    await configurarTrailer(videos);

    containerPrincipalInfo.style.display = "grid";
}



