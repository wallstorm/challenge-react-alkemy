import { createContext, useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProvideAuth() {
    const [token, setToken] = useState();
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem('token');
        if (loggedInUser) {
            setToken(loggedInUser);
        }
    }, []);

    const signin = cb => {
        setToken(localStorage.getItem('token'));
        cb();
    };

    const signout = cb => {
        localStorage.removeItem('token');
        setToken(null);
        cb();
    };

    return {
        token,
        signin,
        signout
    };
}

export function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route 
            {...rest}
            render={({ location }) =>
                auth.token ? (
                    children
                ) : (
                    <Redirect 
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
