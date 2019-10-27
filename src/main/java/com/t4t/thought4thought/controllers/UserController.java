package com.t4t.thought4thought.controllers;

import com.t4t.thought4thought.entities.User;
import com.t4t.thought4thought.services.UserService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/api/login")
    public Thought4ThoughtResponseObject validUser(@RequestBody ObjectNode user) {
        String email = user.get("email").asText();
        String password = user.get("password").asText();
        boolean exists = userService.validUser(email, password);
        return new Thought4ThoughtResponseObject().createResponse(exists ? 0 : 1, exists ? "Success!" : "Invalid Credentials!");
    }

    @PostMapping(path = "/api/register")
    public Thought4ThoughtResponseObject registerUser(@RequestBody User user, @RequestPart(value = "profileImage") MultipartFile profileImage) {
        return userService.registerNewUser(user, profileImage);
    }
}
