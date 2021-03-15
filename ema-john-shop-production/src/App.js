import React, { useEffect } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from './Component/Review/Review';
import Error from './Component/Error/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Shipment from './Component/Shipment/Shipment';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Footer from './Component/Shared/Footer/Footer';
import ProfilingPage from './Component/Shared/ProfilingPage/ProfilingPage';
import InventoryIndex from './Component/Inventory/InventoryIndex/InventoryIndex';
import SuperAdminIndex from './Component/SuperAdminPage/SuperAdminIndex/SuperAdminIndex';
import SellerPortalIndex from './Component/SellerPortal/SellerPortalIndex/SellerPortalIndex';
import ConsumerPortalIndex from './Component/ConsumerPortal/ConsumerPortalIndex/ConsumerPortalIndex';
import HomePageIndex from './Component/HomePage/HomePageIndex/HomePageIndex';
import { addAllProduct, addCategory, fetchAllOrders, fetchSellerInfo, setAllSupplier, setAllUser } from './Redux/Actions/StoreActions';
import { connect } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

const MainLayout = props => (
  <>
    <Header></Header>
    {props.children}
    <Footer></Footer>
  </>
)

const DashBoardLayout = props => (
  <>
    {props.children}
  </>
)


function App({addAllProduct, fetchAllOrders, setAllSupplier, fetchSellerInfo, addCategory, setAllUser}) {
  
  useEffect( () => {
    const fetchProductData = () =>{
      fetch('https://fathomless-basin-42766.herokuapp.com/products')
      .then(res => res.json())
      .then(productData => {
        addAllProduct(productData);
      });
    }

    const fetchOrderData = () => {
      fetch('https://fathomless-basin-42766.herokuapp.com/getAllOrders')
      .then(res => res.json())
      .then(orderData => {
        fetchAllOrders(orderData);
      });
    }

    const fetchSellerData = () => {
      fetch('https://fathomless-basin-42766.herokuapp.com/getAllSellers')
      .then(res => res.json())
      .then(sellerData => {
        fetchSellerInfo(sellerData);
      });
    }

    const fetchCategoryData = () => {
      fetch('https://fathomless-basin-42766.herokuapp.com/categories')
      .then(res => res.json())
      .then(categoryData => {
          addCategory(categoryData);
      })
    }

    const fetchUserCollection = () => {
      fetch('http://localhost:5000/getAllUsers')
      .then(res => res.json())
      .then(userData => {
          setAllUser(userData);
      })
    }

    const fetchSupplierCollection = () => {
      fetch('http://localhost:5000/getAllSuppliers')
      .then(res => res.json())
      .then(supplierData => {
          setAllSupplier(supplierData);
      })
    }
    
    fetchProductData();
    fetchOrderData();
    fetchSellerData();
    fetchCategoryData();
    fetchUserCollection();
    fetchSupplierCollection();
  }, [addAllProduct, fetchAllOrders, fetchSellerInfo, addCategory, setAllUser, setAllSupplier])


  return (
      <Router>
          <Switch>
            <AppRoute exact path="/" layout={ MainLayout } component={ HomePageIndex } />
            {/* <Route exact path="/">
              <HomePageIndex></HomePageIndex>
            </Route> */}
            <AppRoute exact path="/review" layout={ MainLayout } component={ Review } />
            {/* <Route path="/review">
              <Review></Review>
            </Route> */}
            <PrivateRoute path="/manage">
              <InventoryIndex></InventoryIndex>
            </PrivateRoute>
            <PrivateRoute path="/shipment">
              <>
              <Header></Header>
              <Shipment></Shipment>
              <Footer></Footer>
              </>
            </PrivateRoute>
            <PrivateRoute path="/superAdmin">
              <SuperAdminIndex></SuperAdminIndex>
            </PrivateRoute>
            <PrivateRoute path="/sellerPortal">
              <SellerPortalIndex></SellerPortalIndex>
            </PrivateRoute>
            <PrivateRoute path="/myAccount">
              <ConsumerPortalIndex></ConsumerPortalIndex>
            </PrivateRoute>
            <AppRoute path="/login" layout={ DashBoardLayout } component={ ProfilingPage } />
            {/* <Route path="/login">
              <ProfilingPage></ProfilingPage>
            </Route> */}
            <AppRoute path="/product/:productkey" layout={ MainLayout } component={ ProductDetails } />
            <Route path="/product/:productkey">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path="*">
              <Error></Error>
            </Route>
          </Switch>
      </Router>
  );
}

const mapStateToProps = state => {
  return{
    products: state.products
  }
}

const mapDispatchToProps = {
  addAllProduct : addAllProduct,
  fetchAllOrders: fetchAllOrders,
  fetchSellerInfo: fetchSellerInfo,
  addCategory: addCategory,
  setAllUser: setAllUser,
  setAllSupplier: setAllSupplier
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
