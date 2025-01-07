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
myLibrary.forEach((book) => 
   insertEntry(book.title))
  

//function to add array books into screen
function insertEntry (book) {
  let libraryEntry = document.createElement("div");
  libraryEntry.textContent = book;
  libraryListing.appendChild(libraryEntry)
}



