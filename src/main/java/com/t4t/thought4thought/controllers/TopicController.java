package com.t4t.thought4thought.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.entities.Topic;
import com.t4t.thought4thought.services.TopicService;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class TopicController {
    @Autowired
    private TopicService topicService;

    @GetMapping(path="/api/topic-hearts")
    public int getNumOfHearts(@RequestParam int topicId){ return topicService.getNumOfHearts(topicId); }

    @GetMapping(path="/api/topic-bookmarks")
    public int getNumOfBookmarks(@RequestParam int topicId){ return topicService.getNumOfBookmarks(topicId); }

    @GetMapping(path="/api/all-topics")
    public Iterable<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }

    @PostMapping(path="/api/increase-hearts-of-topic")
    //make it response object
    public void addTopicToUser (@RequestBody ObjectNode objectNode,
                                                         HttpServletRequest request,
                                                         HttpSession session,
                                                         @RequestParam int topicID){
        topicService.increaseHearts(topicID);
       // topicService.
    }

    @PostMapping(path="/api/decrease-hearts-of-topic")
    public void deleteTopicFromUser (@RequestParam int topicID){
        topicService.decreaseHearts(topicID);
    }

    @PostMapping(path="/api/add-bookmark")
    public void addBookmarkToUser (@RequestParam int topicID){
        topicService.increaseBookmarks(topicID);
    }

    @PostMapping(path="/api/delete-bookmark")
    public void deleteBookmarkFromUser (@RequestParam int topicID){
        topicService.decreaseBookmarks(topicID);
    }

}
