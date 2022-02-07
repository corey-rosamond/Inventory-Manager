import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Routing
import PrivateRoute from "./component/route/private.route.js";

// Screens
import PrivateScreen from "./component/screen/private.screen";
import LoginScreen from "./component/screen/login.screen";
import AddUserScreen from "./component/screen/add_user.screen";
import ForgotPasswordScreen from "./component/screen/forgot_password.screen";
import ResetPasswordScreen from "./component/screen/reset_password.screen";


/**
 * Main App function
 * @returns {JSX.Element}
 */
class App extends React.Component
{
    render()
    {
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <PrivateRoute exact path="/" component={PrivateScreen} />
                        <Route exact path="/login" component={LoginScreen} />
                        <Route exact path="/add-user" component={AddUserScreen} />
                        <Route
                            exact
                            path="/forgot-password"
                            component={ForgotPasswordScreen}
                        />
                        <Route
                            exact
                            path="/reset-password/:reset_token"
                            component={ResetPasswordScreen}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

// Export the App
export default App;