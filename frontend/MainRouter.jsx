import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Home from './src/components/Home'
// import Layout from './src/components/Layout'
// import PrivateLayout from './components/Layout'
// import Footer from './src/components/Footer'
// import Users from './pages/user/Users'
// import Signup from './pages/user/Signup'
// import { Container } from '@material-ui/core'
// import PrivateRoute from './lib/PrivateRoute'
// import UserLayout from './components/UserLayout'
// import Login from './pages/user/Login'
// import NewIncident from './pages/incidents/NewIncident'
// import IncidentList from './pages/incidents/IncidentList'
// import DeleteIncident from './pages/incidents/DeleteIncident'
// import EditIncident from './pages/incidents/EditIncident'
// import DeleteUser from './pages/user/DeleteUser'
// import EditProfile from './pages/user/EditProfile'
import auth from './src/lib/auth-helper';
import Layout from './src/components/Layout';
import Signup from './src/users/Signup';
import Signin from './src/users/Signin';
import Home from './src/components/Home';
import PrivateRoute from './src/lib/PrivateRoute';
import Footer from './src/components/Footer';
import NewIncident from './src/incidents/NewIncident';
import ListIncident from './src/incidents/ListIncident';
import EditIncident from './src/incidents/EditIncident';
import AdminRoute from './src/lib/AdminRoute';
import ListUser from './src/users/ListUser';
import EditUser from './src/users/EditUser';
import Profile from './src/users/Profile'

const isAuthenticated = auth.isAuthenticated();
console.log(isAuthenticated);

const MainRouter = () => {
  return (
    <div>
      {isAuthenticated && isAuthenticated?.user && <Layout />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/incidents/new"
          element={
            <PrivateRoute>
              <NewIncident />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/incidents"
          element={
            <PrivateRoute>
              <ListIncident />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/incidents/edit/:incidentId"
          element={
            <PrivateRoute>
              <EditIncident />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/profile"
          element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/edit/:userId"
          element={
            <PrivateRoute>
              <EditUser/>
            </PrivateRoute>
          }
        />
        {/******** admin *********/}
        <Route
          exact
          path="/admin/users"
          element={
            <AdminRoute>
              <ListUser />
            </AdminRoute>
          }
        />

        <Route
          exact
          path="/admin/users/:userId"
          element={
            <AdminRoute>
              <EditUser />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/edit/:userId"
          element={
            <AdminRoute>
              <EditUser />
            </AdminRoute>
          }
        />

        <Route
          exact
          path="/admin/profile"
          element={
            <AdminRoute>
              <Profile />
            </AdminRoute>
          }
        />

        <Route
          exact
          path="/admin/incidents"
          element={
            <AdminRoute>
              <ListIncident />
            </AdminRoute>
          }
        />

        <Route
          exact
          path="/admin/incidents/edit/:incidentId"
          element={
            <AdminRoute>
              <EditIncident />
            </AdminRoute>
          }
        />

        <Route
          exact
          path="/admin/incidents/new"
          element={
            <AdminRoute>
              <NewIncident />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default MainRouter;
