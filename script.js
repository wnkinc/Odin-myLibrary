// DOM elements
const tbody = document.querySelector('tbody');
const addNewBookButton = document.querySelector('.addBook');
const form = document.querySelector('form');

const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Toggle read status on the Book prototype
Book.prototype.toggleReadStatus = function() {
    this.read = this.read === 'have read' ? 'have not read' : 'have read';
};

// Add a new book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = createBook(title, author, pages, read);
    myLibrary.push(newBook);
    updateLibraryDisplay();
}

// Create a new book instance
function createBook(title, author, pages, read) {
    return new Book(title, author, pages, read);
}

// Update the display of the library
function updateLibraryDisplay() {
    clearLibraryDisplay();
    myLibrary.forEach((book, index) => addBookToDisplay(book, index));
}

// Clear the current library display
function clearLibraryDisplay() {
    tbody.innerHTML = '';
}

// Add a book to the display table
function addBookToDisplay(book, index) {
    const tr = document.createElement('tr');
    const tdButtons = createTableButtons(index, book.read);
    tr.appendChild(tdButtons);
    Object.keys(book).forEach(key => {
        if (key !== 'toggleReadStatus') {
            tr.appendChild(createTableCell(book[key]));
        }
    });
    tbody.appendChild(tr);
}

// Create buttons for each book row
function createTableButtons(index, readStatus) {
    const tdButtons = document.createElement('td');
    tdButtons.appendChild(createRemoveButton(index));
    tdButtons.appendChild(createToggleReadButton(index, readStatus));
    return tdButtons;
}

// Create a table cell with text content
function createTableCell(content) {
    const td = document.createElement('td');
    td.textContent = content;
    return td;
}

// Create a button to remove a book
function createRemoveButton(index) {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.dataset.index = index;
    removeButton.addEventListener('click', () => removeBookFromLibrary(index));
    return removeButton;
}

// Create a button to toggle the read status of a book
function createToggleReadButton(index, readStatus) {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = readStatus === 'have read' ? 'Mark as Unread' : 'Mark as Read';
    toggleButton.dataset.index = index;
    toggleButton.addEventListener('click', () => toggleReadStatus(index));
    return toggleButton;
}

// Remove a book from the library
function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    updateLibraryDisplay();
}

// Toggle the read status of a book
function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    updateLibraryDisplay();
}

// Initialize the form for adding a new book
function initializeAddBookForm() {
    addNewBookButton.style.display = 'none';  // Hide the add book button
    const formFields = ['Title', 'Author', 'Number of pages', 'Have read?'];
    formFields.forEach(placeholder => createFormInput(placeholder));
    createSubmitBookButton();
}

// Create input fields for the form
function createFormInput(placeholder) {
    const input = document.createElement('input');
    input.placeholder = placeholder;
    form.appendChild(input);
}

// Create a submit button for the form
function createSubmitBookButton() {
    const submitBookButton = document.createElement('button');
    submitBookButton.textContent = 'Submit';
    form.appendChild(submitBookButton);
    submitBookButton.addEventListener('click', handleBookSubmission);
}

// Handle the submission of a new book
function handleBookSubmission(event) {
    event.preventDefault();
    const formData = getFormData();
    addBookToLibrary(...formData);
    resetAddBookForm();
}

// Get data from form inputs
function getFormData() {
    return Array.from(form.querySelectorAll('input')).map(input => input.value);
}

// Reset the form after submission
function resetAddBookForm() {
    form.querySelectorAll('input').forEach(input => input.remove());
    form.querySelector('button').remove();
    addNewBookButton.style.display = 'block';  // Show the add book button again
}

// Event listener for initializing the add book form
addNewBookButton.addEventListener('click', initializeAddBookForm);
