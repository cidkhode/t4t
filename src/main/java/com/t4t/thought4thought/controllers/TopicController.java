package com.t4t.thought4thought.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.entities.Topic;
import com.t4t.thought4thought.services.TopicService;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class TopicController {
    @Autowired
    private TopicService topicService;

    @GetMapping(path="/api/all-topics")
    public Iterable<Topic> getAllTopicsByNumOfHearts() {
        return topicService.getAllTopicsByNumOfHearts();
    }

    @PostMapping(path="/api/add-topic-to-user")
    public Thought4ThoughtResponseObject addTopicToUser (@RequestBody ObjectNode objectNode,
                                                         HttpServletRequest request,
                                                         HttpSession session){
        String topicID = objectNode.get("topicID").asText();
        String userEmail = objectNode.get("userEmail").asText();
        return this.topicService.addTopicToUser(topicID, userEmail);
    }

    @PostMapping(path="/api/delete-topic-from-user")
    public Thought4ThoughtResponseObject deleteTopicFromUser (@RequestBody ObjectNode objectNode,
                                                              HttpServletRequest request,
                                                              HttpSession session){
        String topicID = objectNode.get("topicID").asText();
        String userEmail = objectNode.get("userEmail").asText();
        return this.topicService.deleteTopicFromUser(topicID, userEmail);
    }

}
