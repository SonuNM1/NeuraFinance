import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Import a function to create a route matcher for specific protected route

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",   // Matches any route under "/dashboard"
  "/account(.*)",   // Matches any route under "/account"
  "/transaction(.*)",   // Matches any route under "/transaction"
])

// Export the middleware function using Clerk's authentication system

export default clerkMiddleware(async (auth, req) => {

  // Extract the user Id from the authentication object 

  const {userId} = await auth()

  // If no user is authenticated and the request is for a protected route

  if(!userId && isProtectedRoute(req)){
    const {redirectToSignIn} = await auth()   // Get the redirect function from Clerk

    // Redirect the user to the sign-in page

    redirectToSignIn()
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};