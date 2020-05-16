import React, {useEffect} from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import "./verify.css";
import {verify} from '../../services/actions/authAction'
import MiniLoader from "../../components/MiniLoader";

import PropTypes from 'prop-types'

const Verify = ({ userInfo, history, loader, verify }) => {

    useEffect(() => {
        if(userInfo === null){
            history.push('/register')
        }
    },[userInfo, history])

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          code: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.code) {
            errors.code = "Code is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            const { code } = values
            const email = userInfo.data.email
            verify({ email ,code }, history)
            setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
            <form className="verify-form" onSubmit={handleSubmit}>
              <div className="verify-overlay">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="verify-left">
                        <div className="verify-left-overlay">
                          <div className="name-section">
                          <h3 className="mb-3 ml-3">Please verify account</h3>
                          </div>
                          <div className="code-section">
                            <input
                              type="number"
                              placeholder="Enter Code"
                              name="code"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.code}
                            />
                            {errors.code && touched.code && (
                              <p className="error">{errors.code}</p>
                            )}
                          </div>
                          <button type="submit" className="verify-btn">
                            Verify {loader && <MiniLoader />}
                        </button>
                        <p className="ml-5" style={{color: "#ffffff"}}>Not a member? <Link style={{color: "#ffffff"}} to="/register">Register here</Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
};

Verify.propTypes = {
    userInfo: PropTypes.object,
    loader: PropTypes.bool.isRequired,
    verify: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    userInfo:  state.authReducer.registerRes,
    loader: state.authReducer.loading
})

export default connect(mapStateToProps, {verify})(Verify);
