package com.t4t.thought4thought.repositories;

import com.t4t.thought4thought.entities.Topic;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TopicRepository extends CrudRepository<Topic, Integer> {
    Topic findById(int topicId);

    @Modifying
    @Transactional
    @Query("update Topic topic set topic.numOfHearts = ?1 where topic.id = ?2")
    void updateHeartsOfTopic(int numOfHearts, int topicId);

    @Modifying
    @Transactional
    @Query("select topic from Topic as topic order by topic.numOfHearts desc")
    Iterable<Topic> findAllOrderByNumOfHeartsDesc();
}
