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

//  accept content and add it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  // create connection to db
  const textDb = await openDB('jate', 1);
  // create new transaction with readwrite privledges
  const tx = textDb.transaction('jate', 'readwrite');
  // open desired object store
  const store = tx.objectStore('jate');
  // use .add() method on store to pass in the content
  const request = store.add(content);
  // receive confirmation
  const result = await request;
  console.log(`Data saved to database: ${result}`)
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
