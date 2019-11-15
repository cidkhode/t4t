package com.t4t.thought4thought.entities;

import javax.persistence.*;

@Entity
public class Article {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer articleID;

    public Integer getArticleID() {
        return articleID;
    }

    public void setArticleID(Integer articleID) {
        this.articleID = articleID;
    }
    private String userEmail;

    public String getUserEmail(){
        return userEmail;
    }

    public void setUserEmail(String userEmail){
        this.userEmail = userEmail;
    }

    private String title;

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    private String description;

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    private Integer numViews;

    public Integer getNumViews(){
        return numViews;
    }

    public void setNumViews(Integer numViews){
        this.numViews = numViews;
    }

    private Integer numLikes;

    public Integer getNumLikes(){
        return numLikes;
    }

    public void setNumLikes(Integer numLikes){
        this.numLikes = numLikes;
    }

    private String dateCreated;

    public String getDateCreated(){
        return dateCreated;
    }

    public void setDateCreated(String dateCreated){
        this.dateCreated = dateCreated;
    }

    private String datePublished;

    public String getDatePublished(){
        return datePublished;
    }

    public void setDatePublished(String datePublished){
        this.datePublished = datePublished;
    }

    private String dateModified;

    public String getDateModified(){
        return dateModified;
    }

    public void setDateModified(String dateModified){
        this.dateModified = dateModified;
    }

    private String articleText; //entire body of the article

    public String getArticleText(){
        return articleText;
    }

    public void setArticleText(String articleText){
        this.articleText = articleText;
    }

    private String thumbnailImageURL;

    public String getThumbnailImageURL(){
        return thumbnailImageURL;
    }

    public void setThumbnailImageURL(String thumbnailImageURL){
        this.thumbnailImageURL = thumbnailImageURL;
    }

    private String responseArticleID;

    public String getResponseArticleID(){
        return responseArticleID;
    }

    public void setResponseArticleID(String responseArticleID){
        this.responseArticleID = responseArticleID;
    }

}