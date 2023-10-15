# 🎬 Movie Explorer using TMDB API
A React-based web application that provides an intuitive movie browsing experience. Users can search for movies by keywords and explore an organized gallery. Clicking on individual movies will offer detailed information about the movie.

## ✨ Features
- **Movie Search**: Enables users to search for movies using keywords, and sort results by attributes.
- **Movie Gallery**: Displays movies in a visually pleasing manner.
- **Detailed View**: Upon clicking a movie, users are presented with detailed information about the movie.

## 🛠 Skills, Libraries, and Tools Used
- **React**: The main library used for building the user interface of the application.
- **TypeScript**: A superset of JavaScript, adding static types for better type-checking and tooling.
- **Axios**: A promise-based HTTP client for making asynchronous requests to the TMDB API.
- **React Router**: Enables navigation between different components and handles routing for the app.
- **SCSS/CSS**: For styling the components and making the UI responsive.
- **ES6+**: Utilizes modern JavaScript features for cleaner and more efficient code.
- **Webpack**: For bundling and optimizing the front-end assets.
- **Node.js & npm**: For environment setup, package management, and running the development server.

## TMDB API Usage
TMDB API: This application uses the [TMDB API](https://www.themoviedb.org/?language=en-US) to fetch movie data.
### An example API Key based request looks like:
```
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11?api_key=43f32466ca1ce72ff63dd88e6eeebdcd'
```
### Finding Data
Reference: [TMDB Documentation](https://developer.themoviedb.org/docs/finding-data)
* `/search`: Text-based search by providing a query string and get the closest match(original, translated and alternative names and titles).[Search & Query For Details](https://developer.themoviedb.org/docs/search-and-query-for-details)
* `/discover`: Search based on filters or definable values like ratings, certifications or release dates. Details refer to [Here](https://developer.themoviedb.org/reference/discover-movie).
* `/find`: Find data with exsiting external IDs.(i.e. IMDB ID of a movie, TV show or person).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\


### `npm test`

Launches the test runner in the interactive watch mode.\


### `npm run build`

Builds the app for production to the `build` folder.\

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.