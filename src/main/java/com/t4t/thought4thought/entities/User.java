package com.t4t.thought4thought.entities;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String passwordSalt;

    private String userType;

    private String interests;

    private String fieldsOfStudy;

    private String viewPoints;

    private String profilePictureURL;

    private String aboutMe;

    private String topicNames;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getPasswordSalt(){
        return passwordSalt;
    }

    public void setPasswordSalt(String passwordSalt){
        this.passwordSalt = passwordSalt;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getFieldsOfStudy() {
        return fieldsOfStudy;
    }

    public void setFieldsOfStudy(String fieldsOfStudy) {
        this.fieldsOfStudy = fieldsOfStudy;
    }

    public String getViewPoints() {
        return viewPoints;
    }

    public void setViewPoints(String viewPoints) {
        this.viewPoints = viewPoints;
    }

    public String getProfilePictureURL() {
        return profilePictureURL;
    }

    public void setProfilePictureURL(String profilePictureURL) { this.profilePictureURL = profilePictureURL; }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public String getTopicNames() {
        return topicNames;
    }

    public void setTopicNames(String topicNames) {
        this.topicNames = topicNames;
    }
}