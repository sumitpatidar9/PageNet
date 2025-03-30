
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {Login} from './Login';
import {Signup} from './SignUp';


const Controller = () => {
    const auth = useAuth();
    return (
        <>  
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export { Controller };