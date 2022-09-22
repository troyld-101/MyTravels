import RegisterAdmin from "./pages/RegisterAdmin";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginAdmin from "./pages/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import Navy from "./components/Navy";
import Card from "./components/Card";
//import Places from "./places";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const app = (
    // <Container
    //   className="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: "100vh" }}
    // >
    //   <div className="w-100" style={{ maxWidth: "400px" }}>
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
    //   </div>
    // </Container>
  );
  // const cards = places.map((items) => {
  //   return (
  //     <Card
  //       key={items.id}
  //       {...items}

  //       // city={items.city}
  //       // country={items.country}
  //       // googleMapsUrl={items.googleMapsUrl}
  //       // imageUrl={items.imageUrl}
  //       // description={items.description}
  //     />
  //   );
  // });
  return (
    <AuthProvider>
      <div className="App">{app}</div>
    </AuthProvider>
  );
}

export default App;
