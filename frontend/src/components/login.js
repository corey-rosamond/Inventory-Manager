import React from "react";

/**
 * Login
 *
 * This is the long page component.
 */
class Login extends React.Component
{
    /**
     * On Remember Me click
     *
     * This will handle the remember me click event
     * @param e
     */
    onRememberMeClick(e)
    {
        console.log("remember me clicked");
    }

    /**
     * On Forgot Password Click
     *
     * This will handle the forgot password click event.
     * @param e
     */
    onForgotPasswordClick(e)
    {
        console.log("Forgot password clicked");
    }

    /**
     * On Submit Click
     *
     * This will handle the on submit button click event
     * @param e
     */
    onSubmitClick(e)
    {
        console.log("Submit has been clicked");
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
                            <form>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="email_address"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                    <label className="form-label" htmlFor="email_address">
                                        Email Address:
                                    </label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Password"/>
                                    <label htmlFor="password">
                                        Password:
                                    </label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-0"
                                            type="checkbox"
                                            id="remember_me"
                                            onClick={this.onRememberMeClick}
                                        />
                                        <label className="form-check-label" htmlFor="remember_me">
                                            Remember me
                                        </label>
                                    </div>
                                    <a
                                        className="text-body"
                                        onClick={this.onForgotPasswordClick}>
                                            Forgot password?
                                    </a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        style={submitButtonStyles}
                                        onClick={this.onSubmitClick}>
                                            Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;