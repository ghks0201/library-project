const library = document.querySelector(".library")
const p = document.querySelector("p")
const form = document.querySelector("form")
const submitButton = document.querySelector(".submitButton")


let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(newBook) {
    if (!newBook.read) {
        newBook.read = false
    }
    else {
        newBook.read = true
    }
    myLibrary.push(newBook)
}

function showLibrary(newBook) {
    const div = document.createElement("div")
    library.appendChild(div)
    div.classList.add("book")
    for (key in newBook) {
        if (key === "read") {
            const button = document.createElement("button")
            div.appendChild(button)
            button.classList.add("readButton")
            const checkBox = document.getElementById("read")
            if (checkBox.checked === true) {
                button.textContent = "Read"
            }
            else {
                button.textContent = "Not read"
            }
            button.addEventListener("click", () => {
                const bookIndex = button.parentElement.getAttribute("data-book-count") - 1
                if (button.textContent === "Read") {
                    myLibrary[bookIndex][read] = false
                    button.textContent = "Not read"
                }
                else {
                    myLibrary[bookIndex][read] = true
                    button.textContent = "Read"
                }
            })
        }
        else if (key === "pages") {
            const text = document.createElement("p")
            div.appendChild(text)
            text.textContent = `${newBook[key]} pages`
        }
        else {
            const text = document.createElement("p")
            div.appendChild(text)
            text.textContent = newBook[key]
        }
    }
}

function removeButton() {
    const books = document.querySelectorAll(".book")
    for (let i = 0; i < books.length; i++) {
        books[i].setAttribute("data-book-count", i + 1)
        if (books[i].childElementCount === 4) {
            const button = document.createElement("button")
            books[i].appendChild(button)
            if (button.parentElement === books[i]) {
                button.classList.add("removeButton")
                button.textContent = "Remove"
                const removeButton = document.querySelectorAll(".removeButton")
                removeButton[i].addEventListener("click", () => {
                    removeButton[i].parentElement.remove()
                    myLibrary.splice(i, 1)
                })
            }
        }
    }
}


form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newBook = Object.fromEntries(formData.entries())
    addBookToLibrary(newBook)
    showLibrary(newBook)
    removeButton()
})
