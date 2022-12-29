// packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const generateMarkdown = require("./Utilities/generateMarkdown");
const { doesNotMatch } = require("assert");

// array of questions for user input
const questions = [

    {
        type: "input",
        name: "github",
        message: "Enter your GitHub username:",

    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address:",
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
    },
    {
        type: "input",
        name: "description",
        message: "Describe your project:",
    },
    {
        type: "input",
        name: "installation",
        message: "What dependencies are installed?",
    },
    {
        type: "input",
        name: "usage",
        message: "What are the instructions for usage?",
    },
    {
        type: "input",
        name: "license",
        message: "What license would you like your project to include?",
        choices: ["apache-2.0", "gpl-3.0", "ms-pl", "mit", "osl-3.0", "none"]
    },
    {
        type: "input",
        name: "contribution",
        message: "Who contributed to this project?",
    },
    {
        type: "input",
        name: "tests",
        message: "What command is used to run tests?",
        default: "npm run test",
    }, 
    

];

// function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// function to initialize app
function init() {
    inquirer.prompt(questions)
        .then((inquirerAnswers) => {
            console.log("Generating... Almost Complete...");
            writeToFile("./README.md", generateMarkdown({ ...inquirerAnswers }));
        })
}

// function call to initialize app
init();