package com.t4t.thought4thought.controllers;

import com.t4t.thought4thought.entities.User;
import com.t4t.thought4thought.services.UserService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/api/login")
    public Thought4ThoughtResponseObject validUser(@RequestBody ObjectNode user) {
        String email = user.get("email").asText();
        String password = user.get("password").asText();
        boolean exists = userService.validUser(email, password);
        return new Thought4ThoughtResponseObject().createResponse(exists ? 0 : -1, exists ? "Success!" : "Invalid Credentials");
    }

    @PostMapping(path = "/api/register")
    public Thought4ThoughtResponseObject registerUser(@RequestBody User user) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(0, "Success!");
        try {
            userService.save(user);
        } catch (Exception e) {
            thought4ThoughtResponseObject.setStatus(-1);
            thought4ThoughtResponseObject.setInfo("Something went wrong...");
        }
        return thought4ThoughtResponseObject;
    }
}
