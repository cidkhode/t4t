package com.t4t.thought4thought.entities;

import javax.persistence.*;

@Entity
public class Topic {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String topicName;
    private int numOfHearts;
    private String topicPictureURL;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTopic() {
        return topicName;
    }

    public void setTopic(String topic) {
        this.topicName = topic;
    }

    public int getNumOfHearts() {
        return numOfHearts;
    }

    public void setNumOfHearts(int num_of_hearts) {
        this.numOfHearts = num_of_hearts;
    }

    public String getTopicPictureURL(){ return topicPictureURL; }

    public void setTopicPictureURL(String url) { this.topicPictureURL = url; }
}
