# Task Manager Application

## Description
A simple task management application built with Node.js and MySQL.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/afaqIbrar/taskApp_BE.git
    cd <repository-directory>
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```

3. **Install MySQL:**

    Follow the instructions for your operating system to install MySQL from the [official website](https://www.mysql.com/).

4. **Set up environment variables:**

    Create a `.env` file in the root directory of the project and add the following variables:
    Create a db name taskManager in mysql
    ```env
    PORT=5000
    JWT_SECRET=randomSecret
    HOST=<yoursqldbhost>
    DB_USERNAME=<db username>
    PASSWORD="<db password>"
    DATABASE="taskManager"
    JWT_TTL=15d
    APP_PATH=http://localhost:3000  #APP Path for frontend in case of cors issue
    ```

5. **Start the application:**

    ```sh
    npm start
    ```

## Usage

- The application will be running at `http://localhost:5000`.
- You can access the API endpoints as per the defined routes.

## Environment Variables

- `PORT`: The port on which the server will run.
- `JWT_SECRET`: Secret key for JWT token generation.
- `HOST`: MySQL host (usually `localhost`).
- `DB_USERNAME`: MySQL database username.
- `PASSWORD`: MySQL database password.
- `DATABASE`: Name of the MySQL database.
- `JWT_TTL`: Time to live for the JWT tokens (e.g., `15d` for 15 days).
- `APP_PATH`: The base URL for the application.

## Contributing

Feel free to fork this repository and contribute by submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
