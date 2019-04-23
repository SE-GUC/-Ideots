import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput } from 'mdbreact';

const FormPage = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard
            className="card-image"
            style={{
              backgroundImage:
                "url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)",
              width: "28rem"
            }}
          >
            <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
              <div className="text-center">
                <h3 className="white-text mb-5 mt-4 font-weight-bold">
                  <strong>SIGN</strong>
                  <a href="#!" className="green-text font-weight-bold">
                    <strong> UP</strong>
                  </a>
                </h3>
              </div>
              <MDBInput label="Your email" group type="text" validate />
              <MDBInput label="Your password" group type="password" validate />
              <div className="md-form pb-3">
                <div className="form-check my-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck17"
                  />
                  <label
                    className="form-check-label white-text"
                    htmlFor="defaultCheck17"
                  >
                    Accept the
                    <a href="#!" className="green-text font-weight-bold">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <MDBRow className="d-flex align-items-center mb-4">
                <div className="text-center mb-3 col-md-12">
                  <MDBBtn
                    color="success"
                    rounded
                    type="button"
                    className="btn-block z-depth-1"
                  >
                    Sign in
                  </MDBBtn>
                </div>
              </MDBRow>
              <MDBCol md="12">
                <p className="font-small white-text d-flex justify-content-end">
                  Have an account?
                  <a href="#!" className="green-text ml-1 font-weight-bold">
                    Log in
                  </a>
                </p>
              </MDBCol>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;
