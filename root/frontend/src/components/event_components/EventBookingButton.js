import React from 'react'
import BookedEvent from './BookedEvent';
import NonBookedEvent from './NonBookedEvent';

export default function EventBookingButton(props) {
    const isBooked = props.isBooked
    console.log(isBooked)
    if(isBooked){
        return <BookedEvent/>
    }
    else {
        return <NonBookedEvent/>
    }
 
}
