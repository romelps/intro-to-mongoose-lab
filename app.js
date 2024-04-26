const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB');
    await runQueries();
    await mongoose.disconnect();
    console.log('Disconnected from MONGODB');
    process.exit();
}

const username = prompt('What is your name? ');

//console.log(`Your name is ${username}`);

console.log(`Welcome to the CRM, ${username}`);



const choice = prompt('What would you like to do? \n 1. Create a customer \n 2. View all customers \n 3. Update a customer \n 4. Delete a customer \n 5. quit\n')



const createCustomer = async () => {
    if(choice === '1'){
        const name = prompt("What is the new customer's name? ");
        const age = prompt("What is the new customer's age? ");
        const newCustomer = {
            name: name,
            age: age,
        }
        const customer = await Customer.create(newCustomer);
        console.log('New customer: ', customer);
       
    }
    
}

const viewAll = async () => {
   
    if(choice === '2') {
        const customers = await Customer.find({});
        console.log('All customers: ', customers);
       
    }
}

const updateCustomer = async () => {
    if(choice === '3') {
        const customers = await Customer.find({});
        console.log('Below is a list of customers: \n', customers)
        const id = prompt('Copy and paste the id of the customer you would like to update here:');
        const newName = prompt(`What is the customers new name? `);
        const newAge = Number(prompt(`What is the customer's new age? `));
        
        const customer = await Customer.findByIdAndUpdate(
            id,
            { name: newName },
            { age: newAge },
        )
    }
}

const deleteCustomer = async () => {
    if(choice === '4') {
        const customers = await Customer.find({});
        console.log('Below is a list of customers: \n', customers)
        const id = prompt('Copy and paste the id of the customer you would like to delete here:');
        const customer = await Customer.findByIdAndDelete(id);
    }
}

const quit = async () => {
 
    if (choice === '5'){
        console.log('exiting...')
    }
}

const runQueries = async () => {
    await createCustomer();
    await viewAll();
    await updateCustomer();
    await quit();
   
}

connect();