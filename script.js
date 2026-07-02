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
  <p><strong>Author:</strong> ${book.author}</p>
  <p><strong>Year:</strong> ${book.year}</p>
  <p><strong>Description:</strong> ${book.description}</p>
  <p><strong>ID:</strong> ${book.id}</p>
  `
  books.appendChild(bookElement)
}

const bookCount = document.querySelector('#bookCount')
bookCount.innerHTML = `Total Books: <strong>${myLibrary.length}</strong>`

const newBookBtn = document.createElement('button')
newBookBtn.textContent = 'Add New Book'
newBookBtn.id = 'bookBtn'
newBookBtn.addEventListener('click', () => {
  newBookBtn.disabled = true
  const bookElement = document.createElement('div')
  books.appendChild(bookElement)
  bookElement.classList.add('book')
  bookElement.classList.add('bookForm')
  bookElement.innerHTML = `
    <label for="titleInput">Title:</label>
    <input type="text" id="titleInput" placeholder="Title" required>
    <label for="authorInput">Author:</label>
    <input type="text" id="authorInput" placeholder="Author" required>
    <label for="yearInput">Year:</label>
    <input type="number" id="yearInput" placeholder="Year" required>
    <label for="descriptionInput">Description:</label>
    <textarea id="descriptionInput" placeholder="Description" required></textarea>
    <input type="button" id="saveBtn" value="Add Book">
    `
  const saveBtn = bookElement.querySelector('#saveBtn')
  saveBtn.addEventListener('click', () => {
    const title = bookElement.querySelector('#titleInput').value
    const author = bookElement.querySelector('#authorInput').value
    const year = bookElement.querySelector('#yearInput').value
    const description = bookElement.querySelector('#descriptionInput').value
    if (!title || !author || !year || !description) {
      bookElement.querySelector('#titleInput').style.borderColor = title ? '#ccc' : 'red'
      bookElement.querySelector('#authorInput').style.borderColor = author ? '#ccc' : 'red'
      bookElement.querySelector('#yearInput').style.borderColor = year ? '#ccc' : 'red'
      bookElement.querySelector('#descriptionInput').style.borderColor = description ? '#ccc' : 'red'
    } else {
      newBookBtn.disabled = false
      if (title && author && year && description) {
        addBookToLibrary(title, author, year, description)
        const newBook = myLibrary[myLibrary.length - 1]
        bookElement.innerHTML = `
          <h2 id='title'>${newBook.title}</h2>
          <p><strong>Author:</strong> ${newBook.author}</p>
          <p><strong>Year:</strong> ${newBook.year}</p>
          <p><strong>Description:</strong> ${newBook.description}</p>
          <p><strong>ID:</strong> ${newBook.id}</p>`
      }
      bookElement.classList.remove('bookForm')
    }
    bookCount.innerHTML = `Total Books: <strong>${myLibrary.length}</strong>`
  })
})

library.appendChild(newBookBtn)
