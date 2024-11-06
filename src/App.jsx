// // import "./App.css";
// // import {
// //   createBrowserRouter,
// //   createRoutesFromElements,
// //   RouterProvider,
// //   Route,
// // } from "react-router-dom";
// // import Home from "./Componets/Home";
// // import About from "./Componets/About";
// // import Layout from "./Componets/Layout";
// // import Cart from "./Componets/Cart";
// // import Login from "./Componets/Login";
// // function App() {
// //   const router = createBrowserRouter(
// //     createRoutesFromElements(
// //       <Route path="/" element={<Layout />}>
// //         <Route path="/home" element={<Home />} />
// //         <Route path="/about" element={<About />} />
// //         <Route path="/cart" element={<Cart />} />
// //         <Route path="/login" element={<Login />} />
// //       </Route>
// //     )
// //   );

// //   return <RouterProvider router={router} />;
// // }

// // export default App;

// import "./App.css";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route,
// } from "react-router-dom";
// import Home from "./Componets/Home";
// import About from "./Componets/About";
// import Layout from "./Componets/Layout";
// import Cart from "./Componets/Cart";
// import Login from "./Componets/Login";
// import Signup from "./Componets/Signup";

// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Layout />}>
//         {/* Set root path to Home */}
//         <Route index element={<Home />} /> 
//         <Route path="home" element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="cart" element={<Cart />} />
//         <Route path="login" element={<Login />} />
//         <Route path="/signup" element={<Signup/>} />
//       </Route>
//     )
//   );

//   return <RouterProvider router={router} />;
// }

// export default App;

import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useEffect } from "react"; // Use effect hook for auth state listener
import { useDispatch } from "react-redux"; // If using Redux
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/Authentication"; // Adjust path to Firebase config
import { setUser, clearUser } from "./Redux/onAuth"; // Your Redux slice (if using Redux)

import Home from "./Componets/Home";
import About from "./Componets/About";
import Layout from "./Componets/Layout";
import Cart from "./Componets/Cart";
import Login from "./Componets/Login";
import Signup from "./Componets/Signup";

function App() {
  const dispatch = useDispatch(); // Redux dispatch (optional)

  // Set up Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(setUser(user)); // If using Redux, update the state
        console.log('login');
      } else {
        // User is signed out
        dispatch(clearUser()); // Clear the state on logout
        console.log("LogOut", );
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [dispatch]);

  // Set up routes using React Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Set root path to Home */}
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
