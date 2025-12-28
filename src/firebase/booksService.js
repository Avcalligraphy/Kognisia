import { database } from "./config.js";
import { ref, get, onValue, set, remove, push } from "firebase/database";

/**
 * Fetch books data from Firebase Realtime Database
 * @param {string} category - 'home', 'majalah', or 'galeri'
 * @returns {Promise<Array>} Array of books
 */
export const getBooks = async (category) => {
  try {
    const booksRef = ref(database, `${category}/books`);
    const snapshot = await get(booksRef);
    
    if (snapshot.exists()) {
      const booksData = snapshot.val();
      // Convert object to array and include the ID
      const booksArray = Object.keys(booksData).map((key) => ({
        id: key,
        ...booksData[key],
      }));
      return booksArray;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching ${category} books:`, error);
    return [];
  }
};

/**
 * Listen to real-time changes in books data
 * @param {string} category - 'home', 'majalah', or 'galeri'
 * @param {Function} callback - Callback function that receives the books array
 * @returns {Function} Unsubscribe function
 */
export const subscribeToBooks = (category, callback) => {
  const booksRef = ref(database, `${category}/books`);
  
  const unsubscribe = onValue(booksRef, (snapshot) => {
    if (snapshot.exists()) {
      const booksData = snapshot.val();
      // Convert object to array and include the ID
      const booksArray = Object.keys(booksData).map((key) => ({
        id: key,
        ...booksData[key],
      }));
      callback(booksArray);
    } else {
      callback([]);
    }
  }, (error) => {
    console.error(`Error listening to ${category} books:`, error);
    callback([]);
  });

  return unsubscribe;
};

/**
 * Add a new book to Firebase
 * @param {string} category - 'home', 'majalah', or 'galeri'
 * @param {Object} bookData - Book data { image, link, alt }
 * @returns {Promise<string>} The ID of the newly created book
 */
export const addBook = async (category, bookData) => {
  try {
    const booksRef = ref(database, `${category}/books`);
    const newBookRef = push(booksRef);
    
    const bookWithTimestamp = {
      ...bookData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await set(newBookRef, bookWithTimestamp);
    return newBookRef.key;
  } catch (error) {
    console.error(`Error adding book to ${category}:`, error);
    throw error;
  }
};

/**
 * Update an existing book in Firebase
 * @param {string} category - 'home', 'majalah', or 'galeri'
 * @param {string} bookId - The ID of the book to update
 * @param {Object} bookData - Updated book data { image, link, alt }
 * @returns {Promise<void>}
 */
export const updateBook = async (category, bookId, bookData) => {
  try {
    const bookRef = ref(database, `${category}/books/${bookId}`);
    
    const bookWithTimestamp = {
      ...bookData,
      updatedAt: new Date().toISOString(),
    };
    
    await set(bookRef, bookWithTimestamp);
  } catch (error) {
    console.error(`Error updating book ${bookId} in ${category}:`, error);
    throw error;
  }
};

/**
 * Delete a book from Firebase
 * @param {string} category - 'home', 'majalah', or 'galeri'
 * @param {string} bookId - The ID of the book to delete
 * @returns {Promise<void>}
 */
export const deleteBook = async (category, bookId) => {
  try {
    const bookRef = ref(database, `${category}/books/${bookId}`);
    await remove(bookRef);
  } catch (error) {
    console.error(`Error deleting book ${bookId} from ${category}:`, error);
    throw error;
  }
};

