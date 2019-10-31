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
    @Query("update User user set user.aboutMe= ?1 where user.email = ?2")
    int setUserAboutMeByEmail(String aboutMe, String userEmail);

    //Example Query Works in MYSQL
    //UPDATE user SET interests=CONCAT(interests,',','topgolf') where email='crkhode@yahoo.com'
    @Modifying
    @Transactional
    @Query("update User user set user.interests=concat(user.interests,', ','?1') where user.email =?2")
    int addUserInterestsByEmail(String interests, String userEmail);

    @Modifying
    @Transactional
    @Query("update User user set user.viewPoints=concat(user.viewPoints,', ','?1') where user.email =?2")
    int addUserViewPointsByEmail(String viewpoints, String userEmail);

   /* @Modifying
    @Transactional
    @Query("update User user delete user.")*/


//    @Modifying
//    @Query("update User u set u.profilePictureURL = ?1 where u.email = ?2")
//    void setUserInfoById(String firstname, String lastname, Integer userId);
}