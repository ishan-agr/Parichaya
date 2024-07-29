import React from 'react';
import KYCNavBar from './Components/navBar';
import Routes from './routes';
// import ClassificationForm from './Components/lassificationForm';
// import SendOTP from './Components/SendOTP';
// import VerifyOTP from './Components/VerifyOTP';
import { Container } from '@mui/material';
import './App.css';

const App = () => {

    
    return (
        <div>
        
            {/* <Container> */}
                <KYCNavBar />
                <Routes />
                {/* <SendOTP /> */}
                {/* <VerifyOTP /> */}
                {/* <ClassificationForm /> */}
            {/* </Container> */}

        </div>
    );
};

export default App;
// class App extends React.Component{
//     render(){
//         return (
//             <div>
//                 <KYCNavBar />
//                 <SendOTP />
//                 <VerifyOTP />
//                 <ClassificationForm />
//                 <Routes />
//             </div>
//         );
//     }
// }

// export default App;
