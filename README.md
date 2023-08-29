# Admin Panel Documentation

## Technical Stack
- **Frontend:** Angular 14, TypeScript, Bootstrap, HTML, SCSS, NgRX, Karma/Jasmine
- **Backend:** ASP.NET Core, MSSQL

## Description
The Admin Panel is a web application developed to efficiently manage various tasks through a user-friendly interface. It combines frontend and backend technologies to provide functionalities such as employee management, customer information display, to-do list tracking using a kanban-style interface, and appointment viewing.

## Functionalities

### /Customers
- Displays customer information.

### /Employees
- Lists employees along with their details.
- Allows addition, editing, and deletion of employee records.
- Employs NgRX for global state management.

### /Kanban
- Tracks to-do lists with drag-and-drop capabilities.
- Provides task manipulation options: add, edit, and delete.

## Frontend Deployment
The frontend of the Admin Panel is deployed on Firebase. Visit the site [here](https://admin-panel-ng-95171.web.app/).

## Backend Deployment
The backend of the Admin Panel is deployed on FreeAspHosting.net.

## Implementation Details

### Frontend
- Developed using Angular 2+, TypeScript, Bootstrap, HTML, and SCSS.
- Utilized NgRX for state management.
- Integrated Karma/Jasmine for frontend testing.

### Backend
- Developed using ASP.NET Core, providing a robust backend infrastructure.
- Used Entity Framework for database management.
- Implemented REST API endpoints for frontend functionality.

## Usage

1. Navigate to the respective routes (/Customers, /Employees, /Kanban) via the navigation menu.
2. Manage employees using the provided options, with changes reflected in the NgRX-managed global state.
3. In the Kanban section, perform tasks like task creation, column movement, and editing/deletion.

## Notes

- The Admin Panel streamlines tasks and enhances productivity for employee and customer management, to-do lists, and appointments.
- The modular structure ensures user-friendly administration and efficient task handling.
