# **Daddy - EMS**

> The Event Management System - Streamline your event planning and management

## 📖 Overview

Daddy-EMS is a comprehensive event management system designed to simplify the process of planning, organizing, and managing events. This system provides the tools you need to handle registrations, scheduling, attendee management, and more.

## 🔧 Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Git

## 💻 Installation

1. Clone the repository
   
   ```bash
   git clone https://github.com/Adhish-Krishna/Daddy-EMS.git
   cd Daddy-EMS
   ```
2. Install dependencies
   
   ```bash
   npm install
   ```
3. Generate the client library using Prisma
   
   ```bash
   npx prisma generate
   ```
4. Start the development server
   
   ```bash
   npm run dev
   ```

## 🔍 TypeScript Setup

This project uses TypeScript for type safety and better developer experience. Here's how to get started with TypeScript:

### TypeScript Configuration

The project comes with a pre-configured `tsconfig.json` file. If you need to customize it, refer to the [TypeScript Documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

### Note

While installing dependencies, you must install it in the following form:

- npm install <package_name>
- npm install --save-dev @types/<package_name>

One for running the compiled js code and another for the typescript code to use the type definitions of the package.

### Compiling TypeScript

```bash
npm run build
npm run start
```

This will compile TypeScript files into JavaScript in the `dist/` directory and runs the compiled js code.

# API Endpoints

After defining the routes, add tickbox in respective rows in the table

Daddy-Logger - Darshan
Docker-compose for PostGres - Adhish
Trigger setup for DB - Karthi

## Auth Routes

| Endpoint                  | Method | Purpose | To be done By |
| ------------------------- | ------ | ------- | ------------- |
| /auth/user/login          | POST   | -       |      Adhish        |
| /auth/user/signup         | POST   | -       |      Adhish         |
| /auth/user/logout         | POST   | -       |          Adhish     |
| /auth/user/reset-password | POST   | -       |       Adhish        |
| /auth/club/login          | POST   | -       |       Adhish        |
| /auth/club/logout         | POST   | -       |        Adhish       |

## Event Routes

| Endpoint                         | Method | Purpose                                                                        | To be done by |
| -------------------------------- | ------ | ------------------------------------------------------------------------------ | ------------- |
| /event/create                    | POST   | Admin creating a event                                                         |  SU rya Prakash |
| /event/modify                    | POST   | Admin modifying the event details                                              |  Chandru |
| /event/stats/:eventId            | GET    | Fetching stats of particular event by admin                                    |    Chandru   |
| /event/addPlaceHolders/:eventId  | POST   | Providing the details of winners and runners by club admin of particular event |         Pravith   |
| /event/attendance/:eventId       | POST   | Marking attendance for particular event by admin                               |            Darshan   |
| /event/history                   | GET    | Fetching past events history by admin                                          |        SU rya Prakash       |
| /event/register/:eventId         | POST   | User registering for a event                                                   |     Darshan      |
| /event/teamInvite/:eventId       | POST   | User requesting other users to be in their team                                |    Karthi   |
| /event/acceptTeamInvite/:eventId | POST   | User accepting the other user's team invite                                    |    Pravith |

## User Routes

| Endpoint               | Method | Purpose                     | To be done by |
| ---------------------- | ------ | --------------------------- | ------------- |
| /user/profile          | GET    | Fetching user details       |           Darshan   |
| /user/registeredEvents | GET    | Fetching Registered Events  |           Karthi    |
| /user/membership       | GET    | Fetching membership details |     Pravith          |
| /user/invitations | GET | Fetching current Invitation | Darshan |
| /user/submit/feedback/:eventId  | POST   | Feedback submission by user                                                    |           Adhish    |

