import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the Database");

  //Create a connection to the database and include the version that we want to use
  const contactDb = await openDB("contact", 1);

  //Create a transaction with the database and data priviledges i.e "readwrite/readonly" use tx for transaction.
  const tx = contactDb.transaction("contact", "readwrite");

  //Open the objet store, i.e. where the data will be stored for the offline
  const store = tx.objectStore("contact");

  //Use the .add() Method on the store to pass in the content
  //***************** */Determine what we are going to store*****************************
  const request = store.add({name: name, email: email});

  //Get confirmation of the request
  const result = await request;
  console.log("Data has been saved to the database", result);

  //Log error if one occurs 
  console.error('getDb not implemented');
}


initdb();
