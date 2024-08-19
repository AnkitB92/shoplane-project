import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import EndPoints from "../../api/EndPoints";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LiaIdCard } from 'react-icons/lia';

const SignupPage = () => {
  const nav = useNavigate();
  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await axios.post(EndPoints.USERS, values);
      setRequestResponse({
        textMessage: "Signup Successful.",
        alertClass: "alert alert-success py-1 ps-2 mb-2"
      });
      setTimeout(() => {
        nav("/login");
      }, 500);
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Signup failed!";
      setRequestResponse({
        textMessage: errorMessage,
        alertClass: "alert alert-danger py-1 ps-2 mb-2"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required')
      .min(2, 'Too short').max(10, 'Too long'),
    lastName: Yup.string().required('Required')
      .min(2, 'Too short').max(10, 'Too long'),
    email: Yup.string().required('Required')
      .email('Invalid email'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required')
      .min(6, 'Too short').max(12, 'Too long'),
    confirmPassword: Yup.string().required('Required')
      .oneOf([Yup.ref('password')], 'Passwords don\'t match')
  });

  return (
    <div className="row justify-content-center">
      <div className="col-11 col-sm-8 col-md-8 col-lg-5 rounded-3 border p-4">
        <h2 className="display-6 mb-4 text-center">Sign Up</h2>
        <div className={requestResponse.alertClass}>
          {requestResponse.textMessage}
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {formik => (
            <Form>
              <div className="row gx-1">
                <div className="col">
                  <div className="form-group mb-3">
                    <Field
                      className={formik.touched.firstName && formik.errors.firstName
                        ? "form-control is-invalid" : "form-control"}
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                    <ErrorMessage name="firstName">
                      {errorMessage => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group mb-3">
                    <Field
                      className={formik.touched.lastName && formik.errors.lastName
                        ? "form-control is-invalid" : "form-control"}
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                    <ErrorMessage name="lastName">
                      {errorMessage => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              </div>

              <div className="form-group mb-3">
                <Field
                  className={formik.touched.email && formik.errors.email
                    ? "form-control is-invalid" : "form-control"}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email">
                  {errorMessage => (
                    <small className="text-danger">{errorMessage}</small>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-group mb-3">
                <Field
                  className={formik.touched.username && formik.errors.username
                    ? "form-control is-invalid" : "form-control"}
                  name="username"
                  type="text"
                  placeholder="Username"
                />
                <ErrorMessage name="username">
                  {errorMessage => (
                    <small className="text-danger">{errorMessage}</small>
                  )}
                </ErrorMessage>
              </div>

              <div className="row gx-1 mb-4">
                <div className="col">
                  <div className="form-group">
                    <Field
                      className={formik.touched.password && formik.errors.password
                        ? "form-control is-invalid" : "form-control"}
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password">
                      {errorMessage => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <Field
                      className={formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? "form-control is-invalid" : "form-control"}
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage name="confirmPassword">
                      {errorMessage => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              </div>

              <div className="user-option mb-3">
                Already registered?
                <Link to="/login"> Login</Link>
              </div>

              <div className="user-btn d-grid col-6 mx-auto">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!formik.isValid || formik.isSubmitting || isLoading}
                >
                  {isLoading ? 'Signing up...' : <><LiaIdCard /> Sign Up</>}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;