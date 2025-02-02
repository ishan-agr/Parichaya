// import React, { Component } from 'react';
// import { isMobile } from 'react-device-detect';
import axios from 'axios';
// import { BrowserRouter as Router, Navigate, Route } from 'react-router-dom'; // Updated import
// import history from '../../history';
// import './registrationForm.css';
// import mockUsers from './mockusers';


// const validateForm = (errors) => {
//     let valid = true;
//     Object.values(errors).forEach(
//         (val) => val.length > 0 && (valid = false)
//     );
//     return valid;
// };

// const countErrors = (errors) => {
//     let count = 0;
//     Object.values(errors).forEach(
//         (val) => val.length > 0 && (count = count + 1)
//     );
//     return count;
// };

// class RegistrationForm extends Component {
//     userData;
//     constructor(props) {
//         super(props);
//         this.state = {
//             formValid: false,
//             ok: false,
//             validUser: false,
//             errorCount: null,
//             saveUsers: [],
//             user: {
//                 Name: '',
//                 Pass: ''
//             },
//             errors: {
//                 Name: '',
//                 Pass: '',
//             },
//             checked: localStorage.getItem("theme") === "dark" ? true : false,
//             theme: localStorage.getItem("theme")
//         };
//         sessionStorage.setItem('currentPage', '/');
//         sessionStorage.setItem('/error', JSON.stringify(false));
//         sessionStorage.setItem('/customerdetails', JSON.stringify(false));
//         sessionStorage.setItem('/success', JSON.stringify(false));
//     }

//     handleChange = (event) => {
//         if (!this.state.ok) {
//             this.setState({ ok: true });
//         }
//         event.preventDefault();
//         const { name, value } = event.target;
//         let errors = this.state.errors;
//         let user = this.state.user;
//         switch (name) {
//             case 'Name':
//                 if (value.length >= 5) user.Name = value;
//                 errors.Name =
//                     value.length < 5
//                         ? 'user name must be 5 characters long!'
//                         : '';
//                 break;

//             case 'Pass':
//                 if (value.length >= 5) user.Pass = value;
//                 errors.Pass =
//                     value.length < 8
//                         ? 'password must be 8 characters long!'
//                         : '';
//                 break;
//             default:
//                 break;
//         }
//         this.setState({ errors, [name]: value });
//         this.setState({ user, [name]: value });
//     };

//     handleSubmit = (event) => {
//         event.preventDefault();
//         let user = this.state.user;
//         let saveUsers = this.state.saveUsers;
//         let myuser = this.state.user;
//         saveUsers.map((user, index) => {
//             if (user.username == myuser.Name && user.address.zipcode == myuser.Pass) {
//                 this.setState({ validUser: true });
//             }
//         });

//         if (!isMobile) {
//             sessionStorage.setItem('/error', JSON.stringify(true));
//             history.push('/error');
//         }

//         if (this.state.ok) {
//             this.setState({ formValid: validateForm(this.state.errors) });
//             this.setState({ errorCount: countErrors(this.state.errors) });
//         }
//     };

//     componentWillUpdate(nextProps, nextState) {
//         sessionStorage.setItem('user', JSON.stringify(nextState));
//     }

//     // componentDidMount() {
//     //     document
//     //         .getElementsByTagName("HTML")[0]
//     //         .setAttribute("data-theme", localStorage.getItem("theme"));
//     //     axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {
//     //         console.log(result);
//     //         this.setState({ saveUsers: result.data });
//     //     });
        
//     //     // Use mock data instead of API call
//     //     this.setState({ saveUsers: mockUsers });
//     // }
//     componentDidMount() {
//             document
//               .getElementsByTagName('HTML')[0]
//               .setAttribute('data-theme', localStorage.getItem('theme'));
//               axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {
//                 console.log(result);
//             // Use mock data instead of API call
//             this.setState({ saveUsers: mockUsers });
//           })
//         }

//     toggleThemeChange = () => {
//         const { checked } = this.state;
//         if (checked === false) {
//             localStorage.setItem("theme", "dark");
//             document
//                 .getElementsByTagName("HTML")[0]
//                 .setAttribute("data-theme", localStorage.getItem("theme"));
//             this.setState({
//                 checked: true
//             });
//         } else {
//             localStorage.setItem("theme", "light");
//             document
//                 .getElementsByTagName("HTML")[0]
//                 .setAttribute("data-theme", localStorage.getItem("theme"));
//             this.setState({
//                 checked: false
//             });
//         }
//     };

