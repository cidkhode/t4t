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

    /* publish article */
    @PostMapping(path = "/store-article")
    public Thought4ThoughtResponseObject uploadArticle(@RequestBody Article article){
        // create article here?
        // modify article here?

        return this.articleService.publishArticle(article);
    }

    /* delete article */
    @DeleteMapping(path = "/delete-article")
    public Thought4ThoughtResponseObject deleteArticleFromDB(@RequestBody Article article) {
        return this.articleService.deleteArticle(article);
    }

    /* upload thumbnail image in S3 bucket */
    @PostMapping(path = "/uploadThumbnail")
    public Thought4ThoughtResponseObject uploadFile(@RequestPart(value = "file") MultipartFile file, HttpServletRequest request, HttpSession session) {
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        return this.amazonClient.saveUserProfilePicture(file,
                extension,
                (String) session.getAttribute("userEmail"));
    }

    /* delete thumbnail image in S3 bucket */
    @DeleteMapping("/deleteThumbnail")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
    }

}