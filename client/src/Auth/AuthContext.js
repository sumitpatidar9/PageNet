import { createContext, useContext, useEffect, useState } from "react";
import { logInUser, signUpUser, checkAuthStatus, logoutUser } from "./HandleAPI";

const AuthContext = createContext();



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const checkStatus = async () => {
            try {
                const data = await checkAuthStatus();

                if (data && data.user) {
                    setUser({ email: data.user.email, name: data.user.name });
                    setIsLoggedIn(true);
                } 
                
                else {
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } 
            
            catch (error) {
                console.error("Error checking authentication status:", error);
                setUser(null);
                setIsLoggedIn(false);
            }
        };

        checkStatus();
    }, []);



    const login = async (email, password) => {
        try {
            const data = await logInUser(email, password);
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
            return data;
        } catch (error) {
            console.error("Error logging in:", error);
            return null;
        }
    };



    const signup = async (email, password) => {
        try {
            const data = await signUpUser(email, password);
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };
    

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setIsLoggedIn(false);
            setUser(null);
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    };

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
