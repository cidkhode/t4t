package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.User;
import com.t4t.thought4thought.utils.PasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import com.t4t.thought4thought.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public boolean validUser(String email, String password){
        PasswordEncryptor passwordEncryptor = new PasswordEncryptor();
        User user = userRepository.findByEmail(email);
        return user != null && user
                .getPassword()
                .equals(passwordEncryptor.encryptPassword(password, user.getPasswordSalt()));
    }

    public boolean registerNewUser(User user) {
        boolean saved = false;
        PasswordEncryptor passwordEncryptor = new PasswordEncryptor();
        String salt = passwordEncryptor.generateRandomSalt();
        user.setPasswordSalt(salt);

        if (!userRepository.existsByEmail(user.getEmail())) {
            user.setPassword(passwordEncryptor.encryptPassword(user.getPassword(), user.getPasswordSalt()));
            userRepository.save(user);
            saved = true;
        }
        return saved;
    }

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }
}
