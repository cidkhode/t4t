package com.t4t.thought4thought.repositories;

import org.springframework.data.repository.CrudRepository;
import com.t4t.thought4thought.entities.User;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByEmailAndPassword(String email, String pass);
}