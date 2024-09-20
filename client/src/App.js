import React from "react";

// import "materialize-css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRoutes } from "./routes";

function App() {
  const routes = useRoutes(false);
  return (
    <>
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
    </>
  );
}

export default App;
