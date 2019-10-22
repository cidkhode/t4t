package com.t4t.thought4thought.controllers;

import com.t4t.thought4thought.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.entities.User;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@RestController
public class MainController {
    // TODO: update this endpoint for retrieving articles - leaving as is for now for example purposes
    @RequestMapping(value = "/api/articles", method= RequestMethod.GET)
    public ObjectNode getArticles() {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode objectNode = objectMapper.createObjectNode();
        ArrayNode articlesArray = objectMapper.createArrayNode();
        articlesArray.add("Article 1");
        articlesArray.add("Article 2");
        articlesArray.add("Article 3");
        objectNode.put("articles", articlesArray);
        return objectNode;
    }

    @Autowired
    private UserService userService;

    // TODO: update this endpoint to accept creation of accounts - leaving as is for now for example purposes
    @RequestMapping(path="/api/add", method= RequestMethod.GET)
    public String addNewUser (@RequestParam String name, @RequestParam String email) {
        User n = new User();
        n.setName(name);
        n.setEmail(email);
        userService.save(n);
        return "Saved user";
    }

    // TODO: remove this endpoint - leaving it as is for now for example purposes
    @GetMapping(path="/api/all")
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping(path="/api/login")
    public String validUser(@RequestBody String jsonStr) throws JSONException {
        JSONObject object = new JSONObject(jsonStr);

       if (userService.validUser(object.getString("email"), object.getString("password")))
           return "Login Succesful";
        else
            return "Invalid email or password";

    }
}
