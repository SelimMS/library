const library = document.querySelector('.library')
const books = document.querySelector('.books')

const myLibrary = [];

function Book(title, author, year, description) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.description = description
  this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, year, description) {
  const newBook = new Book(title, author, year, description)
  myLibrary.push(newBook)
}
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'A novel about the American dream.')
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 1960, 'A novel about racial injustice in the Deep South.')
addBookToLibrary('1984', 'George Orwell', 1949, 'A dystopian novel about totalitarianism and surveillance.')  

for (let i = 0; i < myLibrary.length; i++) {
  const book = myLibrary[i]
  const bookElement = document.createElement('div')
  bookElement.classList.add('book')
  bookElement.innerHTML = `
  <h2 id='title'>${book.title}</h2>
  <p>Author: ${book.author}</p>
  <p>Year: ${book.year}</p>
  <p>Description: ${book.description}</p>
  <p>ID: ${book.id}</p>
  `
  books.appendChild(bookElement)
}

const bookCount = document.querySelector('#bookCount')
bookCount.textContent = `Total Books: ${myLibrary.length}`

const newBookBtn = document.createElement('button')
newBookBtn.textContent = 'Add New Book'
newBookBtn.id = 'bookBtn'
newBookBtn.addEventListener('click', () => {
  const title = prompt('Enter the title of the book:')
  const author = prompt('Enter the author of the book:')
  const year = prompt('Enter the year of publication:')
  const description = prompt('Enter a brief description of the book:')
  addBookToLibrary(title, author, year, description)
  const newBook = myLibrary[myLibrary.length - 1]
  const bookElement = document.createElement('div')
  bookElement.classList.add('book')
  bookElement.innerHTML = `
    <h2 id='title'>${newBook.title}</h2>
    <p>Author: ${newBook.author}</p>
    <p>Year: ${newBook.year}</p>
    <p>Description: ${newBook.description}</p>
    <p>ID: ${newBook.id}</p>
  `
  books.appendChild(bookElement)
  bookCount.textContent = `Total Books: ${myLibrary.length}`
})

library.appendChild(newBookBtn)
