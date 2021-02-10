import React from "react";
import Calendar from "../calendar/components/calendar";
import Aux from '../Auxilary/Auxilary';
import LogIn from '../Authorization/LogIn';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../Authorization/Auth";
import ForgotPassword from "../Authorization/ForgotPassword";
import ErrorPage from '../ErrorPage/ErrorPage'
import SignUp from "../Authorization/SignUp";


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
                        <Route path="/home" exact render={(props) => <Calendar {...props} username={username} />}></Route>
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <Route path="/SignUp" ><SignUp username={username} setUsername={setUsername} /></Route>
                        <Route path="*" component={ErrorPage}/>
                    </Switch>
                </AuthProvider>
            </Aux>
        </BrowserRouter>
    );
}


export default (Home);