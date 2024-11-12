# Angular Quiz Application

## Project Overview

This project is a full-stack quiz application designed to showcase my proficiency in both front-end and back-end technologies. It features a frontend built using Angular 18, using standalone components for maintainable and lightweight architecture. The backend is in Django, with SQLite as the database. The application uses JWT for authentication.

[![Version](https://img.shields.io/badge/version-1.0.0.alpha.1-blue.svg)](https://semver.org)

### Key Features:
**Angular 18:** Leveraging the latest features and improvements in Angular.

**Standalone Components:** Simplified component setup, eliminating the need for NgModules.

**Lazy Loading:** Optimized performance by loading modules only when needed.

**Clean UI:** A modern, minimalistic user interface focusing on usability and aesthetics.

**Responsive Design:**
Optimized for various devices and screen sizes.

## Table of Contents
- [About](#project-overview)
- [Project setup](#setting-up-the-project)
- [Screenshots](#screenshots)
- [Limitations](#limitation-of-the-current-version)
- [Contributors](#contributors)

---

## Setting Up the Project

### Prerequisites
To run this project, ensure you have the following installed:
- **Node.js 20+**
- **Angular 18**

### Installation
**Clone the Repository**:

    git clone https://github.com/Madhav-77/angular-quiz-app.git
    cd quiz-app
    
**Install dependencies:**:
    
    npm install

**Run the application**:

    ng serve

## Screenshots

[Link to directory](https://github.com/Madhav-77/angular-quiz-app/tree/main/quiz-app/app-screenshots)

## Limitation of the current version
Any quiz can be given only once per any user, to give the quiz again, entries for that quiz & user must be deleted using ```/api/quizzes/<quiz_id>/users/<user_id>/delete/``` api, it will require ```quiz_id``` & ```user_id``` parameters.

## Contributors

- [@madhavtrivedi](https://www.madhavtrivedi.com/)