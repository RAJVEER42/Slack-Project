import * as Sentry from "@sentry/react";
import { Navigate, Route, Routes } from 'react-router';
import { useAuth } from "@clerk/clerk-react";
import AuthPage from './pages/AuthPage';
import CallPage from "./pages/CallPage";
import HomePage from './pages/HomePage';


const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <SentryRoutes>
      <Route path="/" element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />} />
      <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />} />

      <Route
        path="/call/:id"
        element={isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />}
      />

      <Route
        path="*"
        element={isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />}
      />
    </SentryRoutes>
  );
};

export default App;


// first version of routing code
// return (
//   <>
//       <SignedIn> {/* Show this user button when user is signed in */}
//         <SentryRoutes>
//           <Route path="/" element={<HomePage />} /> {/* After signIn we will be directed to HomePage */}
//           <Route path="/auth" element={<Navigate to={"/"} replace />} /> {/* If the user is signed in he can't go back to the auth page, if he tries then it will redirect/Navigate it to home page instead */}
//         </SentryRoutes>
//       </SignedIn>

//       <SignedOut> {/* Show this signIn button when user is signed out / not signed in */}
//         <SentryRoutes>
//           <Route path="/auth" element={<AuthPage />} /> {/* When not SignIn we will be directed to AuthPage */}
//           <Route path="*" element={<Navigate to={"/auth"} replace />} /> {/* If the user is not signed in he can't go to the any page, if he tries then it will redirect/Navigate it to Auth page instead */}
//         </SentryRoutes>
//       </SignedOut>
//     </>
//   );