package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.Topic;
import com.t4t.thought4thought.repositories.TopicRepository;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicService {
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private UserService userService;

    public int getNumOfHearts(int topicId) { return topicRepository.findById(topicId).getNumOfHearts(); }

    public Iterable<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public Thought4ThoughtResponseObject addTopicToUser(String topicId, String userEmail){
        Thought4ThoughtResponseObject responseObject = userService.saveTopic(userEmail, topicId);

        if (responseObject.getStatus() == 0){
            int topicIdNum = Integer.parseInt(topicId);
            Topic topic = topicRepository.findById(topicIdNum);
            topic.setNumOfHearts(topic.getNumOfHearts() + 1);
            topicRepository.updateHeartsOfTopic(topic.getNumOfHearts(), topicIdNum);
        }

        return responseObject;

    }

    public Thought4ThoughtResponseObject deleteTopicFromUser(String topicId, String userEmail){
        Thought4ThoughtResponseObject responseObject = userService.deleteTopic(userEmail, topicId);

        if (responseObject.getStatus() == 0) {
            int topicIdNum = Integer.parseInt(topicId);
            Topic topic = topicRepository.findById(topicIdNum);

            if (topic.getNumOfHearts() > 0) {
                topic.setNumOfHearts(topic.getNumOfHearts() - 1);
            }

            topicRepository.updateHeartsOfTopic(topic.getNumOfHearts(), topicIdNum);
        }

        return responseObject;
    }
}
