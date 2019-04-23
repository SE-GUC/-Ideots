import React, { Component } from 'react'
import {Alert} from 'react-bootstrap'
export default class ShowMessage extends Component {
  render() {
    
    if (this.props.flag1){
        return (
        <div align="center">
           <Alert  variant="success"> Successful registration  verify your email we're waiting for you </Alert>
        </div>
      )
    }
      else if(this.props.flagPass){
        return (
            <div align="center">
               <Alert  variant="danger"> Passwords are not the same </Alert>
            </div>
          )
      }
      else if (this.props.wrongEmail){

        return (
            <div align="center">
               <Alert  variant="danger">Wrong Email or Password </Alert>
            </div>
          )
      }
      else {
          return null;
      }
  }
        }

