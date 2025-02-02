import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Components/privateRoute';
import GovtIdWireframe1 from './Pages/GovtID/govtIdWireframe1';
import GovtIdWireframe3 from './Pages/GovtID/govtIdWireframe3';
import GovtIdWireframe4 from './Pages/GovtID/govtIdWireframe4';
import GovtIdWireframe6 from './Pages/GovtID/govtIdWireframe6';
import GovtIdWireframe7 from './Pages/GovtID/govtIdWireframe7';
import DetailPage from './Pages/CustomerDetails/detailComponent';
import SelfieScreen from './Pages/SelfieScreens/SelfieScreen';
import SelfieScreenBack from './Pages/SelfieScreens/SelfieScreenBack';
import RegistrationForm from './Pages/Auth/registrationForm';
import Success from './Pages/success';
import Camera from './Pages/Camera/Camera';
import ErrorPage from './Components/errorPage';
import DetailPage0 from './Pages/IDVERIFICATION/idverification';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/customerdetails" element={<DetailPage />} />
          <Route path="/takeselfie" element={<SelfieScreen />} />
          <Route path="/verifyselfie" element={<SelfieScreenBack />} />

          <Route path="/takeGovernmentIDFront" element={<GovtIdWireframe1 />} />
          <Route path="/verifyGovernmentIDFront" element={<GovtIdWireframe3 />} />
          <Route path="/takeGovernmentIDBack" element={<GovtIdWireframe4 />} />
          <Route path="/verifyGovernmentIDBack" element={<GovtIdWireframe6 />} />
          <Route path="/verifyGovernmentIDComplete" element={<GovtIdWireframe7 />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/success" element={<Success />} />
          <Route path="/idverify" element={<DetailPage0 />} />

          <Route path="/customerdetails" element={<PrivateRoute element={<DetailPage />} />} />
          <Route path="/takeselfie" element={<PrivateRoute element={<SelfieScreen />} />} />
          <Route path="/verifyselfie" element={<PrivateRoute element={<SelfieScreenBack />} />} />
          <Route path="/takeGovernmentIDFront" element={<PrivateRoute element={<GovtIdWireframe1 />} />} />
          <Route path="/verifyGovernmentIDFront" element={<PrivateRoute element={<GovtIdWireframe3 />} />} />
          <Route path="/takeGovernmentIDBack" element={<PrivateRoute element={<GovtIdWireframe4 />} />} />
          <Route path="/verifyGovernmentIDBack" element={<PrivateRoute element={<GovtIdWireframe6 />} />} />
          <Route path="/verifyGovernmentIDComplete" element={<PrivateRoute element={<GovtIdWireframe7 />} />} />
          <Route path="/camera" element={<PrivateRoute element={<Camera />} />} />
          <Route path="/success" element={<PrivateRoute element={<Success />} />} />
        </Routes>
      </Router>
    );
  }
}
