const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function menu() {
    function createManager() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: "What is the manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: 'input',
                name: 'managerId',
                message: "What is the manager's ID?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid ID number.";
                }
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: "What is the manager's email?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: 'input',
                name: 'managerOffice',
                message: "What is the manager's office number?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid office number.";
                }
            },
            {
                type: 'confirm',
                name: 'repeatManager',
                message: 'Would you like to add another manager?'
            }
        ])
            .then((data) => {
                // create objects for each type of employee
                let managerObj = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice)
                employees.push(managerObj);
                if (data.repeatManager == true) {
                    createManager();
                } else {
                    createEngineer();
                }
            })
    }
    function createEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: "What is the engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: 'input',
                name: 'engineerId',
                message: "What is the engineer's ID?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid ID number.";
                }
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: "What is the engineer's email?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: "What is the engineer's GitHub username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid GitHub username.";
                }
            },
            {
                type: 'confirm',
                name: 'repeatEngineer',
                message: 'Would you like to add another engineer?'
            }
        ])
            .then((data) => {
                let engineerObj = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub)
                employees.push(engineerObj);
                if (data.repeatEngineer == true) {
                    createEngineer();
                } else {
                    createIntern();
                }
            })
    }
    function createIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: "What is the intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: 'input',
                name: 'internId',
                message: "What is the intern's ID?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid ID number.";
                }
            },
            {
                type: 'input',
                name: 'internEmail',
                message: "What is the intern's email?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: 'input',
                name: 'internSchool',
                message: "What is the name of the intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid school name.";
                }
            },
            {
                type: 'confirm',
                name: 'repeatIntern',
                message: "Would you like to add another intern?",
            }
        ]).then(function (data) {
            let internObj = new Intern(data.internName, data.internId, data.internEmail, data.internSchool)
            employees.push(internObj);
            console.log(employees);

            if (data.repeatIntern == true){
                createIntern();
            } else {
                fs.writeFile(outputPath, render(employees), function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
            }


        })
    }
    createManager();
}
// create a inquirer prompt function to ask users if they want to add more members
menu();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