//     render() {
//         const { errors, formValid, ok, validUser, saveUsers } = this.state;
//         formValid && ok && validUser ? sessionStorage.setItem('/customerdetails', JSON.stringify(true)) : sessionStorage.setItem('/customerdetails', JSON.stringify(false));
//         return (
//             <div>
//                 {/* <label className="switch">
//           <input type="checkbox"
//                 // checked={this.state.checked}
//                 defaultChecked={this.state.checked}
//                 onChange={() => this.toggleThemeChange()}
//               />
//             <span className="slider round" />
//           </label> */}
//                 <div className="col-12 col-lg-3 login-card mt-2 hv-center mx-auto registrationCard">
//                     <div className="text-center"><img className="logoImage" src="KYClogo.png" height="120px" width="200px" alt="Logo" /></div>
//                     <nav className="navbar navbar-dark">
//                         <div className="row col-12 d-flex justify-content-center" style={{ paddingLeft: "30px" }}>
//                             <span className="h5 text-grey">Hi! Welcome to ZestMoney</span>
//                             <span className="h6 text-muted">One step KYC solution</span>
//                         </div>
//                     </nav>
//                     <form onSubmit={this.handleSubmit}>
//                         <div className="form-group text-left">
//                             <label htmlFor="exampleInputusername"></label>
//                             <input type="text" autoFocus
//                                 className="form-control"
//                                 id="username"
//                                 aria-describedby="nameHelp"
//                                 placeholder="Enter your username"
//                                 name="Name"
//                                 onChange={this.handleChange}
//                             />
//                             {errors.Name.length > 0 &&
//                                 <span className='error'>{errors.Name}</span>}
//                         </div>
//                         <div className="form-group text-left">
//                             <label htmlFor="exampleInputPassword1"></label>
//                             <input type="password" name="Pass"
//                                 className="form-control"
//                                 id="password"
//                                 placeholder="Enter your password"
//                                 onChange={this.handleChange}
//                             />
//                             {errors.Pass.length > 0 &&
//                                 <span className='error'>{errors.Pass}</span>}
//                         </div>
//                         <button
//                             type="submit"
//                             className="btn btn-success btn-block" value="log in" onClick={this.handleClick}>Get OTP
//                         </button>
//                         {formValid && ok && validUser ? <Navigate to="/customerdetails" /> :
//                             !validUser && formValid && ok ?
//                                 <div className="alert alert-warning alert-dismissible">
//                                     <a href="/" className="close" data-dismiss="alert" aria-label="close">&times;</a>
//                                     <strong>User not found!</strong>
//                                 </div> : <Navigate to="/" />}
//                     </form>
//                 </div>
//             </div>
//         )
//     }
// }
// export default RegistrationForm;
import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import mockUsers from './mockusers'; // Import the mock data
import './registrationForm.css';
import logoImage from '../../Components/zest-logo.png';
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach((val) => val.length > 0 && (count = count + 1));
  return count;
};

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      ok: false,
      validUser: false,
      errorCount: null,
      saveUsers: [],
      user: {
        Name: '',
        Pass: '',
      },
      errors: {
        Name: '',
        Pass: '',
      },
      checked: localStorage.getItem('theme') === 'dark' ? true : false,
      theme: localStorage.getItem('theme'),
    };
    sessionStorage.setItem('currentPage', '/');
    sessionStorage.setItem('/error', JSON.stringify(false));
    sessionStorage.setItem('/customerdetails', JSON.stringify(false));
    sessionStorage.setItem('/success', JSON.stringify(false));
  }

  handleChange = (event) => {
    if (!this.state.ok) {
      this.setState({ ok: true });
    }
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let user = this.state.user;
    switch (name) {
      case 'Name':
        if (value.length >= 5) user.Name = value;
        errors.Name =
          value.length < 5 ? 'user name must be 5 characters long!' : '';
        break;

      case 'Pass':
        if (value.length >= 5) user.Pass = value;
        errors.Pass =
          value.length < 8 ? 'password must be 8 characters long!' : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
    this.setState({ user, [name]: value });
  };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const { Name, Pass } = this.state.user;
//     console.log(Name,Pass);

//     // Mock validation logic
//     const validUser = this.state.saveUsers.find(
//       (user) => user.username == Name && user.address.zipcode == Pass
//     );
//     // sessionStorage.setItem('/customerdetails');
//     // sessionStorage.setItem("currentPage","true")
//     // history.redirect("/customerdetails")
//     const navigate = useNavigation()
//     navigate("//customerdetails")
//     if (!validUser) {
//     sessionStorage.setItem("currentPage","true")
//     sessionStorage.setItem("route","/error")
//     // sessionStorage.setItem('/customerdetails', 'true');
    
//       this.setState({ validUser: true });
//     } else {
//       this.setState({ validUser: false });
//     }

//     this.setState({ formValid: validateForm(this.state.errors) });
//     this.setState({ errorCount: countErrors(this.state.errors) });
//   };
handleSubmit = (event) => {
    event.preventDefault();
    const { Name, Pass } = this.state.user;
    console.log(Name, Pass);

    // Mock validation logic
    console.log("use r ",this.state.saveUsers);
    const validUser = this.state.saveUsers.find(
      (user) => user.username == Name && user.address.zipcode == Pass
    );

    if (!validUser) {
      sessionStorage.setItem("currentPage", "true");
      sessionStorage.setItem("user",{Name,Pass})
      sessionStorage.setItem("route", "/customerdetails");
    //   const navigate = useNavigate();
    //   navigate("/customerdetails");
      this.setState({ validUser: true });
    } else {
      sessionStorage.setItem("currentPage", "true");
      sessionStorage.setItem("route", "/error");
      this.setState({ validUser: false });
    }

    this.setState({ 
      formValid: validateForm(this.state.errors),
      errorCount: countErrors(this.state.errors)
    });
};

  componentWillUpdate(nextProps, nextState) {
    sessionStorage.setItem('user', JSON.stringify(nextState));
  }

  componentDidMount() {
    document
      .getElementsByTagName('HTML')[0]
      .setAttribute('data-theme', localStorage.getItem('theme'));
      axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {
        console.log(result);
        this.setState({ saveUsers: result.data });
        });
    // Use mock data instead of API call
    this.setState({ saveUsers: mockUsers });
  }

  toggleThemeChange = () => {
    const { checked } = this.state;
    if (checked === false) {
      localStorage.setItem('theme', 'dark');
      document
        .getElementsByTagName('HTML')[0]
        .setAttribute('data-theme', localStorage.getItem('theme'));
      this.setState({
        checked: true,
      });
    } else {
      localStorage.setItem('theme', 'light');
      document
        .getElementsByTagName('HTML')[0]
        .setAttribute('data-theme', localStorage.getItem('theme'));
      this.setState({
        checked: false,
      });
    }
  };

  render() {
    const { errors, formValid, ok, validUser, saveUsers } = this.state;
    if (formValid && ok && validUser) {
      sessionStorage.setItem('/customerdetails', JSON.stringify(true));
    } else {
      sessionStorage.setItem('/customerdetails', JSON.stringify(false));
    }

    return (
      <div>
        <div className="col-12 col-lg-3 login-card mt-2 hv-center mx-auto registrationCard">
          <div className="text-center">
            <img
              className="logoImage"
              src={logoImage}
              height="200px"
              width="330px"
              alt="Logo"
            />
          </div>
          <nav className="navbar navbar-dark">
            <div
              className="row col-12 d-flex justify-content-center"
              style={{ paddingLeft: '30px' }}
            >
              <span className="h5 text-grey">PARICHAYA</span>
              <span className="h6 text-muted">Complete KYC solution</span>
            </div>
          </nav>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group text-left">
              <label htmlFor="exampleInputusername"></label>
              <input
                type="text"
                autoFocus
                className="form-control"
                id="username"
                aria-describedby="nameHelp"
                placeholder="Enter your username"
                name="Name"
                onChange={this.handleChange}
              />
              {errors.Name.length > 0 && (
                <span className="error">{errors.Name}</span>
              )}
            </div>
            <div className="form-group text-left">
              <label htmlFor="exampleInputPassword1"></label>
              <input
                type="password"
                name="Pass"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={this.handleChange}
              />
              {errors.Pass.length > 0 && (
                <span className="error">{errors.Pass}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              value="log in"
            >
              Login
            </button>
            {formValid && ok && validUser ? (
              <Navigate to="/takeselfie" />
            ) : (
              !validUser &&
              formValid &&
              ok && (
                <div className="alert alert-warning alert-dismissible">
                  <a
                    href="/"
                    className="close"
                    data-dismiss="alert"
                    aria-label="close"
                  >
                    &times;
                  </a>
                  <strong>User not found!</strong>
                </div>
              )
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;

// import React, { Component } from 'react';
// import { Navigate } from 'react-router-dom';
// import { isMobile } from 'react-device-detect';
// import mockUsers from './mockusers'; // Import the mock data
// import './registrationForm.css';

// const validateForm = (errors) => {
//   let valid = true;
//   Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
//   return valid;
// };

// const countErrors = (errors) => {
//   let count = 0;
//   Object.values(errors).forEach((val) => val.length > 0 && (count = count + 1));
//   return count;
// };

// class RegistrationForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       formValid: false,
//       ok: false,
//       validUser: false,
//       errorCount: null,
//       saveUsers: [],
//       user: {
//         Name: '',
//         Pass: '',
//       },
//       errors: {
//         Name: '',
//         Pass: '',
//       },
//       checked: localStorage.getItem('theme') === 'dark' ? true : false,
//       theme: localStorage.getItem('theme'),
//     };
//     sessionStorage.setItem('currentPage', '/');
//     sessionStorage.setItem('/error', JSON.stringify(false));
//     sessionStorage.setItem('/customerdetails', JSON.stringify(false));
//     sessionStorage.setItem('/success', JSON.stringify(false));
//   }

//   handleChange = (event) => {
//     if (!this.state.ok) {
//       this.setState({ ok: true });
//     }
//     event.preventDefault();
//     const { name, value } = event.target;
//     let errors = this.state.errors;
//     let user = this.state.user;
//     switch (name) {
//       case 'Name':
//         if (value.length >= 5) user.Name = value;
//         errors.Name =
//           value.length < 5 ? 'user name must be 5 characters long!' : '';
//         break;

//       case 'Pass':
//         if (value.length >= 5) user.Pass = value;
//         errors.Pass =
//           value.length < 8 ? 'password must be 8 characters long!' : '';
//         break;
//       default:
//         break;
//     }
//     this.setState({ errors, [name]: value });
//     this.setState({ user, [name]: value });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const { Name, Pass } = this.state.user;

//     // Mock validation logic
//     const validUser = this.state.saveUsers.find(
//       (user) => user.username === Name && user.address.zipcode === Pass
//     );

//     if (validUser) {
//       sessionStorage.setItem('/customerdetails', 'true');
//       this.setState({ validUser: true });
//     } else {
//       this.setState({ validUser: false });
//     }

//     this.setState({ formValid: validateForm(this.state.errors) });
//     this.setState({ errorCount: countErrors(this.state.errors) });
//   };

//   componentWillUpdate(nextProps, nextState) {
//     sessionStorage.setItem('user', JSON.stringify(nextState));
//   }

//   componentDidMount() {
//     document
//       .getElementsByTagName('HTML')[0]
//       .setAttribute('data-theme', localStorage.getItem('theme'));

//     // Use mock data instead of API call
//     this.setState({ saveUsers: mockUsers });
//   }

//   toggleThemeChange = () => {
//     const { checked } = this.state;
//     if (checked === false) {
//       localStorage.setItem('theme', 'dark');
//       document
//         .getElementsByTagName('HTML')[0]
//         .setAttribute('data-theme', localStorage.getItem('theme'));
//       this.setState({
//         checked: true,
//       });
//     } else {
//       localStorage.setItem('theme', 'light');
//       document
//         .getElementsByTagName('HTML')[0]
//         .setAttribute('data-theme', localStorage.getItem('theme'));
//       this.setState({
//         checked: false,
//       });
//     }
//   };

//   render() {
//     const { errors, formValid, ok, validUser, saveUsers } = this.state;
//     if (formValid && ok && validUser) {
//       sessionStorage.setItem('/customerdetails', JSON.stringify(true));
//     } else {
//       sessionStorage.setItem('/customerdetails', JSON.stringify(false));
//     }

//     return (
//       <div>
//         <div className="col-12 col-lg-3 login-card mt-2 hv-center mx-auto registrationCard">
//           <div className="text-center">
//             <img
//               className="logoImage"
//               src="KYClogo.png"
//               height="120px"
//               width="200px"
//               alt="Logo"
//             />
//           </div>
//           <nav className="navbar navbar-dark">
//             <div
//               className="row col-12 d-flex justify-content-center"
//               style={{ paddingLeft: '30px' }}
//             >
//               <span className="h5 text-grey">Hi! Welcome to ZestMoney</span>
//               <span className="h6 text-muted">One step KYC solution</span>
//             </div>
//           </nav>
//           <form onSubmit={this.handleSubmit}>
//             <div className="form-group text-left">
//               <label htmlFor="exampleInputusername"></label>
//               <input
//                 type="text"
//                 autoFocus
//                 className="form-control"
//                 id="username"
//                 aria-describedby="nameHelp"
//                 placeholder="Enter your username"
//                 name="Name"
//                 onChange={this.handleChange}
//               />
//               {errors.Name.length > 0 && (
//                 <span className="error">{errors.Name}</span>
//               )}
//             </div>
//             <div className="form-group text-left">
//               <label htmlFor="exampleInputPassword1"></label>
//               <input
//                 type="password"
//                 name="Pass"
//                 className="form-control"
//                 id="password"
//                 placeholder="Enter your password"
//                 onChange={this.handleChange}
//               />
//               {errors.Pass.length > 0 && (
//                 <span className="error">{errors.Pass}</span>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="btn btn-success btn-block"
//               value="log in"
//             >
//               Get OTP
//             </button>
//             {formValid && ok && validUser ? (
//               <Navigate to="/customerdetails" />
//             ) : (
//               !validUser &&
//               formValid &&
//               ok && (
//                 <div className="alert alert-warning alert-dismissible">
//                   <a
//                     href="/"
//                     className="close"
//                     data-dismiss="alert"
//                     aria-label="close"
//                   >
//                     &times;
//                   </a>
//                   <strong>User not found!</strong>
//                 </div>
//               )
//             )}
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default RegistrationForm;
