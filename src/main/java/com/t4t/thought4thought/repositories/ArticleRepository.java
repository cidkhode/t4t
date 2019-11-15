package com.t4t.thought4thought.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.t4t.thought4thought.entities.Article;

public interface ArticleRepository extends CrudRepository<Article, Integer> {

    Article findByArticleID(int articleID);

    boolean existsByArticleID(int articleID);

    @Modifying
    @Transactional
    @Query("update Article article set article.thumbnailImageURL = ?1 where article.articleID = ?2")
    void setArticleThumbnailImageURLByArticleID(String thumbnailImageURL, int articleID);
}