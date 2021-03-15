import React, { useState } from 'react';
import {  Image, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faList, faPlus,  faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../../../images/logo.png';
import AddSeller from '../../SuperAdminPage/AddSeller/AddSeller';
import ViewAllCategory from '../../SuperAdminPage/ViewAllCategory/ViewAllCategory';
import ViewAllSeller from '../../SuperAdminPage/ViewAllSeller/ViewAllSeller';
import ViewAllOrder from '../../SuperAdminPage/ViewAllOrder/ViewAllOrder';
import AddProduct from '../../SellerPortal/AddProduct/AddProduct';
import ViewSellerOrders from '../../SellerPortal/ViewSellerOrders/ViewSellerOrders';
import ViewConsumerOrder from '../../ConsumerPortal/ViewConsumerOrder/ViewConsumerOrder';
import AddAdmin from '../../SuperAdminPage/AddAdmin/AddAdmin';
import { connect } from 'react-redux';
import AddViewSupplier from '../../SuperAdminPage/AddViewSupplier/AddViewSupplier';
import UpdateUserInfo from '../../ConsumerPortal/UpdateUserInfo/UpdateUserInfo';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#e5e5e5',
  },
}));

const CommonDashBoard = ({ user, addLoggedinUser}) => {
    const classes = useStyles();

    const [selectedOption, setSelectedOption] = useState( user?.role === 'admin' ? 'addSeller' : user?.role === 'seller' ? 'addProduct' : 'myOrders');

    // const signOut = (e) => {
    //     e.preventDefault();
    //     handleSignOut()
    //     .then(res => {
    //         addLoggedinUser(res);
    //         sessionStorage.removeItem('token');
    //         history.replace(from);
    //     })
    //     .catch(err => console.log(err));
    // }

    return (
        <>
        <div className={classes.root}>
        <CssBaseline />
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <List>
                <ListItem className="py-5">
                    <Nav.Link as={Link} to={`/`} className="text-center"><Image  width={160} src={logo} alt="Group" fluid/></Nav.Link>
                </ListItem>
                <Divider/>
                {
                    user?.role === 'admin' ?
                    <>
                    <ListItem className="text-center">
                        <ListItemText primary={user.adminName} />
                        <ListItemText danger="Admin" />

                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => setSelectedOption('addSeller')}>
                        <ListItemIcon><FontAwesomeIcon icon={faPlus} /></ListItemIcon>
                        <ListItemText primary="Add Seller" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewAllCategory')}>
                        <ListItemIcon><FontAwesomeIcon icon={faUserPlus} /></ListItemIcon>
                        <ListItemText primary="Add/View Categroies" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewSeller')}>
                        <ListItemIcon><FontAwesomeIcon icon={faUserPlus} /></ListItemIcon>
                        <ListItemText primary="View All Seller" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewAdminOrders')}>
                        <ListItemIcon><FontAwesomeIcon icon={faList} /></ListItemIcon>
                        <ListItemText primary="View Orders" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('addAdmin')}>
                        <ListItemIcon><FontAwesomeIcon icon={faList} /></ListItemIcon>
                        <ListItemText primary="Add Admin" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('addSupplier')}>
                        <ListItemIcon><FontAwesomeIcon icon={faList} /></ListItemIcon>
                        <ListItemText primary="Add View Supplier" />
                    </ListItem>
                    </> 
                    :
                    user?.role === 'seller' ?
                    <>
                    <ListItem button onClick={() => setSelectedOption('addProduct')}>
                        <ListItemIcon><FontAwesomeIcon icon={faShoppingCart} /></ListItemIcon>
                        <ListItemText primary="Add/View Product" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('viewSellerOrders')}>
                        <ListItemIcon><FontAwesomeIcon icon={faList} /></ListItemIcon>
                        <ListItemText primary="View Orders" />
                    </ListItem>
                    </>
                    :
                    <>
                    <ListItem button onClick={() => setSelectedOption('myOrders')}>
                        <ListItemIcon><FontAwesomeIcon icon={faShoppingCart} /></ListItemIcon>
                        <ListItemText primary="My Orders" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('updateInfo')}>
                        <ListItemIcon><FontAwesomeIcon icon={faShoppingCart} /></ListItemIcon>
                        <ListItemText primary="Update Info" />
                    </ListItem>
                    </>
                }
            </List>
            <Divider />
            {/* <List>
                <ListItem button onClick={signOut} as={Link} to={`/`}>
                    <ListItemIcon><FontAwesomeIcon icon={faSignOutAlt} /></ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List> */}
        </Drawer>
        <main className={classes.content}>
            {
                selectedOption === 'addSeller' && <AddSeller></AddSeller>
            }
            {
                selectedOption === 'viewAllCategory'&& <ViewAllCategory></ViewAllCategory>
            }
            {
                selectedOption === 'viewSeller'&& <ViewAllSeller></ViewAllSeller>
            }
            {
                selectedOption === 'viewAdminOrders'&& <ViewAllOrder></ViewAllOrder>
            }
            {
                selectedOption === 'addProduct'&& <AddProduct></AddProduct>
            }
            {
                selectedOption === 'viewSellerOrders'&& <ViewSellerOrders></ViewSellerOrders>
            }
            {
                selectedOption === 'myOrders'&& <ViewConsumerOrder></ViewConsumerOrder>
            }
            {
                selectedOption === 'addAdmin'&& <AddAdmin></AddAdmin>
            }
            {
                selectedOption === 'addSupplier'&& <AddViewSupplier></AddViewSupplier>
            }
            {
                selectedOption === 'updateInfo'&& <UpdateUserInfo></UpdateUserInfo>
            }
        </main>
        </div>
        </>
    );
};

const mapStateToProps = state => {
    return{
        user: state.user
    }
}


export default connect(mapStateToProps)(CommonDashBoard);