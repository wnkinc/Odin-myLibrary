const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = this.read === 'have read' ? 'have not read' : 'have read';
};

function addBookToLibrary(title, author, pages, read) {
    let userInput = new Book(title, author, pages, read);
    myLibrary.push(userInput);
    printLibrary(myLibrary); // Update the table with the new book
}

function printLibrary(library) {
    tbody.innerHTML = ''; // Clear the table body before re-adding rows
    for (let i = 0; i < library.length; i++) {
        const book = library[i];
        const tr = document.createElement('tr');
        
        // Create a cell for buttons
        const tdButtons = document.createElement('td');
        
        // Create a remove button for each book
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.dataset.index = i; // Store the index of the book in the data attribute
        removeButton.addEventListener('click', () => {
            removeBookFromLibrary(i);
        });
        
        // Create a toggle button for changing read status
        const toggleButton = document.createElement('button');
        toggleButton.textContent = book.read === 'have read' ? 'Mark as Unread' : 'Mark as Read';
        toggleButton.dataset.index = i;
        toggleButton.addEventListener('click', () => {
            toggleReadStatus(i);
        });
        
        // Append buttons to the buttons cell
        tdButtons.appendChild(removeButton);
        tdButtons.appendChild(toggleButton);
        tr.appendChild(tdButtons);
        
        // Add book details to the remaining columns
        for (let key in book) {
            if (key !== 'info' && key !== 'toggleReadStatus') { // Exclude the info method and toggleReadStatus
                const td = document.createElement('td');
                td.textContent = book[key];
                tr.appendChild(td);
            }
        }
        
        tbody.appendChild(tr);
    }
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1); // Remove the book from the array
    printLibrary(myLibrary); // Update the table
}

function toggleReadStatus(index) {
    const book = myLibrary[index];
    book.toggleReadStatus(); // Toggle the book's read status
    printLibrary(myLibrary); // Update the table
}

const tbody = document.querySelector('tbody');
const button = document.querySelector('.addBook');
const form = document.querySelector('form');
const resetButton = document.createElement('button');

resetButton.textContent = 'Add Another Book';
resetButton.style.display = 'none'; // Initially hidden
form.appendChild(resetButton);

button.addEventListener('click', () => {
    button.style.display = 'none';
    
    // Create input fields
    const inputs = ['Title', 'Author', 'Number of pages', 'Have read?'];
    inputs.forEach((placeholder) => {
        const input = document.createElement('input');
        input.placeholder = placeholder;
        form.appendChild(input);
    });

    // Create submit button
    const addButton = document.createElement('button');
    addButton.textContent = 'Submit';
    form.appendChild(addButton);

    addButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Collect data from form inputs
        const formData = Array.from(form.querySelectorAll('input')).map(input => input.value);
        const [title, author, pages, read] = formData;

        // Add the new book to the library
        addBookToLibrary(title, author, pages, read);

        // Clear inputs and show the original button
        form.querySelectorAll('input').forEach(input => input.remove());
        addButton.remove();
        button.style.display = 'block';
        resetButton.style.display = 'none';
    });
});

resetButton.addEventListener('click', () => {
    // Show the original button and hide the reset button
    button.style.display = 'block';
    resetButton.style.display = 'none';

    // Remove any remaining input fields and submit button
    form.querySelectorAll('input').forEach(input => input.remove());
});
