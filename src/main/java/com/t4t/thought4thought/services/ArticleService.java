package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.Article;
import com.t4t.thought4thought.repositories.ArticleRepository;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import static com.t4t.thought4thought.utils.Constants.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            article.setDatePublished(dtf.format(now));
        }
        return thought4ThoughtResponseObject;
	}

    /* delete article */
    public Thought4ThoughtResponseObject deleteArticle(Article article){
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(-1,
                "Couldn't update profile; something went wrong.");

        return thought4ThoughtResponseObject;

    }

    public boolean publishedArticle(int articleID) {
        if(articleRepository.existsByArticleID(articleID))
            return true;
        else
            return false;
    }

	public Article getUserArticleByArticleID(Article article) {
		return articleRepository.findByArticleID(article.getArticleID());
	}

    /* modify article title */
	public Thought4ThoughtResponseObject modifyArticleTitle(Article article) {
		return null;
	}

    /* modify article description */
	public Thought4ThoughtResponseObject modifyArticleDescription(Article article) {
		return null;
	}

    /* increment count of article views per click */
	public Thought4ThoughtResponseObject countNumArticleViews(Article article) {
		return null;
	}

    /* increment count of article likes per click */
	public Thought4ThoughtResponseObject countNumArticleLikes(Article article) {
		return null;
	}

	

	
    
}