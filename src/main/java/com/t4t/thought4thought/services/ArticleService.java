package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.Article;
import com.t4t.thought4thought.repositories.ArticleRepository;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;

import static com.t4t.thought4thought.utils.Constants.*;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ArticleService{
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    
    @Autowired
    ArticleRepository articleRepository;

    /* create initial article */
    public Thought4ThoughtResponseObject createArticle(String content, String userEmail, String keyToUpdate){
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article created successfully!");
        LocalDateTime now = LocalDateTime.now();
        Article article = new Article();
        article.setUserEmail(userEmail);
        switch(keyToUpdate) {
            case "contentState": {
                article.setContentState(content);
                break;
            }
            case "articleTitle": {
                article.setTitle(content);
                break;
            }
            case "articleDescription": {
                article.setDescription(content);
                break;
            }
        }
        article.setDateCreated(now);
        article.setIsPublished(false);
        articleRepository.save(article);
        thought4ThoughtResponseObject.setInfo(article.getArticleID().toString());
        return thought4ThoughtResponseObject;
    }

    /* modify article */
    /*
    public Thought4ThoughtResponseObject modifyArticle(Article article) {
		Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article modified successfully!");
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
        LocalDateTime now = LocalDateTime.now(); 
        if(!articleRepository.existsByArticleID(article.getArticleID())){
            article.setContentState(article.getContentState());
            article.setDateModified(now);
        }
        return thought4ThoughtResponseObject;
    }
    */

    /* publish final article to main page */
    public Thought4ThoughtResponseObject publishArticleToMain(int articleID) {
		Thought4ThoughtResponseObject thought4ThoughtResponseObject =
        new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article published successfully!");
        LocalDateTime date = LocalDateTime.now();
        articleRepository.setArticleIsPublishedByArticleID(true, date, articleID);
        return thought4ThoughtResponseObject;
	}
/*
    public boolean publishedArticle(int articleID) {
        return articleRepository.existsByArticleID(articleID);
    }*/

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

    public Thought4ThoughtResponseObject deleteArticle(int articleID) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_ERROR_CODE,
                        "Couldn't delete article with article id: " + articleID);
        long countOfDeletedIds = articleRepository.deleteByArticleID(articleID);
        if (countOfDeletedIds == 1) {
            thought4ThoughtResponseObject.setInfo("Successfully deleted article with id of: " + articleID);
            thought4ThoughtResponseObject.setStatus(T4T_SUCCESS_CODE);
        } else {
            thought4ThoughtResponseObject.setInfo("Something went wrong deleting the article at this time... ");
            thought4ThoughtResponseObject.setStatus(T4T_INVALID_CODE);
        }
        return thought4ThoughtResponseObject;
    }

    public Thought4ThoughtResponseObject saveArticleUpdates(String keyToUpdate, int articleID, String changedColValue) {
		Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE,
                        "Successfully saved article with article id: " + articleID);
        switch(keyToUpdate){
            case "articleTitle": {
                articleRepository.setArticleTitleByID(changedColValue, articleID);
                break;
            }
            case "articleDescription": {
                articleRepository.setArticleDescByID(changedColValue, articleID);
                break;
            }
            case "contentState": {
                articleRepository.setArticleContentStateByID(changedColValue, articleID);
                break;
            }
            case "articleThumbnail": {
                articleRepository.setArticleThumbnailByID(changedColValue, articleID);
                break;
            }
        }
        return thought4ThoughtResponseObject;
	}

	public List<Article> searchArticles(String searchingString){
         return articleRepository.findByTitleContaining(searchingString);
    }
  
}