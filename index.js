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
        message: "What are the installation instructions?",
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
        message: "Are there any contribution guidelines?",
    },
    {
        type: "input",
        name: "tests",
        message: "What command is used to run tests?",
        default: "npm test",
    }, 
    

];

// function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./Utilities/alakazamREADME.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

// function to prompt questions and store user inputs
const init = () => {

    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
}

// Function call to initialize app
init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
})