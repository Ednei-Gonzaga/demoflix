const urlBack = "https://demoflix-api.onrender.com";

export async function carregarPupulares(tipo, inicio, fim) {
  const url = tipo === "filme"
    ? urlBack + `/tmdb/populares/movie`
    : urlBack + `/tmdb/populares/tv`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results.slice(inicio, fim);
}


export async function carregarFilmeSeries(tipo, categoria, pagina) {

  const url = tipo == "filme" ?
    urlBack + `/tmdb/discover/movie/${categoria}/${pagina}`
    : urlBack + `/tmdb/discover/tv/${categoria}/${pagina}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results.slice(0, 12);
}

export async function buscarDetalhesMidia(id, tipo) {
  const converterTipo = tipo == "filme" ? "movie" : "tv";

  const [detalhes, elenco, videos] = await Promise.all([
    fetch(urlBack + `/tmdb/detalhes/${converterTipo}/${id}`).then(res => res.json()),
    fetch(urlBack + `/tmdb/elenco/${converterTipo}/${id}`).then(res => res.json()),
    fetch(urlBack + `/tmdb/trailer/${converterTipo}/${id}`).then(res => res.json())
  ]);
  return { detalhes, elenco, videos };
}

export async function pesquisaFilmeSerie(tipo, nomeBusacado, pagina) {
  const url = tipo == "filme"
    ? urlBack + `/tmdb/pesquisa/movie/${nomeBusacado}/${pagina}`
    : urlBack + `/tmdb/pesquisa/tv/${nomeBusacado}/${pagina}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}