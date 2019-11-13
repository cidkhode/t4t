package com.t4t.thought4thought.services;

import com.t4t.thought4thought.entities.Article;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import static com.t4t.thought4thought.utils.Constants.*;
import org.springframework.stereotype.Service;

@Service
public class ArticleService{

    /* publish article */
    public Thought4ThoughtResponseObject publishArticle(Article article){
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article uploaded successfully!");
        return thought4ThoughtResponseObject;
    }

    /* delete article */
    public Thought4ThoughtResponseObject deleteArticle(Article article){
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Article successfully deleted.");
        return thought4ThoughtResponseObject;

    }

    //create article

    //modify article

    
}