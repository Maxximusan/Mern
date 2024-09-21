import React from "react";

// import "materialize-css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/authContext";
import { NavBar } from "./components/NavBar";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <>
      <AuthContext.Provider
        value={{ token, login, logout, userId, isAuthenticated }}
      >
        {isAuthenticated && <NavBar />}
        <div className="container">
          <h1> Hello Guys</h1>
          {routes}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AuthContext.Provider>
    </>
  );
}

export default App;
