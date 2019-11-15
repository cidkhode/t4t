package com.t4t.thought4thought.controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry){
        registry.addViewController("/")
                .setViewName("forward:/index.html");
        registry.addViewController("/{filename:\\w+}")
                .setViewName("forward:/index.html");
        // May be redundant
        // registry.addViewController("/**/{filename:\\w+}")
        //        .setViewName("forward:/index.html");
        registry.addViewController("/{filename:^(?!api$).*$}/**/{filename2:[\\w\\-]+}")
                .setViewName("forward:/index.html");
    }
}
