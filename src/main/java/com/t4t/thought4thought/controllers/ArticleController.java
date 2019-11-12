package com.t4t.thought4thought.controllers;

import com.t4t.thought4thought.entities.Article;
import com.t4t.thought4thought.services.ArticleService;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @PostMapping(path = "/api/store-article")
    public Thought4ThoughtResponseObject uploadArticle(@RequestBody Article article){
        return this.articleService.storeArticle(article);
    }
}