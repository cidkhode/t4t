package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import com.t4t.thought4thought.repositories.UserRepository;
import org.springframework.stereotype.Service;
import com.t4t.thought4thought.services.HashPassword;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public boolean validUser(String email, String password){
        HashPassword hashPassword = new HashPassword();
        User user = userRepository.findByEmailAndPassword(email, hashPassword.encryptPassword(password,"derr1k"));
        return user != null;
    }

    public boolean registerNewUser(User user) {
        boolean saved = false;
        HashPassword hashPassword = new HashPassword();
        if (!userRepository.existsByEmail(user.getEmail())) {
            user.setPassword(hashPassword.encryptPassword(user.getPassword(),"derr1k"));
            userRepository.save(user);
            saved = true;
        }
        return saved;
    }

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }
}
