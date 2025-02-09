// TO DOs  
// edit button to card
// css at the end

const myLibrary = [];

//dummy data
addBookToLibrary('The Hobbit', 'JRR Tolkien', 295, false)
addBookToLibrary('Cracking the Coding Interview', 'G McDowell', 977, false)
addBookToLibrary('Hamnet', 'M O\'Farrell', 372, true)
addBookToLibrary('El Arte de No Amargarse la Vida ', 'R Santandreu', 368, true)

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

function addBookToLibrary (title, author, pages, read) {
  const book = new Book (title, author, pages, read);
  myLibrary.push(book);
}

const libraryListing = document.querySelector('#list-container');
myLibrary.forEach((book, index) => insertEntry(book, index))
//INDEX in forEach passed as parameter to 1) create unique IDs 2) avoid scoping issues

  
function insertEntry (book, index) {
  let libraryEntry = document.createElement('div');
  libraryEntry.classList.add('new-entry');
  libraryEntry.textContent = book.title;
  libraryListing.appendChild(libraryEntry)
  
  let overlay = document.createElement('div');
  overlay.setAttribute('id', `overlay${index + 1}`)
  overlay.classList.add('overlay');
  //overlay.textContent = 'overlay';
  libraryListing.appendChild(overlay)

  let bookCard = document.createElement('div');
  bookCard.setAttribute('id', `bookCard${index + 1}`)
  bookCard.classList.add('bookCard');
  libraryListing.appendChild(bookCard)

  libraryEntry.addEventListener('click', () => openBookCard(index))

  const deleteBookButton = document.createElement('button');
  deleteBookButton.textContent = 'Delete book'
  deleteBookButton.classList.add('delete-book-button');
 deleteBookButton.dataset.index = index;
libraryEntry.appendChild(deleteBookButton)
  deleteBookButton.addEventListener('click', (e) => {
    const buttonClickedIndex = e.target.dataset.index;
    console.log(buttonClickedIndex)
    // const bookToRemove = buttonClicked.closest('.new-entry');
    // console.log(bookToRemove)
    // bookToRemove.remove();
    updateLibrary(buttonClickedIndex)
  })

  function rerenderLibrary () {
    libraryListing.innerHTML = '';
    myLibrary.forEach((book, index) => insertEntry(book, index))
  }

  function updateLibrary (index) {
    myLibrary.splice(index,1);  
    rerenderLibrary();
  }
}

function openBookCard(index) {
  const overlay = document.getElementById(`overlay${index + 1}`);
  const bookCard = document.getElementById(`bookCard${index + 1}`);
  overlay.style.display = 'block';
  bookCard.style.display = 'block';

  overlay.addEventListener('click', () => closeBookCard(index));

  //avoid duplicates
  if (!bookCard.dataset.loaded) {
  const template = document.getElementById('bookCardTemplate');
  const cardContent = template.content.cloneNode(true);

  cardContent.querySelector('.book-title').textContent = myLibrary[index].title
  cardContent.querySelector('.book-author').textContent = 'Author: ' + myLibrary[index].author
  cardContent.querySelector('.book-pages').textContent = 'Pages: ' + myLibrary[index].pages
  cardContent.querySelector('.book-read').textContent = 'Read?: ' + (myLibrary[index].read === true? 'Yes' : 'No')
  

  bookCard.appendChild(cardContent);

  //using bookCard rather than document, we use non unique ID as selector and will always refer to the 1st ID in the doc. using bookcard changes
  const closeButton = bookCard.querySelector('.close-card-button');
  closeButton.addEventListener('click', () => closeBookCard(index))

  //bit of code that avoids same card duplication, sets data-loaded in html dynamically
  bookCard.dataset.loaded = 'true'
  }

  //fade in overlay and card
  setTimeout(() => {
    overlay.style.opacity = 1;
    bookCard.style.opacity = 1;
  }, 50) //delay to allow for changes
}

function closeBookCard(index) {
  const overlay = document.getElementById(`overlay${index + 1}`);
  const bookCard = document.getElementById(`bookCard${index + 1}`);
  overlay.style.opacity = 0;
  bookCard.style.opacity = 0;
  
  //delay to allow fade and then hide
  setTimeout(() => {
    overlay.style.display = 'none';
    bookCard.style.display = 'none';
  }, 200) 
}

document.querySelector('.add-book-button').addEventListener('click', () => openNewBookForm())

let areaOverlay = document.createElement('div');
function openNewBookForm() {
  form.parentElement.style.display = 'block';
  areaOverlay.setAttribute('id', `areaOverlay`)
  areaOverlay.classList.add('area-overlay');
  header.appendChild(areaOverlay)
}

function closeNewBookForm() {
  form.parentElement.style.display = 'none'
  form.reset();
  areaOverlay.classList.remove('area-overlay');
 }

const form = document.querySelector('#newBookForm');//select form rather than div container otherwise no access to info

form.addEventListener('submit', (e) => {
   e.preventDefault(); //stop page reload

  const title = form.querySelector('input[name="title"]').value;
  const author = form.querySelector('input[name="author"]').value;
  const pages = form.querySelector('input[name="pages"]').value;
  const read = form.querySelector('input[name="read"]').checked

  addBookToLibrary(title, author, pages, read);

  insertEntry(myLibrary[myLibrary.length-1], myLibrary.length-1)

  closeNewBookForm();
})


//BUGS
//after deleting one entry, hover pink doesn't work if youy click somewhere
//also, book cards dont open
//delete button deletes 1st elem of array



