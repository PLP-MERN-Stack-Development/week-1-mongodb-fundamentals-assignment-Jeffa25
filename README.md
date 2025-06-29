Step 1: Open Command Prompt or Terminal 

Step 2: Start the MongoDB Shell
  In the Command Prompt or terminal, type the following command and press Enter: mongo
  This command connects you to the MongoDB shell. You should see a prompt that looks like >, indicating that you are in the MongoDB shell.

Step 3: Select Your Database
  Switch to Your Database:
  If you have already created a database called plp_bookstore, switch to it by typing:  use plp_bookstore

Step 4: Run the Scripts
     Insert Books Using insert_books.js
    Exit the MongoDB Shell:

    Type exit and press Enter to leave the MongoDB shell.
    Navigate to the Directory:

    Use the Command Prompt or terminal to navigate to the directory where your insert_books.js file is located. For example: cd C:\Users\Admin\Desktop\plp\week-1-mongodb-fundamentals-assignment-Jeffa25

    Run the Script:

Execute the script using Node.js by typing: node insert_books.js
  This will insert the book documents into your books collection.
4.2 Run Aggregation Queries
Reopen the MongoDB Shell:

Type mongo again to connect to the MongoDB shell.
Switch to Your Database:

Again, switch to your database: use plp_bookstore

Run Aggregation Queries:

You can now run the aggregation queries provided in Task 4. For example, to calculate the average price of books by genre:
      db.books.aggregate([
       {
         $group: {
           _id: "$genre",
           averagePrice: { $avg: "$price" }
         }
       },
       {
         $project: {
           genre: "$_id",
           averagePrice: 1,
           _id: 0
         }
       }
     ]).pretty()
     

4.3. Create Indexes
Create Index on title:

To create an index on the title field, run:    

     db.books.createIndex({ title: 1 })
     
Create Compound Index on author and published_year:

To create a compound index, run:  

db.books.createIndex({ author: 1, published_year: 1 })

Use explain() to Demonstrate Performance:

To see the performance before and after creating indexes, run: 
     db.books.find({ title: "1984" }).explain("executionStats")
     
Then run the same query again after creating the index to compare the results.
