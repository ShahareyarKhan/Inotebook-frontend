# INotebook

iNotebook is a web-based application where users can create, view, update, and delete their personal notes. The application features authentication and dark mode, providing a simple and efficient user experience.

## Features

- **Authentication**: Users must sign in or sign up to create and manage notes.
- **Notes Management**: Users can add, view, edit, and delete notes.
- **Dark Mode**: Users can toggle between light and dark themes.
- **Profile**: Users can view their profile with details like name and email.
- **Responsive Design**: The UI is responsive across different device sizes.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js (REST API)
- **Database**: MongoDB (Hosted on MongoDB Atlas)
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel

## Installation and Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/iNotebook.git
    cd iNotebook
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables for backend API and JWT secret.

4. Run the application:

    ```bash
    npm start
    ```

The app will run on `http://localhost:3000`.

## API Endpoints

- **GET /api/auth/user**: Fetch logged-in user information.
- **POST /api/notes/addnote**: Add a new note.
- **GET /api/notes/fetchallnotes**: Fetch all notes of the logged-in user.
- **PUT /api/notes/updatenote/:id**: Update a specific note.
- **DELETE /api/notes/deletenote/:id**: Delete a specific note.

## Project Structure

```bash
src/
│
├── Components/
│   ├── Header.js
│   ├── Notes.js
│   ├── HomePage.js
│   ├── Both.js
│
├── App.js
├── index.js
└── App.css
