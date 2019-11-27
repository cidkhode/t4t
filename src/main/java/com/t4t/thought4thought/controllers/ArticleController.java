package com.t4t.thought4thought.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.entities.Article;
import com.t4t.thought4thought.repositories.ArticleRepository;
import com.t4t.thought4thought.services.ArticleService;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/article/")
public class ArticleController {    
    @Autowired
    private ArticleService articleService;
    
    @Autowired
    private ArticleRepository articleRepository;

    /* get article */
    @GetMapping(path = "/get-article")
    public Article getArticle(@RequestBody Article article) {
        return articleService.getUserArticleByArticleID(article.getArticleID());
    }

    @GetMapping(path = "/get-user-articles")
    public List<Article> getArticlesByUser(@RequestBody ObjectNode objectNode) {
        String userEmail = objectNode.get("userEmail").asText();
        return articleRepository.findAllByUserEmail(userEmail);
    }

    /* creating article */
    @PostMapping(path = "/store-article")
    public Thought4ThoughtResponseObject uploadArticle(@RequestBody ObjectNode objectNode,
                                                       HttpServletRequest request,
                                                       HttpSession session){
        String articleText = objectNode.get("content").asText();
        String userEmail = (String) session.getAttribute("userEmail");
        return this.articleService.createArticle(articleText, userEmail);
    }

    /* modifying article */
    @PostMapping(path = "/save-article")
    public Thought4ThoughtResponseObject updateArticle(@RequestBody ObjectNode objectNode){
        String articleKey = objectNode.get("articleKey").asText();
        int articleID = Integer.parseInt(objectNode.get("articleId").asText());
        String articleText = objectNode.get("content").asText();
        return this.articleService.saveArticleUpdates(articleKey, articleID, articleText);
    }

    /* publish article */
    @PostMapping(path = "/publish-article")
    public Thought4ThoughtResponseObject publishArticle(@RequestBody ObjectNode objectNode){
        int articleID = Integer.parseInt(objectNode.get("articleId").asText());
        return this.articleService.publishArticleToMain(articleID);
    }
    
    /* changing title */
    @PostMapping(path = "/change-title")
    public Thought4ThoughtResponseObject changeArticleTitle(@RequestBody Article article){
        return this.articleService.modifyArticleTitle(article);
    }

    /* changing description */
    @PostMapping(path = "/change-description")
    public Thought4ThoughtResponseObject changeArticleDescription(@RequestBody Article article){
        return this.articleService.modifyArticleDescription(article);
    }

    /* numViews count */
    @PostMapping(path = "/count-num-views")
    public Thought4ThoughtResponseObject countNumViews(@RequestBody Article article){
        return this.articleService.countNumArticleViews(article);
    }

    /* numLikes count */
    @PostMapping(path = "/count-num-likes")
    public Thought4ThoughtResponseObject countNumLikes(@RequestBody Article article){
        return this.articleService.countNumArticleLikes(article);
    }
    
}