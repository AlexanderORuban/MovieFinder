# MovieFinder

## Description

MovieFinder is a simple yet helpful application that allows you to organize movies by genre and rating, store them in a database, and receive personalized recommendations based on your search results.

## Live Application

You can view the running application at [MovieFinder](http://aruban.greenriverdev.com/).

## Features

- **Submit Movie Recommendations:** Users can submit their favorite movies, which will be added to the database.
- **View All Recommendations:** Users can see all submitted movie recommendations.
- **Search Movies:** Users can search for movies by name and rating.
- **Get Genre-based Recommendations:** Users can get movie suggestions based on genre and rating.
- **Responsive Design:** The app is fully responsive and works across desktop and mobile devices.

## Technologies Used

- **Node.js** - Server-side JavaScript framework
- **Express.js** - Web framework for routing
- **EJS** - Templating engine for rendering views
- **MariaDB/MySQL** - Database for storing movie recommendations
- **npm** - Package manager for dependencies
- **GitHub** - For version control and code repository

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AlexanderORuban/MovieFinder
    ```
2. Navigate to the project folder:
    ```bash
    cd movie-recommendation-app
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Set up your environment variables:

    - Copy the contents of the `.env.example` file to a new file named `.env`:
      ```bash
      cp .env.example .env
      ```

    - Open the `.env` file in a text editor and fill in the required values (such as your database connection details and other environment-specific settings).

    - Save the `.env` file. The application will use these variables during runtime.

5. Set up your database:

    - Create a MySQL database and run the SQL script to create the required database and tables:

      - Open MySQL Workbench or another SQL client.

      - Run the `create-database-recommendations.sql` script (located in the project directory) to set up the database and table for storing movie recommendations.

6. Start the server:
    ```bash
    npm start
    ```

7. Open your browser and go to `http://localhost:your-specified-port-number` to view the app.

## Contributions

### Alexander Ruban
- **Backend Development:**
  - Set up the project, created the GitHub repository, and established the base project structure.
  - Implemented routes for handling movie search requests and movie recommendations.
  - Integrated the EJS templating engine to render dynamic views for displaying movie recommendations and search results.
  - Managed environment variables for database connections and application configurations.

- **Feature Implementation:**
  - Developed the forms for submitting movie recommendations and searching for movies.
  - Implemented JavaScript for client-side validation and interaction with the server.
  - Assisted in improving the UI for better user experience.

- **Database Integration:**
  - Created and managed the connection to the MariaDB/MySQL database using environment variables.
  - Ensured proper querying and data manipulation for storing and retrieving movie recommendations and search requests.

- **Deployment & Testing:**
  - Deployed the application on both a local and digital server and conducted testing of functionality. 
  - Inserted additional test data into the database script for better testing coverage.

### Felix Chen
- **Backend Development:**
  - Set up the database, created the `movies` table, and added initial data via the SQL script.
  - Implemented routes for handling movie submissions, confirming successful submissions, and viewing all recommendations.
  - Implemented form handling, validation, and interaction with the database.

- **Frontend Development:**
  - Designed the user interface, ensuring it is responsive and user-friendly across devices, particularly for the home page.
  - Styled pages using CSS to enhance layout and responsiveness.

- **Quality Assurance:**
  - Tested frontend and backend features to ensure correct functionality and smooth user flow.
  - Assisted with bug fixes and improvements to UI components.