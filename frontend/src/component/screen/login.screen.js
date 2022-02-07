import React from "react";
import axios from "axios";
import {
    Link
} from "react-router-dom";

/**
 * Login
 *
 * This is the long page component.
 */
class LoginScreen extends React.Component
{
    constructor(params) {
        super(params);
        this.state = {
            email_address: "",
            password: "",
            error: ""
        };
    }

    /**
     * On Email Change
     *
     * Called on email value change
     * @param event
     */
    onEmailChange(event)
    {
        let target = event.target;
        this.setState({email_address: target.value});
    }

    /**
     * On Password Change
     *
     * Called on password value change
     * @param event
     */
    onPasswordChange(event)
    {
        let target = event.target;
        this.setState({password: target.value});
    }

    /**
     * On Submit
     *
     * This processes the on login form submit.
     * @param event
     * @returns {Promise<void>}
     */
    async onSubmit(event)
    {
        try
        {
            event.preventDefault();
            let email_address = this.state.email_address;
            let password = this.state.password;
            let data = await axios.post(
                "http://127.0.0.1:5000/api/users/login",
                {
                    email_address,
                    password
                }
            );
            localStorage.setItem("authorization_token", data.token);
            this.props.history.push("/");
        } catch(error)
        {
            this.setState({
                error: error.response.data.error
            });
            setTimeout(() => {
                this.setState({error: ""});
            },5000);
        }
    }

    /**
     * Render
     *
     * This will render the login form.
     * @returns {JSX.Element}
     */
    render()
    {
        let submitButtonStyles ={
            paddingLeft: "2.5rem",
            paddingRight: "2.4rem"
        }
        return (
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={this.onSubmit.bind(this)}>
                                {this.state.error &&
                                    <div id="error-message" className="alert alert-danger" role="alert">
                                        {this.state.error}
                                    </div>
                                }

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email_address">
                                        Email Address:
                                    </label>
                                    <input
                                        type="email"
                                        id="email_address"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        onChange={this.onEmailChange.bind(this)}
                                    />
                                </div>

                                <div className="form-outline mb-3">
                                    <label htmlFor="password">
                                        Password:
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Password"
                                        onChange={this.onPasswordChange.bind(this)}
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-outline mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            style={submitButtonStyles}
                                            >
                                            Login
                                        </button>
                                    </div>
                                    <Link to="/forgot-password" className="text-body">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

// Export the LoginScreen
export default LoginScreen;