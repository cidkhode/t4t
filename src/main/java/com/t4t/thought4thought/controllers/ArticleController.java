package com.t4t.thought4thought.controllers;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.entities.Article;
import com.t4t.thought4thought.repositories.ArticleRepository;
import com.t4t.thought4thought.services.ArticleService;
import com.t4t.thought4thought.services.AwsS3Service;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/article/")
public class ArticleController {
    private AwsS3Service amazonClient;
    
    @Autowired
    private ArticleService articleService;
    
    @Autowired
    private ArticleRepository articleRepository;

    /* get article */
    @GetMapping(path = "/get-article")
    public Article getArticle(@RequestBody Article article) {
        return articleService.getUserArticleByArticleID(article.getArticleID());
    }
    
    /* creating article */
    @PostMapping(path = "/store-article")
    public Thought4ThoughtResponseObject uploadArticle(@RequestBody Article article){
        return this.articleService.createArticle(article);
    }

    /* modifying article */
    @PostMapping(path = "/save-article")
    public Thought4ThoughtResponseObject updateArticle(@RequestBody ObjectNode articleKey, int articleID){
        return this.articleService.saveArticleUpdates(articleKey, articleID);
    }

    /* publish article */
    @PostMapping(path = "/publish-article")
    public Thought4ThoughtResponseObject publishArticle(@RequestBody ObjectNode article){
        LocalDateTime date = LocalDateTime.now();
        articleRepository.setArticleIsPublishedByArticleID(true, date, article.get("articleID").asInt());
        return this.articleService.publishArticleToMain(article);
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