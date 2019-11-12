package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.Article;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import static com.t4t.thought4thought.utils.Constants.*;
import org.springframework.stereotype.Service;

@Service
public class ArticleService{
    public Thought4ThoughtResponseObject storeArticle(Article article){
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article uploaded successfully!");
        return thought4ThoughtResponseObject;
    }
}