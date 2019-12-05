package com.t4t.thought4thought.controllers;

import com.t4t.thought4thought.entities.User;
import com.t4t.thought4thought.services.UserService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import static com.t4t.thought4thought.utils.Constants.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path="/api/get-user-session")
    public Thought4ThoughtResponseObject getUserSession(@RequestBody ObjectNode objectNode,
                                                        HttpServletRequest request,
                                                        HttpSession session) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_ERROR_CODE, "Invalid session");
        String userEmail = (String) session.getAttribute("userEmail");
        if (userEmail != null) {
            if (session.getAttribute("userEmail").equals(objectNode.get("userEmail").asText())) {
                thought4ThoughtResponseObject.setStatus(T4T_SUCCESS_CODE);
                thought4ThoughtResponseObject.setInfo("Session ongoing");
            } else {
                thought4ThoughtResponseObject.setStatus(T4T_INVALID_CODE);
                thought4ThoughtResponseObject.setInfo("Session does not exist for user with email: " + userEmail);
            }
        }
        return thought4ThoughtResponseObject;
    }

    @PostMapping(path = "/api/login")
    public Thought4ThoughtResponseObject validUser(@RequestBody ObjectNode user, HttpServletRequest request, HttpSession session) {
        String email = user.get("email").asText();
        String password = user.get("password").asText();
        session.invalidate();
        HttpSession newSession = request.getSession();
        newSession.setAttribute("userEmail", email);
        boolean exists = userService.validUser(email, password);
        return new Thought4ThoughtResponseObject().createResponse(exists ? T4T_SUCCESS_CODE : T4T_INVALID_CODE, exists ? "Success!" : "Invalid Credentials!");
    }

    @GetMapping(path="/api/user")
    public ObjectNode getUser(@RequestParam(name="userEmail") String userEmail) {
        return userService.getUserByEmail(userEmail);
    }

    @PostMapping(path = "/api/register")
    public Thought4ThoughtResponseObject registerUser(@RequestBody User user) {
        return userService.registerNewUser(user);
    }

    // Edit the about me section (later pov and interest)
    @PostMapping(path = "/api/update-profile")
    public Thought4ThoughtResponseObject updateUserProfile(@RequestBody ObjectNode objectNode,
                                                           HttpServletRequest request,
                                                           HttpSession session) {
        String keyToUpdate = objectNode.get("keyToUpdate").asText();
        String changesInProfile = objectNode.get("changesInProfile").asText();
        String userEmail = (String) session.getAttribute("userEmail");
        return this.userService.saveProfileUpdates(keyToUpdate, changesInProfile, userEmail);
    }

    @PostMapping(path = "/api/delete-from-profile")
    public Thought4ThoughtResponseObject deleteFromUserProfile(@RequestBody ObjectNode objectNode,
                                                               HttpServletRequest request,
                                                               HttpSession session) {
        String keyToUpdate = objectNode.get("keyToUpdate").asText();
        String valueToDelete = objectNode.get("valueToDelete").asText();
        String userEmail = (String) session.getAttribute("userEmail");
        return this.userService.deleteValueFromProfile(keyToUpdate, valueToDelete, userEmail);
    }
}
