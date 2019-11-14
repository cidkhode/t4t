package com.t4t.thought4thought.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.t4t.thought4thought.entities.Article;
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

    /* get article */
    @GetMapping(path = "/get-article")
    public Article getArticle(@RequestBody Article article) {
        return articleService.getUserArticleByArticleID(article);
    }
    
    /* creating article */
    @PostMapping(path = "/store-article")
    public Thought4ThoughtResponseObject uploadArticle(@RequestBody Article article){
        return this.articleService.createArticle(article);
    }

    /* modifying article */
    @PostMapping(path = "/save-article")
    public Thought4ThoughtResponseObject saveArticle(@RequestBody Article article){
        return this.articleService.modifyArticle(article);
    }

    /* publish article */
    @PostMapping(path = "/publish-article")
    public Thought4ThoughtResponseObject publishArticle(@RequestBody Article article){
        // boolean function isPublished if its ready for main page
        boolean isPublished = articleService.publishedArticle(article.getArticleID());
        // receive article ID to publish 
        if(!isPublished){
            // use findBy function to update column ID to edit boolean
        }
        return this.articleService.publishArticleToMain(article);
    }
    
    /* delete article */
    @DeleteMapping(path = "/delete-article")
    public Thought4ThoughtResponseObject deleteArticleFromDB(@RequestBody Article article) {
        return this.articleService.deleteArticle(article);
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

    /* upload thumbnail image in S3 bucket */
    @PostMapping(path = "/uploadThumbnail")
    public Thought4ThoughtResponseObject uploadThumbnailFile(@RequestPart(value = "file") MultipartFile file, HttpServletRequest request, HttpSession session) {
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        return this.amazonClient.uploadArticleThumbnail(file, extension, (String) session.getAttribute("userEmail"));
    }

    /* delete thumbnail image in S3 bucket */
    @DeleteMapping("/deleteThumbnail")
    public String deleteThumbnailFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClient.deleteThumbnailFromS3Bucket(fileUrl);
    }

    /* numViews count */
    @PostMapping(path = "/count-num-views")
    public Thought4ThoughtResponseObject countNumViews(@RequestBody Article article){
        // increment counter for article ID being received and save that counter
        return this.articleService.countNumArticleViews(article);
    }

    /* numLikes count */
    @PostMapping(path = "/count-num-likes")
    public Thought4ThoughtResponseObject countNumLikes(@RequestBody Article article){
        // increment counter for article ID being received and save that counter
        return this.articleService.countNumArticleLikes(article);
    }
    
}