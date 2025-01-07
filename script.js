const myLibrary = [];

//constructor
function Book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}`
  }
}

//function to add to library
function addBookToLibrary (title, author, pages, read) {
  const book = new Book (title, author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'JRR Tolkien', 295, false)
addBookToLibrary('Cracking the Coding Interview', 'G McDowell', 977, false)
addBookToLibrary('Hamnet', 'M O\'Farrell', 372, true)
addBookToLibrary('El Arte de No Amargarse la Vida ', 'R Santandreu', 368, true)

console.log(myLibrary)

const libraryListing = document.querySelector('#list-container');

//loop to display library content
//INDEX available in forEach needs to be passed as parameter to 1) create unique IDs 2) avoid scoping issues
myLibrary.forEach((book, index) => 
   insertEntry(book, index))
  

//function to add array books into screen
function insertEntry (book, index) {
  let libraryEntry = document.createElement('div');
  libraryEntry.classList.add('new-entry');
  libraryEntry.textContent = book.title;
  libraryListing.appendChild(libraryEntry)
  
  let overlay = document.createElement('div');
  overlay.setAttribute('id', `overlay${index + 1}`)
  overlay.classList.add('overlay', 'hidden');
  overlay.textContent = 'overlay';
  libraryListing.appendChild(overlay)

  let bookCard = document.createElement('div');
  bookCard.setAttribute('id', `bookCard${index + 1}`)
  bookCard.classList.add('bookCard', 'hidden');
  bookCard.textContent = 'card';
  libraryListing.appendChild(bookCard)

  libraryEntry.addEventListener('click', () => openBookCard(index))
}

//open book card
function openBookCard(index) {
 const overlay = document.getElementById(`overlay${index + 1}`);
  const bookCard = document.getElementById(`bookCard${index + 1}`);
  overlay.classList.toggle('hidden');
  bookCard.classList.toggle('hidden');
  bookCard.style.opacity = 
  bookCard.style.opacity === "1"? "0": "1";
}

//add event listener to close card
//populate card
//fade rest of screen - cant manage to fix overlay

