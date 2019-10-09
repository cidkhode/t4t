package controllers.springmv.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import thought4thought.springmvc.model.User;
import thought4thought.springmvc.service.UserService;


public class RegistrationController {

	public UserService userService;

	@RequestMapping(value="/register", method = RequestMethod.GET)
	public ModelandView showRegister(HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView mav= new ModelAndView("register");
		mav.addObject("user", new User());

		return mav;
	}

}
