package com.ednei.demoFlix.controler;

import com.ednei.demoFlix.DTO.DeleteFavoritoDTO;
import com.ednei.demoFlix.DTO.FavoritoDTO;
import com.ednei.demoFlix.service.FavoritoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/favorito")
public class FavoritoControler {
    @Autowired
    FavoritoService service;

    @GetMapping("/{idUsuario}")
    public ResponseEntity<Page<FavoritoDTO>> buscaFavoritos(@PathVariable Long idUsuario, Pageable pageable){
             var favoritos =  service.buscarFavoritos(idUsuario,pageable);
             return ResponseEntity.ok(favoritos);

    }

    @PostMapping("/save")
    public ResponseEntity<?> salvarFavorito(@RequestBody @Valid FavoritoDTO favoritoDTO){
            service.salvarFavorito(favoritoDTO);
            return  ResponseEntity.status(HttpStatus.CREATED).body(Map.of("situacao", true));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deletarFavorito(@RequestBody DeleteFavoritoDTO favorito){
            service.deletarFavorito(favorito.tipo(), favorito.idTmdb(), favorito.idUsuario());
            return  ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of("situacao", true));
    }

}
