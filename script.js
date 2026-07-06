const library = document.querySelector('.library')
const books = document.querySelector('.books')

const myLibrary = [];

function Book(title, author, year, description, status) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.description = description;
  this.status = status;
  this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, year, description, status) {
  const newBook = new Book(title, author, year, description, status)
  myLibrary.push(newBook)
}

function deleteBook(id) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === id) {
      myLibrary.splice(i, 1)
      books.removeChild(books.children[i])
    }
  }
}

addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'A novel about the American dream.', 'read')
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 1960, 'A novel about racial injustice in the Deep South.', 'notRead')
addBookToLibrary('1984', 'George Orwell', 1949, 'A dystopian novel about totalitarianism and surveillance.', 'reading')  

for (let i = 0; i < myLibrary.length; i++) {
  const book = myLibrary[i]
  const bookElement = document.createElement('div')
  bookElement.classList.add('book')
  bookElement.classList.add(book.status)
  bookElement.innerHTML = `
  <h2 id='title'>${book.title}</h2>
  <div class="bookAttributes">
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Year:</strong> ${book.year}</p>
    <p><strong>Description:</strong> ${book.description}</p>
    <p><strong>ID:</strong> ${book.id}</p>
  </div>
  <div class="bookButtons">
    <button class="deleteBtn" id="${book.id}" title="Delete Book"><iconify-icon icon="mdi:delete-circle-outline" height="30px" style="color: dimgrey;"></iconify-icon></button>
    <button class="statusBtn" id="${book.id}" value="read" title="Mark as Read"><iconify-icon icon="mdi:checkbox-marked-circle-outline" height="30px" style="color: green;"></iconify-icon></button>
    <button class="statusBtn" id="${book.id}" value="reading" title="Mark as Reading"><iconify-icon icon="mdi:dots-horizontal-circle-outline" height="30px" style="color: goldenrod;"></iconify-icon></button>
    <button class="statusBtn" id="${book.id}" value="notRead" title="Mark as Not Read"><iconify-icon icon="mdi:circle-off-outline" height="30px" style="color: red;"></iconify-icon></button>
  </div>
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
    <input type="number" id="yearInput" placeholder="Year" min="0" max="2026" required>
    <label for="status">Status:</label>
    <select id="status" name="status">
      <option value="read">Completed</option>
      <option value="notRead">Plan to read</option>
      <option value="reading">Reading</option>
    </select>
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
    const status = bookElement.querySelector('#status').value
    if (!title || !author || !year || !description) {
      bookElement.querySelector('#titleInput').style.borderColor = title ? '#ccc' : 'red'
      bookElement.querySelector('#authorInput').style.borderColor = author ? '#ccc' : 'red'
      bookElement.querySelector('#yearInput').style.borderColor = year ? '#ccc' : 'red'
      bookElement.querySelector('#descriptionInput').style.borderColor = description ? '#ccc' : 'red'
    } else {
      newBookBtn.disabled = false
      if (title && author && year && description) {
        addBookToLibrary(title, author, year, description, status)
        const newBook = myLibrary[myLibrary.length - 1]
        bookElement.innerHTML = `
          <h2 id='title'>${newBook.title}</h2>
          <div class="bookAttributes">
            <p><strong>Author:</strong> ${newBook.author}</p>
            <p><strong>Year:</strong> ${newBook.year}</p>
            <p><strong>Description:</strong> ${newBook.description}</p>
            <p><strong>ID:</strong> ${newBook.id}</p>
          </div>
          <div class="bookButtons">
            <button class="deleteBtn" id="${newBook.id}" title="Delete Book"><iconify-icon icon="mdi:delete-circle-outline" height="30px" style="color: dimgrey;"></iconify-icon></button>
            <button class="statusBtn" id="${newBook.id}" value="read" title="Mark as Read"><iconify-icon icon="mdi:checkbox-marked-circle-outline" height="30px" style="color: green;"></iconify-icon></button>
            <button class="statusBtn" id="${newBook.id}" value="reading" title="Mark as Reading"><iconify-icon icon="mdi:dots-horizontal-circle-outline" height="30px" style="color: goldenrod;"></iconify-icon></button>
            <button class="statusBtn" id="${newBook.id}" value="notRead" title="Mark as Not Read"><iconify-icon icon="mdi:circle-off-outline" height="30px" style="color: red;"></iconify-icon></button>
          </div>
          `
      }
      bookElement.classList.remove('bookForm')
      bookElement.classList.add(status)
      deleteB()
      changeStatus()
    }
    bookCount.innerHTML = `Total Books: <strong>${myLibrary.length}</strong>`
  })
})


function deleteB() {
  const deleteButtons = document.querySelectorAll('.deleteBtn')
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const bookId = button.id
      deleteBook(bookId)
      bookCount.innerHTML = `Total Books: <strong>${myLibrary.length}</strong>`
    })
  })
}


function changeStatus() {
  const statusButtons = document.querySelectorAll('.statusBtn')
  statusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const bookId = button.id
      const newStatus = button.value
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookId) {
          myLibrary[i].status = newStatus
          books.children[i].classList.remove('read', 'notRead', 'reading')
          books.children[i].classList.add(newStatus)
        }
      }
    })
  })
}

deleteB()
changeStatus()

library.appendChild(newBookBtn)


