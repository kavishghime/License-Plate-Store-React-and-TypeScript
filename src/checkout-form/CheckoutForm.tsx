import React, { ChangeEvent, FormEvent } from 'react';
import { StateDropdown } from './StateDropdown';

export class CheckoutForm extends React.Component {

  state = {
    "firstname": '',
    "lastname": '',
    "street": '',
    "city": '',
    "zip": '',
    "zipValid": false,
    "state": '',
    "cc": ''
  };

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:8000/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).then(() => alert("Order successful"))
  };


  checkZipCodeValidity = (event: ChangeEvent<HTMLInputElement>) => {
    this.handleChange(event);
    if (event.target.validationMessage != "") {
      this.setState({ zipValid: false });
    } else {
      this.setState({ zipValid: true });
    }
  }


  render() {
    return (
      <form id="checkoutForm" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="First name" name="firstname"
                required value={this.state.firstname} onChange={this.handleChange} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lastname"
                required value={this.state.lastname}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Street"
                name="street"
                required value={this.state.street}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                required value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              {!this.state.zipValid && <div className="alert alert-danger">
                Please enter a 5-digit zipcode
              </div>
              }

              <input
                type="text"
                className="form-control"
                placeholder="Zip"
                name="zip"
                value={this.state.zip}
                onChange={this.checkZipCodeValidity}
                required pattern="[0-9]{5}"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">

              <StateDropdown
                name="state"
                value={this.state.state}
                onChange={this.handleChange}
              />

              {/* <input
                type="text"
                className="form-control"
                placeholder="State"
                name="state"
                required value={this.state.state}
                onChange={this.handleChange}
              /> */}

            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                placeholder="Credit card number"
                name="cc"
                required value={this.state.cc}
                onChange={this.handleChange} />
            </div>
          </div>
          <div className="col-lg-6">
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    );
  }
}
