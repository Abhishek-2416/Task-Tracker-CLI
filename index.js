#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {Command} = require("commander");
const program = new Command();

// Helper functions
function loadTasks(){
    // Path where the Json exists, currently serving as DB
    const filePath = path.join(__dirname,"tasks.json");

    // Checking if the path exists, else creating a new file and appending with empty array
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath,"[]","utf8");
        return [];
    }else{
        // Now that it exists we are now reading and returning the array that we get
        const data = fs.readFileSync(filePath,"utf8");

        try{
            const tasks = JSON.parse(data);
            return tasks;
        }catch{
            console.error("Encountered Error while parsing the Json file");
        }
    }
}

function saveTasks(tasks){
    // So we get the array from the loadTask()
    const filePath = path.join(__dirname,"tasks.json");
    try{
        const updatedList = JSON.stringify(tasks,null,2);
        fs.writeFileSync(filePath,updatedList,"utf8");
    }catch{
        console.error("Failed to save tasks");
    }
}

function computeNextId(tasks){
    if(tasks.length === 0){
        return 1;
    }else {
        const existingIds = [];

        tasks.forEach(element => {
            existingIds.push(element.id);
        });

        let largest = existingIds[0];
        for(let i = 1; i < existingIds.length; i++){
            if(existingIds[i] > largest){
                largest = existingIds[i];
            }
        }

        return largest+1;
    }
}

program
    .name("task-cli")
    .description("Simple task manager via CLI")
    .version("1.0.0");

// Add
program
    .command("add <description>")
    .description("Add a new task")
    .action((description) => {
        const tasks = loadTasks();
        const nextId = computeNextId(tasks);
        // ISO string 2026-01-08T10:30:00.000Z
        const now = new Date().toISOString();
        const task = {
            id: nextId,
            description: description,
            status: "todo",
            createdAt: now,
            updatedAt: now
        };

        try{
            tasks.push(task);
            saveTasks(tasks);
            console.log(`${task.description} added sucessfully`);
        }catch{
            console.log(`Failed to add task: ${task.description}`);
        }

    });

// Update
program
    .command("update <id> <description>")
    .description("Update existing task")
    .action((id,description) => {
        const tasks = loadTasks();
        const taskId = Number(id);

        if (Number.isNaN(taskId)) {
        console.error("Task ID must be a number");
        return;
        }

        const task = tasks.find(t => t.id === taskId);

        if (!task) {
        console.error(`Task not found (ID: ${taskId})`);
        return;
        }

        task.description = description;
        task.updatedAt = new Date().toISOString();

        saveTasks(tasks);

        console.log(`Task ${taskId} updated successfully`);
    });

// Delete
program
    .command("delete <id>")
    .description("To delete specific task")
    .action((id) => {
        const tasks = loadTasks();
        const taskId = Number(id);

        const specificTask = tasks.find(t => t.id === taskId);
        console.log(specificTask);
        if(!specificTask){
            console.error(`Task not found (ID: ${taskId})`);
            return;
        }

        // So for finding we use .find and to remove we need to use .filter
        // So here the filter removes the everything which doesn't match the condition
        const updatedTasks = tasks.filter(t => t.id !== specificTask.id);

        // save the data
        saveTasks(updatedTasks);
        console.log(`Deleted task with the id: ${id}`)
    });

// Mark-in-progess
program
    .command("mark-in-progress <id>")
    .description("To set status of task in progess")
    .action((id) => {
        const tasks = loadTasks();
        const taskId = Number(id);
        const now = new Date().toISOString();

        const specificTask = tasks.find(t => t.id === taskId);

        if(!specificTask){
            console.error(`Task not found (ID: ${taskId})`);
            return;
        }

        specificTask.status = "in-progress";
        specificTask.updatedAt = now;

        saveTasks(specificTask);
    });

// Mark-done
program
    .command("mark-done <id>")
    .description("To set status of task as done")
    .action((id) => {
        const tasks = loadTasks();
        const taskId = Number(id);
        const now = new Date().toISOString();

        const specificTask = tasks.find(t => t.id === taskId);

        if(!specificTask){
            console.error(`Task not found (ID: ${taskId})`);
            return;
        }

        specificTask.status = "done";
        specificTask.updatedAt = now;

        saveTasks(specificTask);
    });

//List
const list_command = program
  .command("list [status]")
  .description("List tasks by status")
  .action((status) => {
    const valid = ["done", "todo", "in-progress"];

    if(status === undefined){
        console.log("We will display all the tasks");
    }else if(!valid.includes(status)){
        console.error(`Invalid status ${status}`);
        list_command.help();
    }
  });

program.parse(process.argv);