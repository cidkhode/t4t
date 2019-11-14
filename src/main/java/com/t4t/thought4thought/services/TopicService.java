package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.Topic;
import com.t4t.thought4thought.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

@Service
public class TopicService {
    @Autowired
    private TopicRepository topicRepository;

    public int getNumOfHearts(int topicId) { return topicRepository.findById(topicId).getNumOfHearts(); }

    public int getNumOfBookmarks(int topicId) { return topicRepository.findById(topicId).getNumOfBookmarks(); }

    public Iterable<Topic> getAllTopics() { return topicRepository.findAll(); };

    public void addTopicToUser(int topicId){
        Topic topic = topicRepository.findById(topicId);
        topic.setNumOfHearts(topic.getNumOfHearts() + 1);
        topicRepository.updateHeartsOfTopic(topic.getNumOfHearts(), topicId);
        //ArryaList<String> topicNames = new ArrayList<String>(Arrays.asList(userProfileToUpdate.getInterests().split(",")));
    }

    public void deleteTopicFromUser(int topicId){
        Topic topic = topicRepository.findById(topicId);
        topic.setNumOfHearts(topic.getNumOfHearts() - 1);
        topicRepository.updateHeartsOfTopic(topic.getNumOfHearts(), topicId);
    }
    public void increaseHearts(int topicId){
        Topic topic = topicRepository.findById(topicId);
        topic.setNumOfHearts(topic.getNumOfHearts() + 1);
    }

    public void decreaseHearts(int topicId){
        Topic topic = topicRepository.findById(topicId);
        topic.setNumOfHearts(topic.getNumOfHearts() - 1);
    }

    public void increaseBookmarks(int topicId){
        Topic topic = topicRepository.findById(topicId);
        topic.setNumOfBookmarks(topic.getNumOfBookmarks() + 1);
    }

    public void decreaseBookmarks(int topicId){
        Topic topic = topicRepository.findById(topicId);
        topic.setNumOfBookmarks(topic.getNumOfBookmarks() - 1);
    }
}
