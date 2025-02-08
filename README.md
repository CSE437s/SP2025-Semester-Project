# SP2025: Group &lt;Group Number&gt; &lt;Project Name&gt;
 
**SP2025_Group_&lt;Group 3&gt;**  

## Team Members
- **&lt;Deyuan Yang&gt;**: &lt;deyuan.y@wustl.edu&gt; ; &lt;Doreenyang&gt;
- **&lt;Aman Verma&gt;**: &lt;aman.v@wustl.edu&gt; ; &lt;aman070902&gt;
- **&lt;Ashutosh Deorukhkar&gt;**: &lt;a.deorukhkar@wustl.edu&gt; ; &lt;Ashutosh-254&gt;

## TA
&lt;Name of your group's TA&gt;

## Objectives
&lt;Description of what your project is about, your key functionalities, tech stacks used, etc. &gt;

## How to Run
### Prerequisites

Ensure the following tools are installed:

1. **Node.js** (v16.x or higher) and **npm** (v8.x or higher).

2. **MySQL** (v8.x or higher).

---

### Backend Setup

1. **Navigate to the Backend Directory**:

   ```bash

   cd server

   ```

2. **Install Dependencies**:

   ```bash

   npm install

   ```

3. **Create a .env File**:

   In the server directory, create a .env file with the following content:

   ```

   DB_HOST=localhost

   DB_USER=root

   DB_PASS=yourpassword

   DB_NAME=yourdatabase

   JWT_SECRET=your_secret_key

   ```

   Replace:

   - yourpassword with your MySQL password.

   - yourdatabase with the database name.

   - your_secret_key with a secure string for signing JWTs.

4. **Set Up the MySQL Database**:

   - Start MySQL:

     ```bash

     mysql -u root -p

     ```

   - Create the database and table:

     ```sql

     CREATE DATABASE yourdatabase;

     USE yourdatabase;

     CREATE TABLE users (

         id INT AUTO_INCREMENT PRIMARY KEY,

         username VARCHAR(100) NOT NULL,

         email VARCHAR(100) NOT NULL UNIQUE,

         password VARCHAR(255) NOT NULL,

         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

     );

      CREATE TABLE products (

         id INT AUTO_INCREMENT PRIMARY KEY,

         product_name VARCHAR(255) NOT NULL,

         suitable_season ENUM('spring', 'summer', 'autumn', 'winter') NOT NULL,

         product_description TEXT NOT NULL,

         product_image VARCHAR(255),
         
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );



     ```

   - Exit MySQL:

     ```bash

     EXIT;

     ```

5. **Start the Backend Server**:

   ```bash

   npm start

   ```

   The backend will run on http://localhost:8080.

---

### Frontend Setup

1. **Navigate to the Frontend Directory**:

   ```bash

   cd ../client

   ```

2. **Install Dependencies**:

   ```bash

   npm install

   ```

3. **Start the React Development Server**:

   ```bash

   npm start

   ```

   The frontend will run on http://localhost:3000.

---

### Access the Application

- **Frontend**: Navigate to http://localhost:3000 in your browser.

- **Backend**: The backend API is accessible at http://localhost:8080.

---

### Common Issues

1. **Database Connection Error**:

   - Ensure MySQL is running and the .env file is correctly configured.

2. **Frontend Not Loading**:

   - Verify that the React development server is running on http://localhost:3000.

3. **Port Conflicts**:

   - Ensure no other services are using ports 8080 or 3000.

``` 
