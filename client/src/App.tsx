import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register } from "./modules";
import { Home } from "./modules/home";
import { Navigate } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    setIsLoggedIn(!!access_token); // Set isLoggedIn to true if access_token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={isLoggedIn ? <Home handleLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Register setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
