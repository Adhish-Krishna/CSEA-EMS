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

3. Start the development server
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