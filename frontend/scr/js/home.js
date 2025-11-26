import { containerFavorito } from "./favorito.js";
import { containerPesquisa, containerPopulares } from "./pesquisa.js";
import { buscarPopulares, adicionarCardPopulares, voltarCardPopulares, btnDireita, btnEsquerda, botoesCategoria, btnAcao, containerCardPopulares, buscarFilmeSerie, adicionarCardsDivFilmeSerie, voltarCardsDivFilmeSerie, btnBuscarFilmes, btnVoltarFilme, btnVoltarSerie, btnBuscarSerie } from "./media.js";


//Variaveis de paginação 
export const linksPaginacao = document.querySelectorAll(".links_paginacao");
export const linkHome = document.querySelector("#home");



//Variavel para Alternar entre Serire e FIlme e amarzenar valor ao clicar
let alternador = false;
let pagina = "home";

//Contadores para constriur URL
let paginaUrl = 1;
let categoriaSelecionada = 28;

//Variaveis dos containers principais de Filmes e Series
const containerPrincipalFilme = document.querySelector(".container_filmes");
const containerPrincipalSerie = document.querySelector(".container_series");

//variaveis divSeries e divFilmes
const divSeries = document.querySelector("#div_series");
const divFilmes = document.querySelector("#div_filmes");

// para converter generode filme para serie
const mapaGeneros = {
  28: 10759,
  12: 10759,
  53: 9648,
  35: 35,
  27: 9648,
  10751: 10751

};

//Adicionando eventos para os links de PAGINAÇÃO
linksPaginacao.forEach(link => {
  link.addEventListener("click", () => {
    divFilmes.textContent = "";
    divSeries.textContent = "";
    containerCardPopulares.textContent = "";
    linksPaginacao.forEach(b => {
      b.classList.remove("ativa");
      b.classList.add("categoria_filme");
      b.style.color = "white";


    })
    link.classList.add("ativa");
    link.classList.remove("categoria_filme");
    link.style.color = "black";
    pagina = link.id;
    principal(pagina);
  });
})


//Carregamento padrão para pagina
linkHome.classList.add("ativa");
linkHome.style.color = "black";
btnAcao.classList.add("ativa");
btnAcao.style.color = "black";
principal(pagina);


// função que buscara tudo conforme clica no link de paginação
async function principal(linkPaginacao) {

  divFilmes.textContent = "";
  divSeries.textContent = "";
  containerCardPopulares.textContent = "";

  switch (linkPaginacao) {
    case "home":
      resetarAnimacao();
      divFilmes.textContent = "";
      divSeries.textContent = "";
      containerPrincipalSerie.style.display = "grid";
      containerPrincipalFilme.style.display = "grid";
      manipularContainers();

      buscarPopulares("filme");

      adicionarEventoSetaPulares(linkPaginacao);

      buscarFilmeSerie("filme", 28, 1);
      buscarFilmeSerie("serie", 10759, 1);


      break;

    case "filme":
      resetarAnimacao();
      divFilmes.textContent = "";
      divSeries.textContent = "";
      containerPrincipalFilme.style.display = "grid";
      containerPrincipalSerie.style.display = "none";
      manipularContainers();
      buscarPopulares("filme");

      adicionarEventoSetaPulares(linkPaginacao);
      
      buscarFilmeSerie("filme", 28, 1);

      break;


    case "serie":
      resetarAnimacao();
      divFilmes.textContent = "";
      divSeries.textContent = "";
      containerPrincipalSerie.style.display = "grid";
      containerPrincipalFilme.style.display = "none";

      manipularContainers();
      buscarPopulares("serie");
      
      adicionarEventoSetaPulares(linkPaginacao);

      buscarFilmeSerie("serie", 10759, 1);
      break;
  }



}



//Adicionando evento Clique butonn CATEGORIAS]
botoesCategoria.forEach(btn => {
  btn.onclick = () => {
    paginaUrl = 1;
    categoriaSelecionada = btn.id;
    divSeries.textContent = "";
    divFilmes.textContent = "";

    botoesCategoria.forEach(b => {
      b.classList.remove("ativa");
      b.classList.add("categorias");
      b.style.color = "white";
    });

    btn.classList.add("ativa");
    btn.classList.remove("categorias");
    btn.style.color = "black";

    // Animação
    divSeries.classList.remove("animacao_div_populares");
    divFilmes.classList.remove("animacao_div_populares");
    void divSeries.offsetWidth;
    void divFilmes.offsetWidth;

    // Pega o ID correto da categoria para série
    const idCategoriaFilme = btn.id;
    const idCategoriaSerie = mapaGeneros[idCategoriaFilme] || idCategoriaFilme;


    // Chama a função para buscar séries
    buscarFilmeSerie("serie", idCategoriaSerie, paginaUrl);
    buscarFilmeSerie("filme", idCategoriaFilme, paginaUrl);


    divSeries.classList.add("animacao_div_populares");
    divFilmes.classList.add("animacao_div_populares");
  };
});

//Adcionando evento nos buttons Setas DivFilmes e DiSeries
btnBuscarFilmes.onclick = () => {
  adicionarCardsDivFilmeSerie("filme", categoriaSelecionada);
}
btnVoltarFilme.onclick = () => {
  voltarCardsDivFilmeSerie("filme", categoriaSelecionada);
}
btnBuscarSerie.onclick = () => {
  adicionarCardsDivFilmeSerie("serie", categoriaSelecionada, mapaGeneros);
}
btnVoltarSerie.onclick = () => {
  voltarCardsDivFilmeSerie("serie", categoriaSelecionada, mapaGeneros);
}


// função Resetar animações ao trocar paginação
export function resetarAnimacao() {
  divSeries.classList.remove("animacao_div_populares");
  divFilmes.classList.remove("animacao_div_populares");
  containerCardPopulares.classList.remove("animacao_div_populares");
  void divSeries.offsetWidth;
  void divFilmes.offsetWidth;
  divSeries.classList.add("animacao_div_populares");
  divFilmes.classList.add("animacao_div_populares");
  containerCardPopulares.classList.add("animacao_div_populares");
}

function manipularContainers() {
  containerPopulares.style.display = "flex"
  containerFavorito.style.display = "none";
  containerPesquisa.style.display = "none";

}




function adicionarEventoSetaPulares(linkPaginacao) {
  switch (linkPaginacao) {

    case "home":
      btnEsquerda.onclick = () => {
        if (alternador == false) {
          voltarCardPopulares("serie");
          alternador = true;
        } else {
          voltarCardPopulares("filme");
          alternador = false;
        }
      };

      btnDireita.onclick = () => {
        if (alternador == false) {
          adicionarCardPopulares("serie");
          alternador = true;
        } else {
          adicionarCardPopulares("filme");
          alternador = false;
        }
      };
      break;

    case "filme":
      btnEsquerda.onclick = () => {
        voltarCardPopulares("filme");
      }
      btnDireita.onclick = () => {
        adicionarCardPopulares("filme");
      };
      break;

    case "serie":
      btnEsquerda.onclick = () => {
        voltarCardPopulares("serie");
      }
      btnDireita.onclick = () => {
        adicionarCardPopulares("serie");
      };
      break;
  };



}
