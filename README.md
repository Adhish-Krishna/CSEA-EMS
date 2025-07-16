# **CSEA - EMS**

> The Event Management System - Streamline your event planning and management

## Overview

Daddy-EMS is a comprehensive event management system designed to simplify the process of planning, organizing, and managing events. This system provides the tools you need to handle registrations, scheduling, attendee management, and more.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Git

## Installation

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

## Installing using Docker:

```bash
docker-compose build
```

```bash
docker-compose up -d
```

Here's a complete `README.md` file in markdown format that explains how to:

# DaddyEMS Logging Setup with Grafana + Loki

This project demonstrates logging in a Node.js application using **Winston**, with logs sent to **Grafana Loki** for monitoring and analysis.

- `loki`: Log aggregation system
- `grafana`: Visualization and dashboard UI

To get started with just the **logging dashboard**, you can run only **Loki** and **Grafana**.

### Start Loki and Grafana

```bash
docker-compose up -d loki grafana
```

This will start:

* **Loki** on [http://localhost:3100](http://localhost:3100/)
* **Grafana** on [http://localhost:3000](http://localhost:3000/)

>  Default Grafana credentials:
> 
> * **Username:** admin
> * **Password:** admin

---

### Connect Loki to Grafana

1. Go to [http://localhost:3000](http://localhost:3000/) and log in.
2. Click the ⚙️ **"Settings"** (left sidebar) → **"Data Sources"**
3. Click **"Add data source"**
4. Select **"Loki"**
5. Set:
   * ​**URL**​: `http://loki:3100`
6. Click **Save & Test** — it should show `Data source is working`.

---

## Viewing Logs

After your Node.js backend starts generating logs, you can view them in Grafana.

### Available Job Labels

| Job Name                       | Description                                               |
| -------------------------------- | ----------------------------------------------------------- |
| `daddy-ems-backend`        | Custom app-level logs using`logger.ts`                |
| `daddy-ems-backend-routes` | HTTP request/response logs using`loggerMiddleware.ts` |

### Sample Queries in Grafana Explore

#### View General App Logs (from `logger.ts`)

```logql
{job="daddy-ems-backend", app="daddy-ems"}
```

#### View HTTP Request Logs (from `express-winston`)

```logql
{job="daddy-ems-backend-routes", app="daddy-ems-requests"}
```

---

## TypeScript Setup

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

| Endpoint                  | Method | Purpose | To be done By  | progress |
| ------------------------- | ------ | ------- | -------------- | -------- |
| /auth/user/login          | POST   | -       | Adhish         | **✅**   |
| /auth/user/signup         | POST   | -       | Adhish         | **✅**   |
| /auth/user/logout         | POST   | -       | Adhish         | **✅**   |
| /auth/user/reset-password | POST   | -       | Adhish         | **✅**   |
| /auth/club/login          | POST   | -       | Adhish         | **✅**   |
| /auth/club/logout         | POST   | -       | Adhish         | **✅**   |
| /auth/global/login        | POST   | -       | Surya Prakash | **✅**   |
| /auth/global/logout       | POST   | -       | Surya Prakash | **✅**   |
| /auth/global/signup       | POST   | -       | Surya Prakash | **✅**   |

## Admin Routes

| Endpoint                        | Method | Purpose                               | To be done By  | Progress |
| ------------------------------- | ------ | ------------------------------------- | -------------- | -------- |
| /admin/create-event             | POST   | Admin creating a event                | Surya Prakash | **✅**   |
| /admin/events-history?club_id=1 | GET    | Fetching past events history by admin | Surya Prakash | **✅**   |
| /admin/add-members | POST   | Adding club members by admin | Surya Prakash | **✅**   |

## Event Routes

| Endpoint                           | Method | Purpose                                                                        | To be done by | Progress |
| ---------------------------------- | ------ | ------------------------------------------------------------------------------ | ------------- | -------- |
| /event/modify                      | POST   | Admin modifying the event details                                              | Chandru       |          |
| /event/stats/:eventId              | GET    | Fetching stats of particular event by admin                                    | Chandru       |          |
| /event/addPlaceHolders/:eventId    | POST   | Providing the details of winners and runners by club admin of particular event | Pravith       | **✅**   |
| /event/removePlaceHolders/:eventId | POST   | Providing the details of winners and runners by club admin of particular event | Pravith       | **✅**   |
| /event/attendance                  | POST   | Marking attendance for particular event by                                     | Darshan       | **✅**   |
| /event/register                    | POST   | User registering for a event                                                   | Darshan       | **✅**   |
| /event/teamInvite/:eventId         | POST   | User requesting other users to be in their team                                | Karthi        | **✅**   |
| /event/acceptTeamInvite/:eventId   | POST   | User accepting the other user's team invite                                    | Pravith       | **✅**   |

## User Routes

| Endpoint               | Method | Purpose                     | To be done by | progress |
| ---------------------- | ------ | --------------------------- | ------------- | -------- |
| /user/profile          | GET    | Fetching user details       | Darshan       | **✅**   |
| /user/registeredEvents | GET    | Fetching Registered Events  | Karthi        | **✅**   |
| /user/membership       | GET    | Fetching membership details | Pravith       | **✅**   |
| /user/invitations      | GET    | Fetching current Invitation | Darshan       | **✅**   |
| /user/feedback/        | POST   | Feedback submission by user | Adhish        | **✅**   |

## Global Admin Routes

| Endpoint           | Method | Purpose | To be done by | progress |
| ------------------ | ------ | ------- | ------------- | -------- |
| /global/createclub | POST   | -       | Surya Prakash      |    **✅**      |
| /global/addadmin   | POST   | -       | Surya Prakash       |      **✅**    |

