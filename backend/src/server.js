import "../instrument.mjs";
import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from './config/inngest.js';
import { serve } from 'inngest/express';
import chatRoutes from './routes/chat.route.js'
import * as Sentry from "@sentry/node";



const app = express();

const PORT = ENV.PORT;

app.use(express.json());
app.use(clerkMiddleware()); // Use Clerk middleware to handle authentication, sessions, and user management. app.use() -> Middleware function in Express.js to process incoming requests.
// req.auth will be available in all routes after this middleware, which helps in identifying authenticated users.

app.get("/debug-sentry", (req,res) => {
  throw new Error("My first Sentry error!"); 
});

app.get("/", (req, res) => {

  res.send('Hello World!');
});


app.use("/api/inngest", serve({ client: inngest, functions })); // Serve Inngest functions at the /api/inngest endpoint
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);


const startServer = async () => { // help the server to run on the port lendlessly only it is not deployed in production (versel do not like it)
  try {
    await connectDB(); // Connect to the database before starting the server
    if(ENV.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT} 🚀`);
      });
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Stop the server if the database connection fails
  }
};

startServer(); // Start the server

// In development, startServer() will print your local URL and connect DB once.
// In production, it connects DB silently — then Vercel handles all routing.

// Export the app instead of listening
export default app; 
// Vercel automatically detects this export default app and connects it to its internal routing system — no manual app.listen() required.



