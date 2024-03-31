import { createContext } from 'react';

export type Auth = {
    isAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void
};

// create context for the service
const AuthContext = createContext<Auth>({
    isAuthenticated: false,
    setIsAuthenticated: () => { }
});

export default AuthContext;