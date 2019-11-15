package com.t4t.thought4thought.controllers;

import com.t4t.thought4thought.services.AwsS3Service;
import com.t4t.thought4thought.utils.Thought4ThoughtResponseObject;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/storage/")
public class AwsS3BucketController {

    private AwsS3Service amazonClient;

    @Autowired
    AwsS3BucketController(AwsS3Service amazonClient) {
        this.amazonClient = amazonClient;
    }

    @PostMapping("/uploadFile")
    public Thought4ThoughtResponseObject uploadFile(@RequestPart(value = "file") MultipartFile file, HttpServletRequest request, HttpSession session) {
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        return this.amazonClient.saveUserProfilePicture(file,
                extension,
                (String) session.getAttribute("userEmail"));
    }

    // use ID to set thumbnailurl by article query
    @PostMapping("/uploadArticleThumbnail")
    public Thought4ThoughtResponseObject uploadArticleThumbnail(@RequestPart(value = "file") MultipartFile file, HttpServletRequest request, HttpSession session){
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        return this.amazonClient.saveArticleThumbnailPicture(file, extension, (String) session.getAttribute("userEmail"));
    }

    @DeleteMapping("/deleteFile")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
    }

}