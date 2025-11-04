import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // for TANStack QUERY
import { Toaster } from "react-hot-toast";
import AuthProvider from './providers/AuthProvider.jsx'
import * as Sentry from '@sentry/react'

const queryClient = new QueryClient() // instance of queryClient, Create a client from TANStack QUERY

// Import your Clerk publishable key (check for the key, if not found, throw an error)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY // instead of process.env, In vite we use import.meta.env

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


Sentry.init({
  dsn: "https://895eb0d4619e7c484cb9c3a9a1232f32@o4510295528505344.ingest.us.sentry.io/4510306593472512",
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap your app with ClerkProvider {so that in the application we can use compounds coming from Clerk}, if key is found. */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}> {/* Wrapping thhe Tanstack Query*/}
            <AuthProvider>
              <App />
            </AuthProvider>
            <Toaster position='top-right'/> {/* Wrapping tag from react-hot-toast */}
          </QueryClientProvider>
        </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
