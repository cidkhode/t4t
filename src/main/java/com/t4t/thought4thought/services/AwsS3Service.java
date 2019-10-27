package com.t4t.thought4thought.services;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.t4t.thought4thought.utils.Constants;
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

    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3 = new AmazonS3Client(credentials);
    }

    public String uploadProfileImage(MultipartFile multipartFile, String email) {
        /* Replace '@' and '.' in email with underscore and use it as the filename */
        String fileName = email.replace('@', '_').replace('.', '_');
        String profileBucketName = this.bucketName + Constants.T4T_PROFILE_BUCKET_PATH;
        String fileUrl = "";
        File file = null;

        /* Convert Multipartfile to File */
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
    }

    public String deleteFileFromS3Bucket(String fileUrl) {
        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        s3.deleteObject(new DeleteObjectRequest(bucketName + "/", fileName));
        return "Successfully deleted";
    }


}