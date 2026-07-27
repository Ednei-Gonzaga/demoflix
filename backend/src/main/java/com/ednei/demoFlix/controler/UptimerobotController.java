package com.ednei.demoFlix.controler;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UptimerobotController {

    //Somente para garantir o Funcionamento do Server
    @GetMapping("uptimerobot/bot/monitoramento")
    public ResponseEntity botMonitoramento() {
        return ResponseEntity.ok().build();
    }
}
