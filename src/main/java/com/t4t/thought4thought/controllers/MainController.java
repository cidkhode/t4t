package com.t4t.thought4thought.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class MainController {
    @GetMapping(value={"", "/", "/account", "/dashboard", "/write"})
    public String mainPage() {
        return "index.html";
    }
}
