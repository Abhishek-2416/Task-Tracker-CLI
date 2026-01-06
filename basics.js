// This is the basic structure of using the commander
const {Command} = require("commander");
const program = new Command();

program
    .name("task-cli")
    .description("Simple task manager via CLI")
    .version("1.0.0");

// This is how we define a command
program
    .command("add <description>")
    .description("Add a new task")
    .action((description) => {
        console.log(description);
    });

// This is way to design command with multiple positional arguments
program
    .command("update <id> <description>")
    .description("Update existing task")
    .action((id,description) => {
        console.log(`Updating the task ${id} to ${description}`)
    });

// This is how we can design command with option arguments
program
    .command("list [status]")
    .description("To List all the tasks")
    .action((status) => {
        console.log(status);
    });

// So if you want to run the command like task-cli add for example
// 1. add the bin to the package.json check how it was added here
// 2. run npm link 
// 3. On the top of the index.js add #!/usr/bin/env node and then you can now run task-cli add "description"

program.parse(process.argv);