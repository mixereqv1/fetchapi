const searchInput = document.querySelector('#searchForm input');
const searchButton = document.querySelector('#searchForm button');
const bookList = document.querySelector('#bookList');
const baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
const getBook = async (title) => {
    try {
        const response = await fetch(`${baseURL}${title}`);
        const data = response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
searchButton.addEventListener('click', (event) => {
    let value = searchInput.value;
    getBook(value).then((data) => {
        const {items} = data;
        items.forEach(element => {
            const {volumeInfo} = element;
            const {authors,title,description,categories} = volumeInfo;

            const bookInfo = document.createElement('div');
            const bookTitle = document.createElement('h3');
            const bookAuthor = document.createElement('h4');
            const bookCategories = document.createElement('h5');
            const bookDescription = document.createElement('h4');

            bookInfo.className = 'book-info';
            bookTitle.className = 'margin';
            bookCategories.className = 'margin';

            bookTitle.innerText = title;
            if(authors != undefined) authors.forEach(el => bookAuthor.innerText += `${el} `);
            if(categories != undefined) bookCategories.innerText = `Kategoria: ${categories[0]}`;
            if(description!= undefined) bookDescription.innerText = description;

            bookInfo.appendChild(bookTitle);
            bookInfo.appendChild(bookAuthor);
            bookInfo.appendChild(bookCategories);
            bookInfo.appendChild(bookDescription);
            bookList.appendChild(bookInfo);
        })
    })
})