import { SignedIn, SignedOut, UserButton, SignInButton} from '@clerk/clerk-react' // all this compounds are coming from clerk react package

const App = () => {
  return (
  <header>
      <SignedOut> {/* Show this signIn button when user is signed out / not signed in */}
        <SignInButton mode='modal' />
      </SignedOut>
      <SignedIn> {/* Show this user button when user is signed in */}
        <UserButton />
      </SignedIn>
    </header>
  )
}
export default App