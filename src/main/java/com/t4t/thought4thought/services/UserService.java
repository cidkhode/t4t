package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import com.t4t.thought4thought.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public boolean validUser(String email, String password){
        User user = userRepository.findByEmailAndPassword(email, password);
        return user != null;
    }

    public boolean registerNewUser(User user) {
        boolean saved = false;
        if (!userRepository.existsByEmail(user.getEmail())) {
            userRepository.save(user);
            saved = true;
        }
        return saved;
    }

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }
}
