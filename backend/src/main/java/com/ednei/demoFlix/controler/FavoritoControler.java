package com.ednei.demoFlix.controler;

import com.ednei.demoFlix.DTO.DeleteFavoritoDTO;
import com.ednei.demoFlix.DTO.FavoritoDTO;
import com.ednei.demoFlix.model.Favoritos;
import com.ednei.demoFlix.service.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/favorito")
public class FavoritoControler {
    @Autowired
    FavoritoService service;

    @GetMapping("/{idUsuario}")
    public ResponseEntity<?> buscaFavoritos(@PathVariable Long idUsuario){

        
    try{
             List<FavoritoDTO> favoritos =  service.buscarFavoritos(idUsuario);
             return new ResponseEntity<>(favoritos, HttpStatus.OK);


         }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("situacao", false));
         }
    }

    @PostMapping("/save")
    public ResponseEntity<?> salvarFavorito(@RequestBody FavoritoDTO favoritoDTO){
        try{
            service.salvarFavorito(favoritoDTO);
            return  ResponseEntity.status(HttpStatus.CREATED).body(Map.of("situacao", true));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("situacao", false));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deletarFavorito(@RequestBody DeleteFavoritoDTO favorito){
        try{
            service.deletarFavorito(favorito.tipo(), favorito.idTmdb(), favorito.idUsuario());
            return  ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of("situacao", true));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("situacao", false));
        }

    }

}
