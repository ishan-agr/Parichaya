  import React from 'react';
  import { Navigate} from 'react-router-dom';

  const PrivateRoute = ({ element: Component, ...rest }) => {
    // const navigate = useNavigation()
    // const temp = sessionStorage.getItem('currentPage');
    const temp = sessionStorage.getItem('route');
    console.log("res",rest);
    const buttonTriggered = JSON.parse(sessionStorage.getItem(rest.path));

    return buttonTriggered ? <Component {...rest} /> : <Navigate to={temp} />;
  };

  export default PrivateRoute;
  