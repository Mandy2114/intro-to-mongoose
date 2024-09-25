import promptSync from "prompt-sync";
import dotenv from "dotenv";
dotenv.config();
import Customer from "./models/Customer.js";
import mongoose from "mongoose";

const prompt = promptSync();
/////////i have no idea wnat im doing//////
async function runQueries(choice) {
  switch (choice) {
    case "1":
      await createCustomer();
      break;
    case "2":
      await viewCustomers();
      break;
    case "3":
      await updateCustomer();
      break;
    case "4":
      await deleteCustomer();
      break;
    default:
      console.log("Thanks for joining! Have a great day.");
      await mongoose.disconnect();
      break;
  }
}


// Mongoose Queries
async function createCustomer() {
  const name = prompt("What is the customer name? ");
  const age = parseInt(prompt("What is the customer age? "));

  await Customer.create({
    name,
    age,
  });

  console.log("Customer created!");
  getStarted();
}

async function viewCustomers() {
  const customers = await Customer.find({});
  console.log(customers);

  getStarted();
}

async function updateCustomer() {
  const findUserNamed = prompt(
    "What is the customer name you are looking to update? "
  );
  const newUserAge = prompt("What is the new age? ");

  const updatedUser = await Customer.findOneAndUpdate(
    { name: findUserNamed },
    { age: newUserAge },
    { new: true }
  );

  console.log(updatedUser);

  getStarted();
}

async function deleteCustomer() {
  const findUserNamed = prompt("Which customer do you want to destroy? ");

  await Customer.deleteOne({ name: findUserNamed });
  console.log("Customer destroyed!");

  getStarted();
}


// Connection and getting started prompt
function getStarted() {
  console.log(`Welcome to the CRM

    What would you like to do?

    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. quit")`);

  const userChoice = prompt("Number of action to run: ");

  runQueries(userChoice);
}

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to Customer API");

  getStarted();
};

connect();