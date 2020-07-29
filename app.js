const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// const writeFileAsync = util.promisify(fs.writefile);
const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

// util - allows you to use write file, asynchronously. 
// const util = require("util")

const teamMembers = [];


// array of questions for user
// add function to select certain questions for the user to answer
function promptQuestions() {
    inquirer.prompt(
        [{
                type: "list",
                message: "Which type of employee would you like to add?",
                name: "role",
                choices: ["Manager", "Engineer", "Intern"]
            },
            {
                type: "input",
                message: "What is the new employee's name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is the new employee's ID number",
                name: "id",
            },
            {
                type: "input",
                message: "What is the employee's email address?",
                name: "email",
            },
        ]
    ).then(function (response) {
        if (response.role == "Manager") {
            manager(response);
        } else if (response.role == "Intern") {
            intern(response);
        } else if (response.role == "Engineer") {
            engineer(response);
        }
    })
};


function manager(answers) {
    console.log(answers);
    console.log("inside manager!");
    //ask office num
    inquirer.prompt(
            [{
                type: "input",
                message: "What is the manager's office number?",
                name: "officeNumber",
            }, ]
        )
        .then(function (managerInfo) {

            const mgr = new Manager(answers.name, answers.id, answers.email, managerInfo.officeNumber)
            //done?
            //push instance of class into an array (teammembers)
            teamMembers.push(mgr);
            console.log(teamMembers);
            newTeamMember();
        })
}

function intern(answers) {
    console.log(answers);
    console.log("inside intern!");
    //ask office num
    inquirer.prompt(
            [{
                type: "input",
                message: "Which college or university did the intern attend?",
                name: "school",
            }, ]
        )
        .then(function (internInfo) {

            const int = new Intern(answers.name, answers.id, answers.email, internInfo.school)
            //done?
            //push instance of class into an array (teammembers)
            teamMembers.push(int);
            console.log(teamMembers);
            newTeamMember();
        })
}

function engineer(answers) {
    console.log(answers);
    console.log("inside engineer!");
    //ask office num
    inquirer.prompt(
            [{
                type: "input",
                message: "What is the engineer's github username?",
                name: "github",
            }, ]
        )
        .then(function (engineerInfo) {

            const eng = new Engineer(answers.name, answers.id, answers.email, engineerInfo.github)
            //done?
            //push instance of class into an array (teammembers)
            teamMembers.push(eng);
            console.log(teamMembers);
            newTeamMember();
        })
}

// creates a prompt for a new team member to be used at the end of adding new team members, else push toHTML
function newTeamMember() {
    return inquirer
        .prompt([{
            type: "confirm",
            message: "Would you like to add another Team member?",
            name: "addnew",
        }, ])
        .then(function (userAddNew) {
            if (userAddNew.addnew === true) {
                promptQuestions();
            } else {
                pushToHTML();
            }
        });
}

promptQuestions();

// function pushToHTML(){

// };