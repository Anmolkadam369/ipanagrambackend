
IPANAGRAM BACKEND 


Description


This Node.js backend project serves as the server-side implementation for managing employees and departments within an organization. It provides various API endpoints for user authentication, department management, and employee CRUD operations, Managers CRUD operations.


To run this backend project locally, follow these steps:

Clone the repository:

https://github.com/Anmolkadam369/ipanagrambackend.git


Install dependencies:


npm install


Start the server:


npx nodemon


Usage
Ensure that the backend server is running and accessible. This backend project is designed to work in conjunction with the corresponding frontend application.

Routes

1 signUP and Login :

post "/employeesignup"

post '/employeesignIn'

post "/managersignup"

post '/managersignIn'




2 Employee : 

get '/employees/:userId'     get All Employees

get '/employee/:userId'      get Individal Employee 

put '/employee/:userId/:employeeId'     update Employee

delete '/employee/:userId/:employeeId'   Delete Employee




3 Manager : 

get '/manager/:userId'       get Individual Manager 




4 Department : 

post '/departments/:userId'                        create Departments

get '/departments/:userId'                          get Departments

put '/departments/:userId/:departmentId',          update Department

delete '/departments/:userId/:departmentId',       delete Department




5 Sorting : 

get '/sortedByLocation/:userId'                 sorted by Location

post '/sortedByName/:userId'                     sorted by Name







Technologies Used


Node.js

Express

MongoDB

JWT (JSON Web Tokens) for authentication

