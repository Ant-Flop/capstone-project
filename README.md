# Capstone Project Template

This is a simple web project that utilizes HTML, SCSS, and JavaScript. It includes a responsive image carousel and other interactive elements.

## Project Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

-   **Node.js** (LTS version)
-   **npm** (comes with Node.js)

### Installation

1. **Clone the repository:**

    ```sh
    git clone <your-repo-url>
    cd <your-repo-folder>
    ```

2. **Install dependencies:**
   After navigating to your project directory, run the following command to install the necessary dependencies:
    ```sh
    npm install
    ```

### Development

1. **Start the development server:**
   To launch the local development server, run the following command:

    ```sh
    npm start
    ```

    This will start a local server, and your project will be available at [http://localhost:3000](http://localhost:3000).

2. **Compiling SCSS to CSS:**
   You can compile your SCSS files to CSS by running:

    ```sh
    npm run compile
    ```

3. **Running linters:**
   To ensure code quality, you can run linters for both JavaScript and SCSS:
    ```sh
    npm run lint
    ```

### Project Structure

The project structure is as follows:

```
/src
    /assets           # Images and other files used in the project
    /css              # Compiled CSS files
    /data             # Data files in JSON
    /scripts          # JavaScript files
    /styles           # SCSS files
    index.html        # Main HTML file
    gallery.html      # Gallery page
    about-us.html     # About Us page
    contacts.html     # Contacts page
    course.html       # Course page
```

-   **SCSS Files:** Located in `/src/styles`, these are the source files for styling. They are compiled into the `/src/css` folder.
-   **JavaScript Files:** The JavaScript files are located in `/src/scripts`. Ensure they are properly linked in the HTML files.
-   **HTML Files:** The main HTML files are located in the root directory (`index.html`, `/gallery.html`, etc.).

### Deployment

To deploy the project to a live server, follow the specific instructions for your hosting provider. Make sure to compile the SCSS into CSS before deploying the project.
