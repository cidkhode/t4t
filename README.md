# Welcome to Thought4Thought!

This is the web-based application we are creating for this project.

### Tech stack

The client side uses the following tech stack:
 - React.JS
 - Node.JS
 - Webpack 4

The server side uses the following tech stack:
- Java / Spring
- Maven

Recommended IDEs:
 - IntelliJ IDEA
 - Eclipse

### Setup
To start this project, you'll need a handful of dev prerequisites including the following:
 - Node.JS
	 - It should come with NPM, but make sure you have this as well
 - Maven
 - JDK8

Follow guided docs to set these up in your machines. Once you have them, pull the project using the repository `.git` link found above. Clone the project, and in the root directory, run the following commands:
 - `mvn clean install -DskipTests` to fetch backend dependencies and compile the project
 - `npm install` to fetch all frontend dependencies
 - To start the Spring application, run `Thought4ThoughtApplication.java` and you should see at the bottom of the console that the application has started
 - To build the frontend, use `npm run build` and then `npm run start` to start it at [localhost:3000](http://localhost:3000/).

More to follow in the coming weeks...