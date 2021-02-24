import React, { useState } from 'react';
import Login from '../../Login/Login';
import { defaulftLoggingFramework } from '../../Login/loginManager';
import SignUp from '../SignUp/SignUp';

const ProfilingPage = () => {
    //call login framework
    defaulftLoggingFramework();

    const [newUserToggler, setNewUserToggler] = useState('login');

    return (
        <>
            {newUserToggler === 'login' ?
            <> 
            <h1 className="text-center my-3"><strong>Login</strong> | <span style={{cursor : 'pointer'}} onClick={() => setNewUserToggler('signUp')}>Sign Up</span></h1>
            <Login></Login>
            </>
            :
            <>
            <h1 className="text-center my-3"><span style={{cursor : 'pointer'}} onClick={() => setNewUserToggler('login')}>Login</span> | <strong>Sign Up</strong></h1>
            <SignUp setNewUserToggler={setNewUserToggler}></SignUp>
            </>}
        </>
    );
};

export default ProfilingPage;