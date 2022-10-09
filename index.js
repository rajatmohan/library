class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? "already read":"not read yet"}`;
    }
}

class Library {
    constructor() {
        this.library = [];
    }

    addBookToLibrary = (book) => {
        this.library.push(book)
    }
    
    removeBookFromLibrary = (bookTitle) => {
        this.library = this.library.filter(book => book.title !== bookTitle);
    }
    
    toggleBookReadStatus = (bookTitle) => {
        const index = this.library.findIndex(book => book.title === bookTitle); // 👉️ 1 
        if (index !== -1) {
            this.library[index].read = !this.library[index].read;
        }
    }
}

let myLibrary = new Library();






