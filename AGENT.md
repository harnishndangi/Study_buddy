# Study Buddy - Agent Instructions

## Commands
- **Client**: `cd Client && npm run start` (dev), `npm run build`, `npm run lint`
- **Server**: `cd Server && npm start` (uses nodemon)
- **Test**: No test suite configured yet

## Architecture
- **Frontend**: React + Vite + TailwindCSS in `/Client`
- **Backend**: Express.js + MongoDB + Socket.io in `/Server`
- **APIs**: REST endpoints at `/api/auth`, `/api/notes`, `/api/tasks`, `/api/pomodoros`
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT-based authentication with bcryptjs

## Code Style
- **ES Modules**: Use `import/export` syntax (both client/server)
- **React**: Functional components with hooks, use Formik for forms
- **Backend**: Express routes in `/routes`, controllers in `/controllers`, models in `/models`
- **Linting**: ESLint configured for React hooks and refresh
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Unused vars**: Prefixed with underscore or uppercase for constants are allowed
- **File structure**: Group by feature (components, pages, hooks, utils)
