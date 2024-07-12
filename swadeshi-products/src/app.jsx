import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/user/HomePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditProduct from "./pages/admin/AdminEdit";
import AdminView from "./pages/admin/AdminView";
import Sidebar from "./components/Sidebar";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import Navbar from "./components/Navbar";
import CategoriesDashboard from "./pages/admin/CategoriesDashboard";
import CategoriesEdit from "./pages/admin/CategoriesEdit";
import UserProfile from "./pages/user/UserProfile";
import Categories from "./pages/user/Categories";
import Products from "./pages/user/Products";
import ProductDescription from "./pages/user/ProductDescription";
import AddToCart from "./pages/user/AddtoCart";
import BillingPage from "./pages/user/BillingPage";
import OrderConfirmation from "./pages/user/OrderConfirmation";
import OrdersPage from "./pages/user/OrderHistory";
import OrderHistory from "./pages/user/OrderHistory";

const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
          ></Route>
          <Route path="/footer" element={<Footer />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
          <Route path="/admin/view/:id" element={<AdminView />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/categories-dashboard"
            element={<CategoriesDashboard />}
          />
          <Route path="/categories/edit/:id" element={<CategoriesEdit />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:categoryId" element={<Products />} />
          <Route
            path="/product-description/:id"
            element={<ProductDescription />}
          />
          <Route path="/cart" element={<AddToCart/>} />
          <Route path = "/billing-page" element={<BillingPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};
export default App;
