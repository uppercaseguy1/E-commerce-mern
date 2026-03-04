import {Outlet} from "react-router-dom";
import Navigation from "./pages/Auth/Navigation.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 99999 }}
      />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  )
}

export default App
