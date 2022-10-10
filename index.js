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

const createBookCard = (book) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card");

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardAction = document.createElement("div");
    cardAction.classList.add("card-action");
    
    cardTitle.textContent = book.title;
    
    
    cardBody.innerHTML = `By <strong>${book.author}</strong> containing ${book.pages} Pages`;
    
    
    const bookReadStatusToggleBtn = document.createElement('button')
    bookReadStatusToggleBtn.classList.add("switch");
    if(book.read) {
        bookReadStatusToggleBtn.classList.add("read");
    }
    bookReadStatusToggleBtn.textContent = `${book.read? "Already Read": "Not Read Yet"}`;

    bookReadStatusToggleBtn.addEventListener('click', (event)=> {
        book.read = !book.read;
        event.target.textContent = `${book.read? "Already Read": "Not Read Yet"}`;
        bookReadStatusToggleBtn.classList.toggle("read");
    });

    const bookDeleteBtn = document.createElement('button')
    bookDeleteBtn.textContent = 'Delete';
    bookDeleteBtn.classList.add("delete");
    bookDeleteBtn.addEventListener('click', (event)=> {
        myLibrary.removeBookFromLibrary(book.title);

        const bookCard = event.target.parentElement.parentElement;
        bookCard.parentElement.removeChild(bookCard);
        console.log(myLibrary.library);
    });

    cardAction.appendChild(bookReadStatusToggleBtn);
    cardAction.appendChild(bookDeleteBtn);


    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(cardAction);
    return cardDiv;
};

const displayBooks = ()=> {
    const bookListDiv = document.querySelector(".grid-container");

    myLibrary.library.forEach(book => bookListDiv.appendChild(createBookCard(book)));
}

let myLibrary = new Library();

let b1 = new Book("The hobbit", "gf", 34, true);
let b2 = new Book("Let us C", "Dennis Ritchie ", 32, false);
let b3 = new Book("dgfgfdg  gfgb", "dgfgdbgjhd ", 54, false);
let b4 = new Book("dgfgffhdg  gfgb", "dgfhgdbgjhd ", 45, false);

myLibrary.addBookToLibrary(b1);
myLibrary.addBookToLibrary(b2);
myLibrary.addBookToLibrary(b3);
myLibrary.addBookToLibrary(b4);

displayBooks();







