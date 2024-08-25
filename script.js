class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = this.read === 'have read' ? 'have not read' : 'have read';
    }
}

class Library {
    constructor() {
        this.books = [];
        this.tbody = document.querySelector('tbody');
    }

    addBook(book) {
        this.books.push(book);
        this.updateDisplay();
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.updateDisplay();
    }

    toggleReadStatus(index) {
        this.books[index].toggleReadStatus();
        this.updateDisplay();
    }

    updateDisplay() {
        this.clearDisplay();
        this.books.forEach((book, index) => this.addBookToDisplay(book, index));
    }

    clearDisplay() {
        this.tbody.innerHTML = '';
    }

    addBookToDisplay(book, index) {
        const tr = document.createElement('tr');
        const tdButtons = this.createTableButtons(index, book.read);
        tr.appendChild(tdButtons);
        Object.keys(book).forEach(key => {
            if (key !== 'toggleReadStatus') {
                tr.appendChild(this.createTableCell(book[key]));
            }
        });
        this.tbody.appendChild(tr);
    }

    createTableButtons(index, readStatus) {
        const tdButtons = document.createElement('td');
        tdButtons.appendChild(this.createRemoveButton(index));
        tdButtons.appendChild(this.createToggleReadButton(index, readStatus));
        return tdButtons;
    }

    createTableCell(content) {
        const td = document.createElement('td');
        td.textContent = content;
        return td;
    }

    createRemoveButton(index) {
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.dataset.index = index;
        removeButton.addEventListener('click', () => this.removeBook(index));
        return removeButton;
    }

    createToggleReadButton(index, readStatus) {
        const toggleButton = document.createElement('button');
        toggleButton.textContent = readStatus === 'have read' ? 'Mark as Unread' : 'Mark as Read';
        toggleButton.dataset.index = index;
        toggleButton.addEventListener('click', () => this.toggleReadStatus(index));
        return toggleButton;
    }
}

class BookForm {
    constructor(library) {
        this.library = library;
        this.addNewBookButton = document.querySelector('.addBook');
        this.form = document.querySelector('form');

        this.addNewBookButton.addEventListener('click', () => this.initializeForm());
    }

    initializeForm() {
        this.addNewBookButton.style.display = 'none';
        const formFields = ['Title', 'Author', 'Number of pages', 'Have read?'];
        formFields.forEach(placeholder => this.createFormInput(placeholder));
        this.createSubmitBookButton();
    }

    createFormInput(placeholder) {
        const input = document.createElement('input');
        input.placeholder = placeholder;
        this.form.appendChild(input);
    }

    createSubmitBookButton() {
        const submitBookButton = document.createElement('button');
        submitBookButton.textContent = 'Submit';
        this.form.appendChild(submitBookButton);
        submitBookButton.addEventListener('click', (event) => this.handleBookSubmission(event));
    }

    handleBookSubmission(event) {
        event.preventDefault();
        const formData = this.getFormData();
        const newBook = new Book(...formData);
        this.library.addBook(newBook);
        this.resetForm();
    }

    getFormData() {
        return Array.from(this.form.querySelectorAll('input')).map(input => input.value);
    }

    resetForm() {
        this.form.querySelectorAll('input').forEach(input => input.remove());
        this.form.querySelector('button').remove();
        this.addNewBookButton.style.display = 'block';
    }
}

// Initialize the library and form
const myLibrary = new Library();
const bookForm = new BookForm(myLibrary);
