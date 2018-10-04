// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ContentPaste from "@material-ui/icons/ContentPaste";
import AddShopping from '@material-ui/icons/AddShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import AccountBalance from '@material-ui/icons/AccountBalanceWallet';
import CreditCard from '@material-ui/icons/CreditCard';

// core components/views
import LoginPage from "../views/LoginPage/index.js";
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import UserProfile from "../views/UserProfile/UserProfile.jsx";
import VendorList from "../views/Vendor/index.js";
import AddVendor from "../views/Vendor/add.js";
import ViewVendor from "../views/Vendor/view.js";
import PurchaseOrder from "../views/PurchaseOrder/index.js";
import Project from "../views/Project/index.js";
import Log from "../views/Log/index.js";
import Registration from "../views/RegistrationPage/index.js";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChangePassword from "../views/UserProfile/ChangePassword.jsx"

/* import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx"; */

export const dashboardRoutes = [
  {
    path: "/dashboard",
    component: DashboardPage
  },
   {
    path: "/user",
    component: UserProfile
  },
  {
    path: "/vendor/view/:id",
    component: ViewVendor
  },{
    path: "/vendor/type/:type",
    component: VendorList
  },
  {
    path: "/vendor",
    component: VendorList
  },
  {
    path: "/vendor/add",
    component: AddVendor
  },
  {
    path: "/Project",
    component: Project
  },
  {
    path: "/PurchaseOrder",
    component: PurchaseOrder
  }, 
  {
    path: "/changepassword",
    component: ChangePassword
  }, 
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile
  }, 
  {
    path: "/Log",
    component: Log
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export const AdminMenu = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
 {
   path: "/vendor",
   name: "Vendors List",
   icon: ContentPaste,
   component: VendorList
 },
 {
   path: "/vendor/add",
   name: "Vendor Details",
   icon: AddIcon,
   component: AddVendor
 },
 {
   path: "/Project",
   name: "Purchase Requisition",
   icon: CreditCard,
   component: Project
 },
 {
   path: "/PurchaseOrder",
   name: "Purchase Order",
   icon:  AccountBalance,
   component: PurchaseOrder
 },
 {
   path: "/Log",
   name: "Report",
   icon:  LibraryBooks,
   component: Log
 },
];

export const IacMenu = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: HomeIcon,
  },
  {
    path: "/vendor/type/approved",
    name: "Approved Vendors",
    icon: LibraryBooks,
  },{
    path: "/vendor/type/pending",
    name: "Pending Approval",
    icon: LibraryBooks,
  },{
    path: "/vendor/type/blacklisted",
    name: "Blacklisted Vendors",
    icon: LibraryBooks,
  },
];

export const VendorMenu = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: HomeIcon,
  },
];

export const ProcurementMenu = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: HomeIcon,
  },
  {
    path: "/vendor/type/approved",
    name: "Approved Vendors",
    icon: LibraryBooks,
  }
];