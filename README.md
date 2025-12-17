# 📚 Library Management System

A full-stack Library Management System built with **.NET 8 Web API** backend and **React + TypeScript + Vite** frontend. This application allows users to manage a collection of books with full CRUD (Create, Read, Update, Delete) functionality.

## ✨ Features

- **Add Books** - Add new books with title, author, and description
- **View Books** - Browse all books in the library
- **View Book Details** - See detailed information about each book
- **Edit Books** - Update book information
- **Delete Books** - Remove books from the library
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Clean interface built with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **.NET 8** - Web API framework
- **Entity Framework Core** - ORM for database operations
- **SQLite** - Lightweight database
- **C#** - Programming language

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router** - Client-side routing

## 📁 Project Structure

```
Library Management System/
├── Backend/                          # .NET 8 Web API
│   ├── Controller/
│   │   └── BooksController.cs        # API endpoints for books
│   ├── Data/
│   │   └── LibraryDbContext.cs       # Entity Framework DbContext
│   ├── Exceptions/
│   │   └── ValidationException.cs    # Custom exceptions
│   ├── Middleware/
│   │   └── ErrorHandlingMiddleware.cs # Global error handling
│   ├── Models/
│   │   ├── ApiResponse.cs            # Standardized API response
│   │   └── Book.cs                   # Book entity model
│   ├── Properties/
│   │   └── launchSettings.json       # Launch configuration
│   ├── appsettings.json              # App configuration
│   ├── appsettings.Development.json  # Development configuration
│   ├── Librar.csproj                 # Project file
│   ├── Librar.sln                    # Solution file
│   └── Program.cs                    # Application entry point
│
├── frontend/                         # React + Vite frontend
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookCard.tsx          # Book card component
│   │   │   ├── BookForm.tsx          # Book form component
│   │   │   ├── Layout.tsx            # Layout wrapper
│   │   │   └── Modal.tsx             # Modal component
│   │   ├── pages/
│   │   │   ├── AddBookPage.tsx       # Add new book page
│   │   │   ├── BookDetailsPage.tsx   # Book details page
│   │   │   ├── EditBookPage.tsx      # Edit book page
│   │   │   ├── HomePage.tsx          # Home page with book list
│   │   │   └── LandingPage.tsx       # Landing page
│   │   ├── store/
│   │   │   └── bookStore.ts          # Zustand store for state
│   │   ├── types/
│   │   │   └── book.ts               # TypeScript types
│   │   ├── App.tsx                   # Main App component
│   │   ├── index.css                 # Global styles
│   │   └── main.tsx                  # React entry point
│   ├── eslint.config.js              # ESLint configuration
│   ├── index.html                    # HTML template
│   ├── package.json                  # npm dependencies
│   ├── postcss.config.js             # PostCSS configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   └── vite.config.ts                # Vite configuration
│
└── README.md                         # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/yourusername/library-management-system.git
cd "Library Management System"
```

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

4. The API will be available at: `http://localhost:5184`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at: `http://localhost:5173`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/{id}` | Get a book by ID |
| POST | `/api/books` | Create a new book |
| PUT | `/api/books/{id}` | Update an existing book |
| DELETE | `/api/books/{id}` | Delete a book |

### Request/Response Example

**Create a Book (POST /api/books)**

Request Body:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel set in the Jazz Age."
}
```

Response:
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel set in the Jazz Age."
  }
}
```

## 🧪 Running in Development

To run both backend and frontend simultaneously:

**Terminal 1 - Backend:**
```bash
cd Backend
dotnet run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 📦 Building for Production

### Backend
```bash
cd Backend
dotnet publish -c Release
```

### Frontend
```bash
cd frontend
npm run build
```


⭐ If you found this project helpful, please give it a star!
