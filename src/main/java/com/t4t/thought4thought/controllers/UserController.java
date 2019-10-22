package com.t4t.thought4thought.controllers;

import com.t4t.thought4thought.services.UserService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path="/api/login")
    public Thought4ThoughtResponseObject validUser(@RequestBody ObjectNode user) {
        String email = user.get("email").asText();
        String password = user.get("password").asText();
        boolean exists = userService.validUser(email, password);
        return new Thought4ThoughtResponseObject().createResponse(0, exists ? "Success!" : "Invalid Credentials");
    }
}
