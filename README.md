# React Architecture

This is a simple React project to demostrate how libraries like Mobx and Inversify works with the purpose of creating a scalable and maintainable architecture.

## Getting startet

Intall the dependencies:

```bash
npm install
```

Create a `.env` file in the root of the project with the following content:

```env
API_URL=https://your-api-url.com
API_USER=your-api-user
API_PASSWORD=your-api-password
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Preview

```bash
npm run preview
```

## Build for Production

```bash
npm run build
```

# Update Versions

```bash
npm run version:patch
npm run version:minor
npm run version:major
```