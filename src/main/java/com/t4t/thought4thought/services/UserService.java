package com.t4t.thought4thought.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.t4t.thought4thought.entities.Topic;
import com.t4t.thought4thought.entities.User;
import com.t4t.thought4thought.repositories.TopicRepository;
import com.t4t.thought4thought.utils.PasswordEncryptor;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import com.t4t.thought4thought.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

import static com.t4t.thought4thought.utils.Constants.*;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    TopicRepository topicRepository;

    public boolean validUser(String email, String password) {
        PasswordEncryptor passwordEncryptor = new PasswordEncryptor();
        User user = userRepository.findByEmail(email);
        return user != null && user
                .getPassword()
                .equals(passwordEncryptor.encryptPassword(password, user.getPasswordSalt()));
    }

    public ObjectNode getUserByEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        return extractUserDetails(user);
    }

    private ObjectNode extractUserDetails(User user) {
        ObjectNode userDetails = new ObjectMapper().createObjectNode();
        String aboutMe = user.getAboutMe();
        String email = user.getEmail();
        String fieldsOfStudy = user.getFieldsOfStudy();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String id = user.getId().toString();
        String interests = user.getInterests();
        String profilePictureURL = user.getProfilePictureURL();
        String topicIds = user.getTopicIds();
        String userType = user.getUserType();
        String viewPoints = user.getViewPoints();
        userDetails
                .put("aboutMe", aboutMe != null ? aboutMe : "")
                .put("email", email != null ? email :  "")
                .put("fieldsOfStudy", fieldsOfStudy != null ? fieldsOfStudy : "")
                .put("firstName", firstName != null ? firstName : "")
                .put("lastName", lastName != null ? lastName : "")
                .put("id", id)
                .put("interests", interests != null ? interests : "")
                .put("profilePictureURL", profilePictureURL != null ? profilePictureURL : "")
                .put("topicIds", topicIds != null ? topicIds : "")
                .put("userType", userType != null ? userType : "")
                .put("viewPoints", viewPoints != null ? viewPoints : "");
        if (topicIds != null) {
            ArrayList<Topic> topics = new ArrayList<>();
            ArrayList<String> topicIdsList = new ArrayList<>(Arrays.asList(topicIds.split(",")));
            topicIdsList.forEach(topicId -> {
                if (topicId.length() > 0) topics.add(topicRepository.findById(Integer.parseInt(topicId)));
            });
            ArrayNode topicsArrayNode = new ObjectMapper().valueToTree(topics);
            userDetails.putArray("userLikedTopics").addAll(topicsArrayNode);
        }
        return userDetails;
    }

    public Thought4ThoughtResponseObject registerNewUser(User user) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_SUCCESS_CODE, "Saved user successfully!");
        PasswordEncryptor passwordEncryptor = new PasswordEncryptor();
        String salt = passwordEncryptor.generateRandomSalt();
        user.setPasswordSalt(salt);

        if (!userRepository.existsByEmail(user.getEmail())) {
            try {
                user.setPassword(passwordEncryptor.encryptPassword(user.getPassword(), user.getPasswordSalt()));
                userRepository.save(user);
            } catch (Exception e) {
                thought4ThoughtResponseObject.setStatus(T4T_ERROR_CODE);
                thought4ThoughtResponseObject.setInfo("Something went wrong...");
                e.printStackTrace();
            }
        } else {
            thought4ThoughtResponseObject.setStatus(T4T_INVALID_CODE);
            thought4ThoughtResponseObject.setInfo("User exists already!");
        }
        return thought4ThoughtResponseObject;
    }

    private ArrayList<String> addDataToList(String existingData, String data) {
        ArrayList<String> addedInterests = new ArrayList<>(Arrays.asList(data.split(",")));
        ArrayList<String> newContents = new ArrayList<>();
        if (existingData.length() > 0) {
            newContents.addAll(Arrays.asList(existingData.split(",")));
        }
        newContents.addAll(addedInterests);
        for(String id: newContents){
            System.out.println(id);
        }
        return newContents;
    }

    public Thought4ThoughtResponseObject saveProfileUpdates(String keyToUpdate,
                                                            String changesInProfile,
                                                            String userEmailInSession) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_ERROR_CODE,
                        "Couldn't update profile; something went wrong.");
        if (userEmailInSession != null) {
            User user = userRepository.findByEmail(userEmailInSession);
            switch(keyToUpdate) {
                case "aboutMe": {
                    userRepository.setUserAboutMeByEmail(changesInProfile, userEmailInSession);
                    break;
                }
                case "Interests": {
                    String existingInterests = user.getInterests();
                    userRepository.setUserInterestsByEmail(String.join(",", addDataToList(existingInterests, changesInProfile)), userEmailInSession);
                    break;
                }
                case "Views": {
                    String existingViewPoints = user.getViewPoints();
                    userRepository.setUserViewPointsByEmail(String.join(",", addDataToList(existingViewPoints, changesInProfile)), userEmailInSession);
                    break;
                }
            }
            thought4ThoughtResponseObject.setStatus(T4T_SUCCESS_CODE);
            thought4ThoughtResponseObject.setInfo("Updated user profile!");
        }
        return thought4ThoughtResponseObject;
    }

    public Thought4ThoughtResponseObject deleteValueFromProfile(String keyToUpdate,
                                                              String valueToDelete,
                                                              String userEmailInSession) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_ERROR_CODE,
                        "Couldn't update profile; something went wrong.");
        if (userEmailInSession != null) {
            User userProfileToUpdate = userRepository.findByEmail(userEmailInSession);
            switch(keyToUpdate) {
                case "Interests": {
                    ArrayList<String> interests = new ArrayList<>(Arrays.asList(userProfileToUpdate.getInterests().split(",")));
                    interests.remove(valueToDelete);
                    userRepository.setUserInterestsByEmail(String.join(",", interests), userEmailInSession);
                    break;
                }
                case "Views": {
                    ArrayList<String> views = new ArrayList<>(Arrays.asList(userProfileToUpdate.getViewPoints().split(",")));
                    views.remove(valueToDelete);
                    userRepository.setUserViewPointsByEmail(String.join(",", views), userEmailInSession);
                    break;
                }
            }
            thought4ThoughtResponseObject.setStatus(T4T_SUCCESS_CODE);
            thought4ThoughtResponseObject.setInfo("Updated user profile!");
        }
        return thought4ThoughtResponseObject;
    }

    public Thought4ThoughtResponseObject saveTopic(String userEmailInSession, String topicID) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_ERROR_CODE,
                        "Couldn't edit information; Something went terribly wrong!");
        if (userEmailInSession != null) {
            User user = userRepository.findByEmail(userEmailInSession);
            String existingTopicIds = user.getTopicIds();
            boolean ifIdHere = false;
            ArrayList<String> listofIds = new ArrayList<>(Arrays.asList(existingTopicIds.split(",")));

            for (String ids: listofIds) {
                if (ids.compareTo(topicID) == 0) {
                    ifIdHere = true;
                    break;
                }
            }

            if (!ifIdHere) {
                userRepository.setUserTopicIdsByEmail(String.join(",", addDataToList(existingTopicIds, topicID)), userEmailInSession);
                thought4ThoughtResponseObject.setStatus(T4T_SUCCESS_CODE);
                thought4ThoughtResponseObject.setInfo("Updated user profile!");
            } else {
                thought4ThoughtResponseObject.setStatus(T4T_INVALID_CODE);
                thought4ThoughtResponseObject.setInfo("User already liked this topic!");
            }
        }
        return thought4ThoughtResponseObject;
    }

    public Thought4ThoughtResponseObject deleteTopic(String userEmailInSession, String topicID) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_ERROR_CODE,
                        "Couldn't edit information; Something went terribly wrong!");
        if (userEmailInSession != null) {
            User user = userRepository.findByEmail(userEmailInSession);
            String existingTopicIds = user.getTopicIds();
            ArrayList<String> topics = new ArrayList<>(Arrays.asList(existingTopicIds.split(",")));
            boolean ifIdHere = false;

            for (String ids: topics) {
                if (ids.compareTo(topicID) == 0) {
                    ifIdHere = true;
                    break;
                }
            }

            if (ifIdHere) {
                topics.remove(topicID);
                userRepository.setUserTopicIdsByEmail(String.join(",", topics), userEmailInSession);
                thought4ThoughtResponseObject.setStatus(T4T_SUCCESS_CODE);
                thought4ThoughtResponseObject.setInfo("Updated user profile!");
            } else {
                thought4ThoughtResponseObject.setStatus(T4T_INVALID_CODE);
                thought4ThoughtResponseObject.setInfo("The user has not liked this topic yet!");
            }
        }
        return thought4ThoughtResponseObject;
    }

    public Thought4ThoughtResponseObject saveAboutMe(String newAboutMe, String userEmailInSession) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_ERROR_CODE,
                        "Couldn't edit information; Something went terribly wrong!");
        if (userEmailInSession != null) {
            if (newAboutMe.length() > 0) {
                userRepository.setUserAboutMeByEmail(newAboutMe, userEmailInSession);
                thought4ThoughtResponseObject.setStatus(T4T_SUCCESS_CODE);
                thought4ThoughtResponseObject.setInfo("Updated about you!");
            } else {
                thought4ThoughtResponseObject.setStatus(T4T_ERROR_CODE);
                thought4ThoughtResponseObject.setInfo("Failed to update about you.");
            }
        }
        return thought4ThoughtResponseObject;
    }

    public Thought4ThoughtResponseObject addInterests(String newInterests, String userEmailInSession) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_ERROR_CODE,
                        "Couldn't edit information; Something went terribly wrong!");
        if (userEmailInSession != null) {
            if (newInterests.length() > 0) {
                userRepository.setUserInterestsByEmail(newInterests, userEmailInSession);
                thought4ThoughtResponseObject.setStatus(T4T_SUCCESS_CODE);
                thought4ThoughtResponseObject.setInfo("Updated about you!");
            } else {
                thought4ThoughtResponseObject.setStatus(T4T_ERROR_CODE);
                thought4ThoughtResponseObject.setInfo("Failed to update about you.");
            }
        }
        return thought4ThoughtResponseObject;
    }

    public Thought4ThoughtResponseObject addViewPoints(String newViewPoints, String userEmailInSession) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(T4T_ERROR_CODE,
                        "Couldn't edit information; Something went terribly wrong!");
        if (userEmailInSession != null) {
            if (newViewPoints.length() > 0) {
                userRepository.setUserViewPointsByEmail(newViewPoints, userEmailInSession);
                thought4ThoughtResponseObject.setStatus(T4T_SUCCESS_CODE);
                thought4ThoughtResponseObject.setInfo("Updated about you!");
            } else {
                thought4ThoughtResponseObject.setStatus(T4T_ERROR_CODE);
                thought4ThoughtResponseObject.setInfo("Failed to update about you.");
            }
        }
        return thought4ThoughtResponseObject;
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
