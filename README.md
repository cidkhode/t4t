
# Welcome to Thought4Thought!  
  
This is the web-based application we are creating for this project.  
  
### Tech Stack  
  
The client side uses the following tech stack:  
 - React.JS  
 - Node.JS  
 - Webpack 4  
  
The server side uses the following tech stack:  
- Java / Spring  
- Maven
 
Recommended IDEs:  
 - IntelliJ IDEA
  
### Setup  
To start this project, you'll need a handful of dev prerequisites including the following:  
 - Node.JS
   - It should come with NPM, but make sure you have this as well
 - Maven
 - JDK8
  
Follow guided docs online to set these up in your machines. If using Windows OS, you'll have to configure them in your path. Once you have them, pull the project using the repository `.git` link found above. Clone the project, and in the root directory, run the following commands:  
- `mvn clean install -Djasypt.encryptor.password=PUT_REAL_PASSWORD_HERE` String aboutMeUpdate = userInSession.setAboutMe(newAboutMe); to fetch backend dependencies, compile the project, and build a `.jar` executable in the `/target` directory
	- **Note:** we encrypt our passwords in `application.properties` for obvious reasons... Dev team and new joiners will be given the real password to pass in as a command line argument on stand-ups. Please note it down someplace safe and **don't share it**!
 - `npm install` to fetch all frontend dependencies
 - To build the frontend, use `npm run build` and then `npm run start` to start it at [localhost:3000](http://localhost:3000/).  
 - To start the Spring application, run `Thought4ThoughtApplication.java`. Alternatively, you can also go into the terminal and type in `mvn spring-boot:run -Djasypt.encryptor.password=PUT_REAL_PASSWORD_HERE` and you should see at the bottom of the console that the application has started.
 
### Database / Deployment Management
This project uses Amazon Web Services extensively! Our web application runs in an EC2 instance through Elastic Beanstalk and we AWS RDS for SQL Server for our database management. AWS credentials will be given during stand-ups to dev team and new joiners, so please note them down and **don't share these either**!

### Completing Stories / Opening Pull Requests
Before working on any story, please pull all latest code in master branch. You can do this by just typing in `git pull origin master`. Next, checkout a branch: `git checkout -b feature/ch-STORY_ID`. If you are working on a defect, it would be `git checkout -b defect/ch-STORY_ID`. To illustrate this, if the story was a feature story in ClubHouse with an id of 31, the way you would checkout would be `git checkout -b feature/ch-31`. After you've checked out the new branch from master, work on your changes, commit them, and push them upstream using `git push origin branch_name`. In the previous example, `branch_name` was `feature/ch-31`. Next, open a pull request on GitHub with the title being *[CH-STORY_ID] - TITLE OF STORY* and inside the description, throw in the link to the story in ClubHouse. Tag some team members to review your code, and once they've added their review, make the necessary changes if needed. When all is good, either Cid or Emad will merge to master, close the pull request, and delete the branch. Lastly, once the merge is complete, it is the developer's responsibility to update the story status in ClubHouse.