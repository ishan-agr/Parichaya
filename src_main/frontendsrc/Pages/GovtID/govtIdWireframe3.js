import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VerifyYourIdentity } from '../../Components/verifyYourIdentity';
import { SaveAndContinue } from '../../Components/saveAndContinue';
import { RetakeLooksGood } from '../../Components/retakeLooksGood';
// import { ZestNavBar } from '../../components/zestNavBar';
import './css/govtIdWireframe3.css'

class GovtIdWireframe3 extends React.Component{
    constructor(props){
      super(props);
      let image = sessionStorage.getItem('idfront');
      sessionStorage.setItem('camera_origin','verifyGovernmentIDFront');
      sessionStorage.setItem('currentPage','/verifyGovernmentIDFront');
      sessionStorage.setItem('/takeGovernmentIDBack',JSON.stringify(false));
      this.state={
          photo:image,
      }
    }

    componentDidMount() {
      document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
    }

    render(){
        return (
            <div>
              <div className="frontBodyExceptSave">
                <VerifyYourIdentity />
                <div className="frontFullIdBody">
                  <p className="frontGovtId">Your Government ID</p>
                  <div className="frontIdBodyNImage">
                    <div className="frontIdBody">
                      <p className="frontAadhaar">Front of {sessionStorage.getItem('ID')}</p>
                      <p>Your name and photo should be clearly visible</p>
                    </div>
                    <div className="text-center"><img className="frontIdImage" src={this.state.photo} height="auto" width="auto" alt="aadhaar" /></div> 
                  </div>
                  <RetakeLooksGood current='/verifyGovernmentIDFront' looksGoodPath='/takeGovernmentIDBack' />
                </div>
              </div>
              <SaveAndContinue active={false}/>
            </div>
          );
    }
};

export default GovtIdWireframe3;