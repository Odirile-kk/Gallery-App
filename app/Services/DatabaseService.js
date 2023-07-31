import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydb.db");

// Function to create the table if it doesn't exist
const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT, location TEXT, address TEXT);",
      [],
      (_, result) => {
        console.log("Table created or already exists");
      },
      (_, error) => {
        console.error("Error creating table: ", error);
      }
    );
  });
};

// Function to insert a new record into the database
const saveDataToDatabase = (imageURI, location, address) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO images (uri, location, address) VALUES (?, ?, ?);", [imageURI.toString(), location, address],
      (_, result) => {
        console.log("Data saved successfully!");
      },
      (_, error) => {
        console.error("Error saving data: ", error);
      }
    );
  });
};

// Function to retrieve all data from the database
const getAllDataFromDatabase = (callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM images;", [],
        (_, result) => {
          callback(result.rows._array);
        },
        (_, error) => {
          console.error("Error retrieving data: ", error);
        }
      );
    });
  };
  
 // Function to delete a record from the database based on its ID
const deleteDataFromDatabase = (id, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM images WHERE id = ?;",
        [id],
        (_, result) => {
          console.log("Image deleted");
          // Optionally, you can call the callback to notify about the deletion completion
          if (callback) {
            callback();
          }
        },
        (_, error) => {
          console.error("Error deleting image: ", error);
        }
      );
    });
  };
  
  export { setupDatabase, saveDataToDatabase, getAllDataFromDatabase, deleteDataFromDatabase };