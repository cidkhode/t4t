package com.t4t.thought4thought.services;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.entities.Article;
import com.t4t.thought4thought.repositories.ArticleRepository;
import com.t4t.thought4thought.repositories.UserRepository;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import static com.t4t.thought4thought.utils.Constants.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ArticleService{

    @Autowired
    ArticleRepository articleRepository;

    /* create initial article */
    public Thought4ThoughtResponseObject createArticle(Article article){
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article created successfully!");
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
        LocalDateTime now = LocalDateTime.now(); 
        if(!articleRepository.existsByArticleID(article.getArticleID())){
            article.setArticleText(article.getArticleText());
            article.setDateCreated(dtf.format(now));
        }
        return thought4ThoughtResponseObject;
    }

    /* modify article */
    public Thought4ThoughtResponseObject modifyArticle(Article article) {
		Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article modified successfully!");
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
        LocalDateTime now = LocalDateTime.now(); 
        if(!articleRepository.existsByArticleID(article.getArticleID())){
            article.setArticleText(article.getArticleText());
            article.setDateModified(dtf.format(now));
        }
        return thought4ThoughtResponseObject;
    }
    
    /* publish final article to main page */
    public Thought4ThoughtResponseObject publishArticleToMain(Article article) {
		Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article published successfully!");
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
        LocalDateTime now = LocalDateTime.now(); 
        if(!articleRepository.existsByArticleID(article.getArticleID())){
            //article.setArticleText(article.getArticleText());
            article.setDatePublished(dtf.format(now));
        }
        return thought4ThoughtResponseObject;
	}

    public boolean publishedArticle(int articleID) {
        if(articleRepository.existsByArticleID(articleID))  //checking for duplicates
            return true;
        else
            return false;
    }

	public Article getUserArticleByArticleID(int articleID) {
		return articleRepository.findByArticleID(articleID);
	}

    /* modify article title */
	public Thought4ThoughtResponseObject modifyArticleTitle(Article article) {
		Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article title modified successfully!");
        article.setTitle(article.getTitle());
        return thought4ThoughtResponseObject;
	}

    /* modify article description */
	public Thought4ThoughtResponseObject modifyArticleDescription(Article article) {
		Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article description modified successfully!");
        article.setDescription(article.getDescription());
        return thought4ThoughtResponseObject;
	}

    /* increment count of article views per click */
	public Thought4ThoughtResponseObject countNumArticleViews(Article article) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article view count.");
        
        int countViews =  article.getNumViews();
        article.setNumViews(++countViews);
        return thought4ThoughtResponseObject;
	}

    /* increment count of article likes per click */
	public Thought4ThoughtResponseObject countNumArticleLikes(Article article) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article likes count.");

        int countLikes = article.getNumLikes();
        article.setNumLikes(++countLikes);
		return thought4ThoughtResponseObject;
    }
    
    public Thought4ThoughtResponseObject uploadArticleThumbnail(MultipartFile file, String extension,
			String attribute) {
        // use uploadThumbnailImageURL method from AwsS3BucketController
		return null;
	}

	public Thought4ThoughtResponseObject saveArticleUpdates(ObjectNode articleKey, int articleID) {
		Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(-1,
                        "Couldn't update profile; something went wrong.");
        String articleIDInSession = Integer.toString(articleID);
        if(articleIDInSession != null){
            Article article = ArticleRepository.findByArticleID(articleID);
            switch(keyToUpdate){
                case "articleTitle": {
                    articleRepository.setArticleTitleByID();
                    break;
                }
                case "articleDesccription": {
                    articleRepository.setArticleDescByID();
                    break;
                }
                case "articleText": {
                    articleRepository.setArticleTextByID();
                    break;
                }
                case "articleThumbnail": {
                    articleRepository.setArticleThumbnailByID();
                    break;
                }
            }
        }
	}
  
}