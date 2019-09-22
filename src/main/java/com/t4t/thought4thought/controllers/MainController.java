package com.t4t.thought4thought.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @RequestMapping(value = "/api/articles", method= RequestMethod.GET)
    public ObjectNode getArticles() {
        System.out.println("-----HERE-----");
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode objectNode = objectMapper.createObjectNode();
        ArrayNode articlesArray = objectMapper.createArrayNode();
        articlesArray.add("Article 1");
        articlesArray.add("Article 2");
        articlesArray.add("Article 3");
        objectNode.put("articles", articlesArray);
        return objectNode;
    }
}
