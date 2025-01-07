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
  overlay.classList.add('overlay');
  overlay.textContent = 'overlay';
  libraryListing.appendChild(overlay)

  let bookCard = document.createElement('div');
  bookCard.setAttribute('id', `bookCard${index + 1}`)
  bookCard.classList.add('bookCard');
  bookCard.textContent = 'card';
  libraryListing.appendChild(bookCard)

  libraryEntry.addEventListener('click', () => openBookCard(index))
}

//open book card
function openBookCard(index) {
  const overlay = document.getElementById(`overlay${index + 1}`);
  const bookCard = document.getElementById(`bookCard${index + 1}`);
  overlay.style.display = 'block';
  bookCard.style.display = 'block';

  //fade in overlay and card
  setTimeout(() => {
    overlay.style.opacity = 1;
    bookCard.style.opacity = 1;
  }, 100) //delay to allow for changes
}

//close book card
function closeBookCard(index) {
  const overlay = document.getElementById(`overlay${index + 1}`);
  const bookCard = document.getElementById(`bookCard${index + 1}`);
  overlay.style.opacity = 0;
  bookCard.style.opacity = 0;
  //why not display none??

  //delay to allow fade and then hide
  setTimeout(() => {
    overlay.style.display = 'none';
    bookCard.style.display = 'none';
  }, 200) //delay to allow for changes

}

document.querySelectorAll('.overlay').forEach((overlay, index) => {
  overlay.addEventListener('click', () => closeBookCard(index));
});
 


//populate card
//fade rest of screen - cant manage to fix overlay

//REMOVE HIDDEN CLASS TO SIMPLIFY AND MANAGE DISPLAY OF CARD WITH OPACITY AND DISPLAY