// ---------- Our data: a simple array of book objects ----------
// (Just like the "car" object from lecture-6, but many of them in an array.)
// This lives in memory only, so it resets when you refresh the page.
let books = [
    { title: "Harry Potter", author: "J.K. Rowling", year: 1997, status: "Available" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, status: "Borrowed" },
    { title: "Clean Code", author: "Robert Martin", year: 2008, status: "Available" },
    // { title: "Clean Code", author: "Robert Martin", year: 2008, status: "Available" },
];

// editIndex tells us which book we are editing.
// -1 means we are adding a new book (not editing).
let editIndex = -1;

// ---------- Grab the input boxes ----------
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const statusInput = document.getElementById("status");
const formTitle = document.getElementById("formTitle");
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("search");

// ---------- READ: show all books in the table ----------
function showBooks() {
    bookList.innerHTML = ""; // clear the table first

    // What the user typed in the search box (lowercase so it matches easily)
    const search = searchInput.value.toLowerCase();

    let shownCount = 0; // how many rows we actually drew

    for (let i = 0; i < books.length; i++) {
        const book = books[i];

        // Skip this book if it does NOT match the search text
        const matches =
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);

        if (!matches) {
            continue; // go to the next book
        }

        // Pick the right badge colour based on the status
        let badgeClass = "badge-available";
        if (book.status === "Borrowed") {
            badgeClass = "badge-borrowed";
        }

        // Give each cover a different colour (cover-0 ... cover-4) so
        // the shelf looks varied. % keeps the number between 0 and 4.
        const coverClass = "cover-" + (i % 5);

        // The first letter of the title, shown big on the cover.
        const initial = book.title.charAt(0).toUpperCase();

        bookList.innerHTML += `
            <div class="book-card">
                <div class="book-cover ${coverClass}">
                    <span class="book-initial">${initial}</span>
                    <span class="badge ${badgeClass}">${book.status}</span>
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <p class="book-year">Published ${book.year}</p>
                </div>
                <div class="book-actions">
                    <button class="action-btn edit-btn" onclick="editBook(${i})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteBook(${i})">Delete</button>
                </div>
            </div>
        `;

        shownCount++;
    }

    // If nothing matched, show a friendly message
    if (shownCount === 0) {
        bookList.innerHTML = `<div class="empty">No books found.</div>`;
    }

    // Show how many books are in the catalogue (in the panel header)
    document.getElementById("catalogueCount").innerText = shownCount + " titles";

    updateStats();
}

// ---------- Update the three stat cards at the top ----------
function updateStats() {
    let available = 0;
    let borrowed = 0;

    for (let i = 0; i < books.length; i++) {
        if (books[i].status === "Available") {
            available++;
        } else {
            borrowed++;
        }
    }

    document.getElementById("totalCount").innerText = books.length;
    document.getElementById("availableCount").innerText = available;
    document.getElementById("borrowedCount").innerText = borrowed;
}

// ---------- CREATE + UPDATE: runs when "Save Book" is clicked ----------
function saveBook() {
    // Make one book object from the inputs
    const book = {
        title: titleInput.value,
        author: authorInput.value,
        year: yearInput.value,
        status: statusInput.value,
    };

    // Simple check: don't save empty title or author
    if (book.title === "" || book.author === "") {
        alert("Please enter a title and an author.");
        return;
    }

    if (editIndex === -1) {
        // CREATE: add the new book to the array
        books.push(book);
    } else {
        // UPDATE: replace the book we were editing
        books[editIndex] = book;
        editIndex = -1;
        formTitle.innerText = "Add a Book";
    }

    clearForm();
    showBooks();
}

// ---------- Load a book into the form so we can edit it ----------
function editBook(i) {
    const book = books[i];

    titleInput.value = book.title;
    authorInput.value = book.author;
    yearInput.value = book.year;
    statusInput.value = book.status;

    editIndex = i; // remember which book we are editing
    formTitle.innerText = "Edit Book";
}

// ---------- DELETE: remove one book from the array ----------
function deleteBook(i) {
    const sure = confirm("Delete this book?");
    if (sure) {
        books.splice(i, 1); // remove 1 book at position i
        showBooks();
    }
}

// ---------- Empty the input boxes ----------
function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    statusInput.value = "Available";
}

// ---------- Show the books when the page opens ----------
showBooks();
