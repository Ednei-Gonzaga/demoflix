package com.ednei.demoFlix.controler;

import com.ednei.demoFlix.service.ConsumoApiService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/tmdb")
public class ApiControler {
    @Autowired
    private ConsumoApiService service;


    @GetMapping("/populares/{tipo}")
    public ResponseEntity<?> buscarPopulares(@PathVariable String tipo){
        try{
            String populares = service.buscarPopulares(tipo);
            return  ResponseEntity.status(HttpStatus.OK).body(populares);
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("ok", false));
        }
    }

    @GetMapping("/discover/{tipo}/{genero}/{pagina}")
    public  ResponseEntity<?> buscarFilmeSerie(@PathVariable String tipo, @PathVariable String genero , @PathVariable Integer pagina) {
        try{
            String result = service.buscarFilmesSeries(tipo, genero, pagina);
            System.out.println(result+ "ola");
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("ok", false));
        }

    }

    @GetMapping("/detalhes/{tipo}/{idTmdb}")
    public ResponseEntity<?> detalhesFilmeSerie(@PathVariable String tipo, @PathVariable Long idTmdb) {
        try{
            String result = service.detalhesFilmesSeries(tipo, idTmdb);
            System.out.println(result);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("ok", false));
        }
    }

    @GetMapping("/trailer/{tipo}/{idTmdb}")
    public ResponseEntity<?> buscaTrailer(@PathVariable String tipo, @PathVariable Long idTmdb){
        try{
            String result = service.buscarTrailer(tipo, idTmdb);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("ok", false));
        }
    }

    @GetMapping("/elenco/{tipo}/{idTmdb}")
    public ResponseEntity<?> buscaElenco(@PathVariable String tipo, @PathVariable Long idTmdb){
        try{
            String result = service.buscarElenco(tipo, idTmdb);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("ok", false));
        }
    }

    @GetMapping("/pesquisa/{tipo}/{nomeBuscado}/{pagina}")
    public ResponseEntity<?> pesquisarFilmeSerie(@PathVariable String tipo, @PathVariable String nomeBuscado, @PathVariable Integer pagina){
        try{            String result = service.pesquisaFilmeSerie(tipo, nomeBuscado, pagina);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("ok", false));
        }
    }
}
