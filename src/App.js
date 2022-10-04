import RegisterAdmin from "./pages/RegisterAdmin";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginAdmin from "./pages/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

function App() {
  const app = (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {/* //<Route path="/home" element={<Home />} /> */}
          <Route element={<Home />} path="/" exact />
        </Route>

        {/* <Route element={<ProtectedRoute />}>
          {/* <Route path="/navy" element={<Navy />} /> */}

        {/*<Route element={<Navy />} path="/home" exact />
        </Route> */}

        {/*<Route element={<ProtectedRoute />}>
          {/* <Route path="/card" element={<Card />} /> */}

        {/*<Route element={<Card />} path="/home" exact />
        </Route>*/}

        <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="/loginAdmin" element={<LoginAdmin title="login" />} />
      </Routes>
    </BrowserRouter>
  );

  return (
    <AuthProvider>
      <div className="App">{app}</div>
    </AuthProvider>
  );
}

export default App;
