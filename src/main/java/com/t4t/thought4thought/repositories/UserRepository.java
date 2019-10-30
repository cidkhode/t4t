package com.t4t.thought4thought.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.t4t.thought4thought.entities.User;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByEmail(String email);

    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query("update User user set user.profilePictureURL = ?1 where user.email = ?2")
    int setUserProfilePictureURLByEmail(String profilePictureURL, String userEmail);

    @Modifying
    @Transactional
    //@Query("update ebdb.user u set about_me=?1 where email=?2")
    // ^^^ This works in MySQL Workbench Query
    @Query("update User user set user.aboutMe= ?1 where user.email = ?2")
    int setUserAboutMeByEmail(String aboutMe, String userEmail);


//    @Modifying
//    @Query("update User u set u.profilePictureURL = ?1 where u.email = ?2")
//    void setUserInfoById(String firstname, String lastname, Integer userId);
}