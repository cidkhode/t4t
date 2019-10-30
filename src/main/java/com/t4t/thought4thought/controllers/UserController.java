package com.t4t.thought4thought.controllers;

import com.t4t.thought4thought.entities.User;
import com.t4t.thought4thought.services.UserService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/api/login")
    public Thought4ThoughtResponseObject validUser(@RequestBody ObjectNode user, HttpServletRequest request, HttpSession session) {
        String email = user.get("email").asText();
        String password = user.get("password").asText();
        session.invalidate();
        HttpSession newSession = request.getSession();
        newSession.setAttribute("userEmail", email);
        boolean exists = userService.validUser(email, password);
        return new Thought4ThoughtResponseObject().createResponse(exists ? 0 : 1, exists ? "Success!" : "Invalid Credentials!");
    }

    @GetMapping(path="/api/user")
    public User getUser(@RequestParam(name="userEmail") String userEmail) {
        return userService.getUserByEmail(userEmail);
    }

    @PostMapping(path = "/api/register")
    public Thought4ThoughtResponseObject registerUser(@RequestBody User user) {
        return userService.registerNewUser(user);
    }


    // Edit the about me section (later pov and interest)
    @PostMapping(path ="/api/update")
    public Thought4ThoughtResponseObject updateAboutMe(@RequestBody ObjectNode newAboutMe, HttpServletRequest request, HttpSession session) {
        String userEmail = (String) session.getAttribute("userEmail");
        return this.userService.saveAboutMe(newAboutMe.get("about").asText(), userEmail);
    }


}
