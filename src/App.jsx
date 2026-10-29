import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";


function App(){
  return(
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />} >
        <Route path="/" end element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
export default App;