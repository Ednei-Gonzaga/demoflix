package com.ednei.demoFlix.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Objects;

@Service
public class ConsumoApiService {
    @Value("${API_KEY_TMDB}")
    private String apiKey;




    public String buscarPopulares(String tipo){
           String url;
        try{
            if(Objects.equals(tipo, "movie")){

               url = "https://api.themoviedb.org/3/movie/upcoming?api_key="+ apiKey + "&language=pt-BR&page=1";

                return buscarDadosTmdb(url);

            }else if(Objects.equals(tipo, "tv")){

                url = "https://api.themoviedb.org/3/tv/popular?api_key="+ apiKey + "&language=pt-BR&page=1";

                return buscarDadosTmdb(url);

            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }

        return tipo;
    }


    public String buscarFilmesSeries(String tipo, String genero, Integer pagina){
        String url;
        try{
            {
                url = "https://api.themoviedb.org/3/discover/"+ tipo  +"?api_key=" + apiKey + "&language=pt-BR&with_genres=" +  genero + "&page=" + pagina;
                return buscarDadosTmdb(url);
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }


    public String detalhesFilmesSeries(String tipo, Long id){
        String url;
        try{
                url = "https://api.themoviedb.org/3/"+tipo+ "/"+ id + "?api_key=" + apiKey + "&language=pt-BR";

                return buscarDadosTmdb(url);

        }catch (Exception e){
            throw new RuntimeException(e);
        }


    }


    public String buscarTrailer(String tipo, Long id){
        String url;
        try{

            url = "https://api.themoviedb.org/3/"+tipo+ "/"+ id + "/videos?api_key=" + apiKey ;

            return buscarDadosTmdb(url);

        }catch (Exception e){
            throw new RuntimeException(e);
        }


    }

    public String buscarElenco(String tipo, Long id){
        String url;
        try{
            url = "https://api.themoviedb.org/3/" + tipo+ "/" + id + "/credits?api_key=" + apiKey ;
            return buscarDadosTmdb(url);

        }catch (Exception e){
            throw new RuntimeException(e);
        }


    }

    public String pesquisaFilmeSerie(String tipo, String nomeBuscado, Integer pagina){
        String url;
        try{
            url = "https://api.themoviedb.org/3/search/"+ tipo +"?api_key=" + apiKey + "&query=" + nomeBuscado.replace(" ", "%20") + "&language=pt-BR&page=" + pagina;
            return buscarDadosTmdb(url);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    private String buscarDadosTmdb(String url){
        try {
            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            return response.body();

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
