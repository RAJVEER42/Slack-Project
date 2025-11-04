import { SignedIn, SignedOut, UserButton, SignInButton} from '@clerk/clerk-react' // all this compounds are coming from clerk react package
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { Routes, Route, Navigate } from 'react-router';
import * as Sentry from "@sentry/react";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  return (
  <>
      <SignedIn> {/* Show this user button when user is signed in */}
        <SentryRoutes>
          <Route path="/" element={<HomePage />} /> {/* After signIn we will be directed to HomePage */}
          <Route path="/auth" element={<Navigate to={"/"} replace />} /> {/* If the user is signed in he can't go back to the auth page, if he tries then it will redirect/Navigate it to home page instead */}
        </SentryRoutes>
      </SignedIn>

      <SignedOut> {/* Show this signIn button when user is signed out / not signed in */}
        <SentryRoutes>
          <Route path="/auth" element={<AuthPage />} /> {/* When not SignIn we will be directed to AuthPage */}
          <Route path="*" element={<Navigate to={"/auth"} replace />} /> {/* If the user is not signed in he can't go to the any page, if he tries then it will redirect/Navigate it to Auth page instead */}
        </SentryRoutes>
      </SignedOut>
    </>
  )
}
export default App