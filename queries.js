TASK 1
Creating a database -  use plp_bookstore

Create a Collection -  db.createCollection("books")

TASK 2
To find all books in a specific genre -   db.books.find({ genre: "Fiction" }).pretty()

To find books published after a specific year -   db.books.find({ published_year: { $gt: 1950 } }).pretty()

To find books by a specific author -   db.books.find({ author: "George Orwell" }).pretty()

To update the price of a specific book -    
    db.books.updateOne(
    { title: "1984" },
    { $set: { price: 12.99 } }
)

To delete a book by its title -   db.books.deleteOne({ title: "Moby Dick" }) 

TASK 3
To find books that are in stock and published after 2010 -
db.books.find(
{ in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1 } // Projection to return only title, author, and price
).pretty()

To sort the books by price in ascending order - 
db.books.find(
{},
  { title: 1, author: 1, price: 1 } // Projection
).sort({ price: 1 }) // Ascending order
.pretty()

To sort the books by price in descending order - 
db.books.find(
{},
  { title: 1, author: 1, price: 1 } // Projection
).sort({ price: -1 }) // Descending order
.pretty()

limit and skip for Pagination - 
db.books.find(
{},
  { title: 1, author: 1, price: 1 } // Projection
).limit(5) // Limit to 5 books
.pretty()

To display the second page of 5 books -
db.books.find(
{},
  { title: 1, author: 1, price: 1 } // Projection
).skip(5).limit(5) // Skip first 5, limit to next 5
.pretty()


TASK 4
To calculate the average price of books grouped by genre - 
db.books.aggregate([
{
    $group: {
      _id: "$genre", // Group by genre
      averagePrice: { $avg: "$price" } // Calculate average price
    }
},
{
    $project: {
      genre: "$_id", // Rename _id to genre
      averagePrice: 1, // Include averagePrice in the output
      _id: 0 // Exclude the default _id field
    }
}
]).pretty()

To find the author with the most books - 
db.books.aggregate([
{
    $group: {
      _id: "$author", // Group by author
      bookCount: { $sum: 1 } // Count the number of books for each author
    }
},
{
    $sort: { bookCount: -1 } // Sort by book count in descending order
},
{
    $limit: 1 // Limit to the top author
},
{
    $project: {
      author: "$_id", // Rename _id to author
      bookCount: 1, // Include bookCount in the output
      _id: 0 // Exclude the default _id field
    }
}
]).pretty()

To group books by publication decade and count them - 
db.books.aggregate([
{
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } }, // Group by decade
      bookCount: { $sum: 1 } // Count the number of books in each decade
    }
},
{
    $project: {
      decade: { $multiply: ["$_id", 10] }, // Convert to actual decade (e.g., 1980)
      bookCount: 1, // Include bookCount in the output
      _id: 0 // Exclude the default _id field
    }
},
{
    $sort: { decade: 1 } // Sort by decade in ascending order
}
]).pretty()


TASK 5
To create an index on the title field for faster searches - db.books.createIndex({ title: 1 })

To create a compound index on the author and published_year fields - db.books.createIndex({ author: 1, published_year: 1 })

To demonstrate the performance improvement with your indexes - 
BEFORE CREATING indexes 
Run a Query Without Indexes -   db.books.find({ title: "1984" }).explain("executionStats")

After Creating Indexes
Run the Same Query Again -    db.books.find({ title: "1984" }).explain("executionStats")

Test the Compound Index
Run a Query Using the Compound Index -    db.books.find({ author: "George Orwell", published_year: 1949 }).explain("executionStats")
