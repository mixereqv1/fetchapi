// ZADANIE 1
const mainElement = document.querySelector('#main');
const baseURL = 'https://jsonplaceholder.typicode.com/';
const getUsers = async () => {
    try {
        const response = await fetch(`${baseURL}users`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`Fetch users error: ${err}`);
    }
}

const getUserPosts = async (userID) => {
    try {
        const response = await fetch(`${baseURL}posts?userId=${userID}`);
        const data = response.json();
        return data;
    } catch (err) {
        console.log(`Fetch posts error: ${err}`);
    }
}

getUsers().then((data) => {
    data.forEach((element) => {
        const {id,name,phone,email} = element;
        
        const contentArticle = document.createElement('article');
        const username = document.createElement('h2');
        const addressDiv = document.createElement('div');
        const emailLink = document.createElement('a');
        const showPostsButton = document.createElement('button');
        const userPostsList = document.createElement('ol');

        contentArticle.className = 'user__content';
        username.className = 'username';
        addressDiv.className = 'address';
        emailLink.className = 'address__mail';
        showPostsButton.className = 'show__posts';
        userPostsList.className = 'user__posts hidden';

        contentArticle.dataId = id;
        username.innerText = name;
        addressDiv.innerHTML = `Phone: ${phone} <br /> Email: `;
        emailLink.innerText = email;
        emailLink.href = `mailto:${email}`;
        showPostsButton.innerText = 'Show posts';
        userPostsList.id = `userposts${id}`;

        showPostsButton.addEventListener('click', (event) => {
            const postsList = document.querySelector(`#userposts${id}`);
            if(postsList.childElementCount == 0) {
                getUserPosts(id).then((data) => {
                    data.forEach((el) => {
                        const {title,body} = el;
                        
                        const listElement = document.createElement('li');
                        const postTitle = document.createElement('h3');
                        const postBody = document.createElement('div');
    
                        listElement.className = 'post';
                        postTitle.className = 'post__title';
                        postBody.className = 'post__body';
    
                        postTitle.innerText = title.toUpperCase();
                        postBody.innerText = body;
    
                        listElement.appendChild(postTitle);
                        listElement.appendChild(postBody);
                        userPostsList.appendChild(listElement);
                    })
                })
            }
            event.target.innerText == 'Show posts' ? event.target.innerText = 'Hide posts' : event.target.innerText = 'Show posts';
            postsList.classList.toggle('active');
        })



        // Po wrzuceniu postów rozwiń element .user-posts i zmień tekst na buttonie na "Hide posts".
        // Po ponownym kliknięciu w ten sam button, zwiń listę postów i zmień przycisk na "Show posts"

        addressDiv.appendChild(emailLink);
        contentArticle.appendChild(username);
        contentArticle.appendChild(addressDiv);
        contentArticle.appendChild(showPostsButton);
        contentArticle.appendChild(userPostsList);
        mainElement.appendChild(contentArticle);
    })
})