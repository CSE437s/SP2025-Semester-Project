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

# Database Setup for Trade System

## 1. Modify `users` table (Add Coins)

Run the following query to add a `coins` column to the `users` table, giving each new user 50 coins by default:

```sql
ALTER TABLE users ADD COLUMN coins INT DEFAULT 50;
```

If you already have users in the database, update their coins:

```sql
UPDATE users SET coins = 50 WHERE coins IS NULL;
```

---

## 2. Modify `products` table (Add Owner ID)

Since products need an owner, add an `owner_id` column:

```sql
ALTER TABLE products ADD COLUMN owner_id INT NOT NULL;
```

This will store the user ID of the owner of each product.

---

## 3. Create `trades` Table

The `trades` table stores trade requests between users.

```sql
CREATE TABLE trades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,  -- User requesting the trade
    receiver_id INT NOT NULL,  -- Owner of the requested item
    offered_item_id INT NULL,  -- Item offered in exchange (NULL if using coins)
    requested_item_id INT NOT NULL,  -- Item the user wants
    coins_offered INT DEFAULT 0,  -- Number of coins used (if no item is offered)
    status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (offered_item_id) REFERENCES products(id),
    FOREIGN KEY (requested_item_id) REFERENCES products(id)
);
```

---

## 4. Trade Ownership Transfer Queries

When a trade is **accepted**, run the following queries to **transfer ownership** of the traded items.

### Transfer the Requested Item to the Sender

```sql
UPDATE products 
JOIN trades ON products.id = trades.requested_item_id
SET products.owner_id = trades.sender_id
WHERE trades.id = TRADE_ID;
```

### Transfer the Offered Item to the Receiver (If Applicable)

```sql
UPDATE products 
JOIN trades ON products.id = trades.offered_item_id
SET products.owner_id = trades.receiver_id
WHERE trades.id = TRADE_ID AND trades.offered_item_id IS NOT NULL;
```

(Replace `TRADE_ID` with the actual trade ID.)

---

## 5. Deduct Coins If Trading with Coins

If the trade involves **coins instead of an item**, deduct the coins from the sender and add them to the receiver.

### Deduct Coins from Sender

```sql
UPDATE users 
SET coins = coins - (SELECT coins_offered FROM trades WHERE id = TRADE_ID) 
WHERE id = (SELECT sender_id FROM trades WHERE id = TRADE_ID);
```

### Add Coins to Receiver

```sql
UPDATE users 
SET coins = coins + (SELECT coins_offered FROM trades WHERE id = TRADE_ID) 
WHERE id = (SELECT receiver_id FROM trades WHERE id = TRADE_ID);
```

(Replace `TRADE_ID` with the actual trade ID.)

---

## 6. Fetch Pending Trade Requests for a User

To retrieve all trade requests that are still pending for a particular user:

```sql
SELECT * FROM trades WHERE receiver_id = USER_ID AND status = 'pending';
```

(Replace `USER_ID` with the actual user ID.)

---

## 7. Accept or Decline a Trade

To **accept a trade**, update its status:

```sql
UPDATE trades SET status = 'accepted' WHERE id = TRADE_ID;
```

To **decline a trade**, mark it as declined:

```sql
UPDATE trades SET status = 'declined' WHERE id = TRADE_ID;
```

---

## Final Instructions for Teammates

✅ **Run all SQL commands above in the database.**  
✅ **Replace `TRADE_ID` and `USER_ID` with actual values when running queries.**  
✅ **After accepting a trade, run the appropriate `UPDATE` queries to transfer ownership.**``` 
