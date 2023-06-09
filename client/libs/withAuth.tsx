import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { useContext } from 'react';
import { PageContext } from '../pages/context/AuthContext';
import { getMainDefinition } from '@apollo/client/utilities';
import { getDataFromTree } from '@apollo/client/react/ssr';
const acceesToken = Cookies.get("acceesToken") 
import withApollo from './withApollo';


const withAuth = (WrappedComponent:any) => {
     
  const AuthenticatedComponent = (props:any) => {
    const router = useRouter();

    const { user} = useContext(PageContext)

    useEffect(() => {
      // Check if the user is authenticated
    
      if (!user) {
        // Redirect to the login page or show an error message
        
        router.push('/login');
      }
    }, []);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

  export default withAuth 