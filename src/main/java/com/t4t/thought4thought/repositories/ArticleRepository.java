package com.t4t.thought4thought.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import com.t4t.thought4thought.entities.Article;

public interface ArticleRepository extends CrudRepository<Article, Integer> {

    Article findByArticleID(int articleID);

    List<Article> findAllByUserEmail(String email);

    boolean existsByArticleID(int articleID);

    @Modifying
    @Transactional
    long deleteByArticleID(int articleID);

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
    @Query("update Article article set article.isPublished = ?1, article.datePublished = ?2, article.dateModified = ?2 where article.articleID = ?3")
    void setArticleIsPublishedByArticleID(boolean isPublished, LocalDateTime datePublished, int articleID);

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
    @Query("update Article article set article.contentState = ?1 where article.articleID = ?2")
	void setArticleContentStateByID(String contentState, int articleID);

    @Modifying
    @Transactional
    @Query("update Article article set article.thumbnailImageURL = ?1 where article.articleID = ?2")
	void setArticleThumbnailByID(String thumbnailImageURL, int articleID);

    @Transactional
    @Query("select article from Article article where article.title like %?1% and article.isPublished = true")
    List<Article> findByTitleContaining(String searchString);
}