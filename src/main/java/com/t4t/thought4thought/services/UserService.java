package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.User;
import com.t4t.thought4thought.utils.PasswordEncryptor;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import com.t4t.thought4thought.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static com.t4t.thought4thought.utils.Constants.*;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AwsS3Service awsS3Service;

    public boolean validUser(String email, String password) {
        PasswordEncryptor passwordEncryptor = new PasswordEncryptor();
        User user = userRepository.findByEmail(email);
        return user != null && user
                .getPassword()
                .equals(passwordEncryptor.encryptPassword(password, user.getPasswordSalt()));
    }

    public User getUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail);
    }

    public Thought4ThoughtResponseObject registerNewUser(User user) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Saved user successfully!");
        PasswordEncryptor passwordEncryptor = new PasswordEncryptor();
        String salt = passwordEncryptor.generateRandomSalt();
        user.setPasswordSalt(salt);

        if (!userRepository.existsByEmail(user.getEmail())) {
            try {
                user.setPassword(passwordEncryptor.encryptPassword(user.getPassword(), user.getPasswordSalt()));
                userRepository.save(user);
            } catch (Exception e) {
                thought4ThoughtResponseObject.setStatus(T4T_ERROR_CODE);
                thought4ThoughtResponseObject.setInfo("Something went wrong...");
                e.printStackTrace();
            }
        } else {
            thought4ThoughtResponseObject.setStatus(T4T_INVALID_CODE);
            thought4ThoughtResponseObject.setInfo("User exists already!");
        }
        return thought4ThoughtResponseObject;
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
