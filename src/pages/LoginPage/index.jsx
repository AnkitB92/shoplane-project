import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import EndPoints from "../../api/EndPoints";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineLogin } from 'react-icons/hi';
import { useAuth } from '../../Context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    username: "",
    password: ""
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(EndPoints.LOGIN, values);
      login(response.data.token);

      setRequestResponse({
        textMessage: "Login Successful",
        alertClass: "alert alert-success py-1 ps-2 mb-2"
      });
      setTimeout(() => {
        nav("/");
      }, 500);
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Invalid User";
      setRequestResponse({
        textMessage: errorMessage,
        alertClass: "alert alert-danger py-1 ps-2 mb-2"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required")
      .min(6, "Too short").max(12, "Too long")
  });

  return (
    <div className="row justify-content-center">
      <div className="col-11 col-sm-8 col-md-8 col-lg-5 rounded-3 border p-4">
        <h2 className="display-6 mb-4 text-center">Login</h2>
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
              <div className="form-group mb-3">
                <Field
                  className={formik.touched.username && formik.errors.username
                    ? "form-control is-invalid" : "form-control"}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <ErrorMessage name="username">
                  {errorMessage => (
                    <small className="text-danger">{errorMessage}</small>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-group mb-4">
                <Field
                  className={formik.touched.password && formik.errors.password
                    ? "form-control is-invalid" : "form-control"}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage name="password">
                  {errorMessage => (
                    <small className="text-danger">{errorMessage}</small>
                  )}
                </ErrorMessage>
              </div>

              <div className="user-option text-center mb-2">
                New User?
                <Link className='text-decoration-none' to="/signup"> Register</Link>
              </div>

              <div className="user-btn d-grid col-6 mx-auto">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!formik.isValid || formik.isSubmitting || isLoading}
                >
                  {isLoading ? 'Logging in...' : <><HiOutlineLogin /> Login</>}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;