import { createContext } from 'react';

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
}
const AuthContext = createContext(null);