import React from "react";
import Calendar from "../calendar/components/calendar";
// import Auth from '../Auth/components/Auth';
// import Error from '../Auth/components/Error'
import Aux from '../Auxilary/Auxilary';
import LogIn from '../Authorization/LogIn';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import SignUp from "./components/SignUp";
import { AuthProvider } from "../Authorization/Auth";
import ForgotPassword from "../Authorization/ForgotPassword";
// import Dashboard from "../Authorization/Dashboard";


const Home = () => {
    const [username, setUsername] = React.useState(
        localStorage.getItem('myValueInLocalStorage') || ''
    );
    return (
        <BrowserRouter>
            <Aux>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/"><LogIn username={username} setUsername={setUsername} /></Route>
                        {/* <Route path="/loginerror" exact render={(props) => <Error {...props} />}></Route> */}
                        <Route path="/home" exact render={(props) => <Calendar {...props} username={username} />}></Route>
                        <Route path="/forgot-password" component={ForgotPassword} />
                    </Switch>
                </AuthProvider>
            </Aux>
        </BrowserRouter>
    );
}


export default (Home);