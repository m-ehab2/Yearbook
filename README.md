# Yearbook

Yearbook is a web application designed to connect ITI alumni and aspiring students, serving as a central hub for networking, information, and career opportunities in the field of technology.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

## Introduction

Yearbook aims to empower ITI alumni and aspiring students alike by providing a platform for networking, sharing information, and exploring career opportunities in the technology sector. Whether you're a seasoned professional or just starting your journey in tech, Yearbook offers a range of features to help you connect, learn, and grow.

## Features

- **User Profiles**: Users can create profiles to showcase their skills, experiences, and projects.
- **Networking**: Connect with other users, including alumni, students, and industry professionals.
- **Posts**: Share updates, articles, and insights with the community.
- **Responsive Design**: Yearbook is designed to work seamlessly across devices of all sizes.

## Technologies Used

Yearbook is built using the following technologies:

- **Frontend**:
  - React
  - Material-UI for styling and UI components
  - React Router for client-side routing
  - React Toastify for user notifications
  - Firebase Authentication for user authentication
- **Backend**:
  - Firebase Firestore for the database
  - Firebase Storage for storing user-generated content
- **Deployment**:
  - Firebase Hosting for hosting the app
  - GitHub Actions for continuous integration and deployment

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up Firebase:
   - Create a Firebase project in the Firebase console.
   - Copy your Firebase configuration from Firebase console into `firebaseConfig` object in `src/firebaseConfig.ts`.
4. Run the app locally using `npm start`.

## Usage

Once the app is set up, you can:

- Sign up for an account or log in if you already have one.
- Explore user profiles, posts, events, and job listings.
- Connect with other users and engage in discussions.
- Share your own updates, articles, and insights with the community.
- Apply for job listings or internship opportunities.

## Deployment

To deploy the app to production:

1. Set up Firebase Hosting for your Firebase project.
2. Run `npm run build` to build the production-ready version of the app.
3. Deploy the app using Firebase Hosting commands (`firebase deploy`).
