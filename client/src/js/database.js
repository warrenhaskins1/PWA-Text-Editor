import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

/////////////////////////////////////////////////////////////////////////////////
//Get All
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (value) => {
  console.log("GET from the Database");

  //Create a connection to the database and include the version that we want to use
  const jateDb = await openDB("jate", 1);

  //Create a transaction with the database and data priviledges i.e "readwrite/readonly" use tx for transaction.
  const tx = jateDb.transaction("jate", "readwrite");

  //Open the object store, i.e. where the data will be stored for the offline
  const store = tx.objectStore("jate");

  //Get all the data from the database
  const request = store.getAll();

  //Get confirmation of the request
  const result = await request;
  console.log("Data has been saved to the database", result);

  //Log error if one occurs
  console.error("getDb not implemented");
};

///////////////////////////////////////////////////////////////////////////////////////
//Put Update
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.log("PUT/update to the database");

  //Create a connection to the database and include the version that we want to use
  const jateDb = await openDB("jate", 1);

  //Create a transaction with the database and data priviledges i.e "readwrite/readonly" use tx for transaction.
  const tx = jateDb.transaction("jate", "readwrite");

  //Open the object store, i.e. where the data will be stored for the offline
  const store = tx.objectStore("jate");

  //Use the add.() to pass the content
  const request = store.add({ id: id, value: value  });

  //Get confirmation of the request
  const result = await request;
  console.log("Data has been UPDATED to the database", result);

  console.error("putDb not implemented");
};

initdb();
