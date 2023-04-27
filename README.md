# LinkedWith

<a name="readme-top"></a>

Check out a live version of LinkedWith here:
[LinkedWith][render-url]

[render-url]: https://linkedwith.onrender.com

LinkedWith, a LinkedIn clone website, is a professional social networking platform that allows users to create profiles, connect with other professionals, and showcase their skills and experience.

### Technologies Used
#### Languages:
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)
#### Backend:
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-CA4245?style=for-the-badge)](https://www.sqlalchemy.org/)
[![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
#### Frontend:
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![React-Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/en/main)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)



## Features:
### Landing page
![home-page-demo-user]

[home-page-demo-user]: ./assets/landing-page.gif

## Posts
![posts]

[posts]: ./assets/posts.gif

## Comments
![comments]

[comments]: ./assets/comments.gif

## Likes
![likes]

[likes]: ./assets/likes.gif

## User profiles
![user-profiles]
![user-profiles2]

[user-profiles]: ./assets/profiles-read.gif
[user-profiles2]: ./assets/profiles-update.gif


## Getting started
1. Clone this repository

2. Respectively ```cd``` into the backend folder and the frontend foloder and install dependencies
      ```
      npm install
      ```

3. Run migration and seeders in the backend folder
      ```
      npx dotenv sequelize db:migrate
      npx dotenv sequelize db:seed:all
      ```

4. Respectively start the backend server and the front server
      ```
      npm start
      ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
