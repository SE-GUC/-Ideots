import React from 'react'
import BookedEvent from './BookedEvent';
import NonBookedEvent from './NonBookedEvent';

export default function EventBookingButton(props) {
    const isBooked = props.isBooked
    console.log(isBooked)
    if(isBooked){
        return <BookedEvent onClick={props.onClick}/>
    }
    else {
        return <NonBookedEvent onClick={props.onClick}/>
    }
 
}
