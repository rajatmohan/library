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
    myLibrary.library.forEach(book => bookListDiv.appendChild(createBookCard(book)));
}

let myLibrary = new Library();

//displayBooks();
const bookListDiv = document.querySelector(".grid-container");
const addBookBtn = document.querySelector("#addBookButton");
const addBookDiv = document.querySelector("#addBookDiv");
const closeAddBookFromBtn = document.querySelector(".close");
const addBookForm = document.querySelector("#addBookForm");

const closeBookModel = () => {
    addBookDiv.style.display = "none";
}

addBookBtn.addEventListener("click", ()=> { 
    addBookDiv.style.display = 'block';
});

closeAddBookFromBtn.addEventListener("click", ()=> {
    closeBookModel();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    console.log(event.target);
    if (event.target == addBookDiv) {
        closeBookModel();
    }
} 

addBookForm.addEventListener("submit", (event)=> {
    event.preventDefault();

    const bookTitle = document.querySelector("#addBookTitle").value;
    const bookAuthor = document.querySelector("#addBookAuthor").value;
    const bookRead = document.querySelector("#addBookRead").checked;
    const bookPages = document.querySelector("#addBookPages").value;

    if(bookTitle && bookAuthor && !isNaN(bookPages)) {
        let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
        myLibrary.addBookToLibrary(newBook);
        bookListDiv.appendChild(createBookCard(newBook));
        event.target.reset();
        closeBookModel();
    }
    else {
        const errorMessage = document.querySelector("#errorMessage");
        errorMessage.classList.add("active");
        errorMessage.children[0].textContent = "Fill all fields";
    }
})






