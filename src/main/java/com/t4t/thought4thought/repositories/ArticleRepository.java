package com.t4t.thought4thought.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import com.t4t.thought4thought.entities.Article;

public interface ArticleRepository extends CrudRepository<Article, Integer> {

    Article findByArticleID(int articleID);

    boolean existsByArticleID(int articleID);

    @Modifying
    @Transactional
    @Query("update Article article set article.thumbnailImageURL = ?1 where article.userEmail = ?2")
	void setArticleThumbnailImageURLByEmail(String thumbnailImageURL, String userEmailInSession);

    @Modifying
    @Transactional
    @Query("update Article article set article.thumbnailImageURL = ?1 where article.articleID = ?2")
    void setArticleThumbnailImageURLByArticleID(String thumbnailImageURL, int articleID);

    @Modifying
    @Transactional
    @Query("update Article article set article.isPublished = ?1 where article.articleID = ?2")
    void setArticleIsPublishedByArticleID(boolean isPublished, LocalDateTime dateModified, int articleID);

    @Modifying
    @Transactional
    @Query("update Article article set article.title = ?1 where article.articleID = ?2")
	void setArticleTitleByID(String title, int articleID);

    @Modifying
    @Transactional
    @Query("update Article article set article.description = ?1 where article.articleID = ?2")
	void setArticleDescByID(String description, int articleID);

    @Modifying
    @Transactional
    @Query("update Article article set article.articleText = ?1 where article.articleID = ?2")
	void setArticleTextByID(String articleText, int articleID);

    @Modifying
    @Transactional
    @Query("update Article article set article.thumbnailImageURL = ?1 where article.articleID = ?2")
	void setArticleThumbnailByID(String thumbnailImageURL, int articleID);
}