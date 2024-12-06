# Notes Application

A **Notes Management Application** built with modern technologies to create, update, delete, and manage personal notes. The application includes user authentication and leverages efficient state management, responsive UI, and seamless API integration.

## 🚀 Features

- **User Authentication**: Login/Logout functionality with secure token storage using `secureLocalStorage`.
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Responsive UI**: Built with Material-UI (`@mui/material`) for a clean, responsive design.
- **Dynamic Fetching**: Data fetching and caching using `RTK Query`.
- **Real-Time State Management**: Leveraging Redux Toolkit for global state management.
- **Error Handling**: Snackbar notifications for user feedback.
- **Smooth Navigation**: React Router for seamless client-side routing.
- **Deployment Ready**: Optimized for production with a scalable structure.

---

## 🛠 Tech Stack

### Frontend
- **React** with TypeScript: Component-based architecture for scalable and maintainable code.
- **Material-UI (MUI)**: For responsive and accessible UI components.
- **Redux Toolkit**: Simplified state management and side-effect handling.
- **RTK Query**: For efficient data fetching, caching, and state synchronization.
- **React Router**: Client-side routing for a seamless user experience.

### Backend
- **Express.js**: RESTful API design with token-based authentication using `JWT`.
- **MongoDB Atlas**: Cloud database for storing user data and notes.

---

## 🧑‍💻 Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Vixen-1/inotes-frontend.git
   cd inotes-frontend

2. **Install Dependencies**
   ```bash
    npm install

3. **Set Up Environment Variables**
    Set up envionments based on inotes-backend git repo

4. **Run the Application**
     ```bash
     npm run dev


## 🔑 Authentication

The app uses **JWT (JSON Web Token)** for secure user authentication.

### Workflow

1. **Login**
   - Users authenticate by providing their credentials.
   - A JWT token is generated and securely stored in `secureLocalStorage`.

   ```javascript
   secureLocalStorage.setItem("authToken", token);

2. **Api Requests***
- Before making any API requests, the app checks if a valid JWT token exists in `secure local storage`

## 📁 Project Structure

The project is organized as follows:

```plaintext
src/
├── assets/               # Static assets (images, icons, etc.)
├── components/           # Reusable React components
│   ├── Navbar/           # Navbar component
│   ├── Notes/            # Notes component
│   └── Layout.tsx        # Main layout and logic
├── pages/                # Page-level components
│   ├── Main/             # Main page components and logic
│   └── ErrorPage.tsx     # Error handling page
├── redux/                # Redux Toolkit store and slices
│   ├── ApiSlice.ts       # RTK Query API definitions
│   └── store.ts          # Redux store setup
├── styles/               # Custom MUI styling and global styles
│   └── overrides.ts      # MUI component overrides
├── utils/                # Utility functions and helpers
│   └── secureLocalStorage.ts # Secure storage for authentication tokens
├── App.tsx               # Root component
├── index.tsx             # Entry point
└── vite.config.ts        # Vite configuration for the project