let accessToken = null;
let refreshToken = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:9006/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        accessToken = data.accessToken;
        refreshToken = data.refreshToken;
        showAuthenticatedContent();
    })
    .catch(error => console.error('Login error:', error));
}

function getBooks() {
    console.log('Get Books button clicked');
    fetch('http://localhost:9006/books', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Books:', data);
        renderBooks(data); 
    })
    .catch(error => console.error('Get Books error:', error));
}

function renderBooks(books) {
    const booksContainer = document.getElementById('books-container');

    if (!booksContainer) {
        console.error('Error: Unable to find element with id "books-container".');
        return;
    }

    booksContainer.innerHTML = '';

    console.log('Books length:', books.length);

    if (books.length === 0) {
        booksContainer.innerHTML = '<p>No books available.</p>';
    } else {
        console.log('Rendering books');
        const list = document.createElement('ul');

        books.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = `Title: ${book.title}, Author: ${book.author}`;
            list.appendChild(listItem);
        });

        booksContainer.appendChild(list);
    }
}

function logout() {
    fetch('http://localhost:9006/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
    })
    .then(response => response.text())
    .then(data => {
        accessToken = null;
        refreshToken = null;
        hideAuthenticatedContent();
        console.log('Logout:', data);
    })
    .catch(error => console.error('Logout error:', error));
}

function showAuthenticatedContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('authenticated-container').style.display = 'block';
}

function hideAuthenticatedContent() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('authenticated-container').style.display = 'none';
}
