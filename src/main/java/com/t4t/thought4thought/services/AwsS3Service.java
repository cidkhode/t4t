package com.t4t.thought4thought.services;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
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

    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3 = new AmazonS3Client(credentials);
    }

    public Thought4ThoughtResponseObject saveUserProfilePicture(MultipartFile multipartFile,
                                                                String fileName,
                                                                String userEmailInSession) {
        Thought4ThoughtResponseObject thought4ThoughtResponseObject =
                new Thought4ThoughtResponseObject().createResponse(0,
                        "Successfully uploaded new profile picture!");
        String userProfilePictureURL = uploadProfileImage(multipartFile, fileName);
        if (userProfilePictureURL.length() > 0) {
            if (userEmailInSession != null) {
                userRepository.setUserProfilePictureURLByEmail(userProfilePictureURL, userEmailInSession);
            }
        } else {
            thought4ThoughtResponseObject.setStatus(-1);
            thought4ThoughtResponseObject.setInfo("Couldn't upload a new picture!");
        }
        return thought4ThoughtResponseObject;
    }

    private String uploadProfileImage(MultipartFile multipartFile, String fileName) {
        String profileBucketName = this.bucketName + Constants.T4T_PROFILE_BUCKET_PATH;
        String fileUrl = "";
        File file = null;
        try {
            file = convertMultiPartToFile(multipartFile);
            fileUrl = endpointUrl + "/" + profileBucketName + "/" + fileName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        uploadUserProfileImage(fileName, file, profileBucketName);

        return fileUrl;
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private void uploadUserProfileImage(String fileName, File file, String bucketName) {
        s3.putObject(new PutObjectRequest(bucketName, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        file.delete();
    }

    public String deleteFileFromS3Bucket(String fileUrl) {
        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        s3.deleteObject(new DeleteObjectRequest(bucketName + "/", fileName));
        return "Successfully deleted";
    }


}