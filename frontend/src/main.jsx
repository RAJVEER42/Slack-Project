import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Clerk publishable key (check for the key, if not found, throw an error)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY // instead of process.env, In vite we use import.meta.env

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap your app with ClerkProvider {so that in the application we can use compounds coming from Clerk}, if key is found. */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}> 
      <App />
    </ClerkProvider>
  </StrictMode>,
)
