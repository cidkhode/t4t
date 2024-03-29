package com.t4t.thought4thought.services;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.t4t.thought4thought.entities.User;
import com.t4t.thought4thought.repositories.ArticleRepository;
import com.t4t.thought4thought.repositories.UserRepository;
import com.t4t.thought4thought.utils.Constants;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

@Service
public class AwsS3Service {
    private AmazonS3 s3;
    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    @Value("${amazonProperties.accessKey}")
    private String accessKey;
    @Value("${amazonProperties.secretKey}")
    private String secretKey;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ArticleRepository articleRepository;

    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3 = new AmazonS3Client(credentials);
    }

    public Thought4ThoughtResponseObject saveUserProfilePicture(MultipartFile multipartFile,
                                                                String fileExtension,
                                                                String userEmailInSession) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(-1,
                        "Couldn't upload; Something went terribly wrong!");
        String trueExtension = "";
        if (fileExtension == null) {
            trueExtension = "jpg";
        } else {
            trueExtension = fileExtension;
        }
        if (userEmailInSession != null) {
            User userInSession = userRepository.findByEmail(userEmailInSession);
            String fileName = userInSession.getFirstName() + "_" +
                    userInSession.getLastName() + "_" + userInSession.getId() + "." + trueExtension;
            String userProfilePictureURL = uploadImageToS3(multipartFile, fileName, Constants.T4T_PROFILE_BUCKET_PATH);
            if (userProfilePictureURL.length() > 0) {
                userRepository.setUserProfilePictureURLByEmail(userProfilePictureURL, userEmailInSession);
                thought4ThoughtResponseObject.setStatus(0);
                thought4ThoughtResponseObject.setInfo("Uploaded a new picture!");
            } else {
                thought4ThoughtResponseObject.setStatus(-1);
                thought4ThoughtResponseObject.setInfo("Couldn't upload a new picture!");
            }
        }
        return thought4ThoughtResponseObject;
    }

    private String uploadImageToS3(MultipartFile multipartFile, String fileName, String bucketPath) {
        String profileBucketName = this.bucketName + bucketPath;
        String fileUrl = "";
        File file = null;
        try {
            file = convertMultiPartToFile(multipartFile);
            fileUrl = endpointUrl + "/" + profileBucketName + "/" + fileName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        s3.putObject(new PutObjectRequest(profileBucketName, fileName, file)
		        .withCannedAcl(CannedAccessControlList.PublicRead));
		file.delete();

        return fileUrl;
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    public String deleteFileFromS3Bucket(String fileUrl) {
        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        s3.deleteObject(new DeleteObjectRequest(bucketName + "/", fileName));
        return "Successfully deleted";
    }

	public Thought4ThoughtResponseObject saveArticleThumbnailPicture(MultipartFile file, String articleId) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject()
                        .createResponse(Constants.T4T_ERROR_CODE, "Couldn't upload; Something went terribly wrong!");
        if (articleId != null) {
            String articleThumbnailImageURL = uploadImageToS3(file, file.getOriginalFilename(), Constants.T4T_ARTICLE_PICTURE_PATH);
            if (articleThumbnailImageURL.length() > 0) {
                articleRepository.setArticleThumbnailByID(articleThumbnailImageURL, Integer.parseInt(articleId));
                thought4ThoughtResponseObject.setStatus(0);
                thought4ThoughtResponseObject.setInfo("Uploaded a new picture!");
            } else {
                thought4ThoughtResponseObject.setStatus(-1);
                thought4ThoughtResponseObject.setInfo("Couldn't upload a new picture!");
            }
        }
        return thought4ThoughtResponseObject;
    }
}