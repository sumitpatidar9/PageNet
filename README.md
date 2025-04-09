# PageNet

PageNet is a full-stack web application that includes a **React frontend** and a **Node.js backend** using **MongoDB** as the database.

## **Project Structure**
```
PageNet
│── client/   # React frontend
│── Server/   # Node.js backend
```

## **Installation & Setup**

### **1. Clone the Repository**
```sh
git clone https://github.com/sumitpatidar9/PageNet.git
cd PageNet
```

### **2. Install Dependencies**
#### **Client**
```sh
cd client
npm install
```

#### **Server**
```sh
cd Server
npm install
```

### **3. Run the Application**
#### **Start the Client**
```sh
cd client
npm start
```

#### **Start the Server**
```sh
cd Server
npm start
```

### **4. Access the App**
- Open your browser and go to **[http://localhost:3000/signup](http://localhost:3000/signup)** to sign up and access the dashboard.

## **API Endpoints**

### **Authentication**
- **GET `/home`** - Serves the homepage.
- **POST `/signup`** - Registers a new user.
- **POST `/login`** - Authenticates a user.
- **GET `/auth`** - Verifies the user token and retrieves user data.

### **Book Management**
- **POST `/books/insert`** - Adds a new book (requires authentication).
- **GET `/user/books`** - Retrieves books added by the authenticated user.
- **GET `/books`** - Fetches all books.
- **GET `/books/search`** - Searches books based on query parameters.
- **GET `/books/filter`** - Fetches books based on filters.
- **DELETE `/books/:id`** - Deletes a book by ID (requires authentication).
- **GET `/books/:id`** - Fetches a book by ID.
- **PUT `/books/:id`** - Updates a book by ID (requires authentication).

## **Technologies Used**
- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
