import React, { Component } from 'react'

import axios from "axios";



export class Applyfortasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
        task:[],
        currentApplicants: [],
        applicantsSoFar:0
       
    
    }
  }
  applicants ;
  
  componentDidMount() {
    axios.get("http://localhost:3000/api/tasks/5cae82fb78cadf0004c4fdb5")
      .then(res => {
        const tasks = res.data.task;
         this.applicants = res.data.task.applicants;
        console.log(tasks)
        console.log(this.applicants)
        this.setState(state => ({
            task:tasks,
            currentApplicants: this.applicants,
            applicantsSoFar: this.applicants.length
        }));
      })
  }

  


    render() {
   
  
        
        return(
       <div>
       <ul>
        <li>description : { this.state.task.description}</li>
        <li>Required Skills : {this.state.task.requiredSkills}</li>
        <li>Experience :{ this.state.task.yearsOfExperience} Years</li>
        <li>Payment : {this.state.task.payment}</li>
        <li>Rate of partner: {this.state.task.ratePartnerDoer}</li>
        <li>Rate of Consultancy: {this.state.task.ratePartnerConsultancy }</li>
       <li>Current applicants: {this.state.applicantsSoFar}</li>
       
       </ul>
     

     <div>
     <button  onClick = {this.Submit}>Apply</button>
     </div>
    </div>

      
            
        )

  
 } 


Submit = () => {

  /*
  axios.post("http://localhost:3000/api/application", {  applicantId: "5c9fe28433caec2078bfa350",
  taskId:"5cae82fb78cadf0004c4fdb5" })
  .then(res => {
    console.log(res);
    console.log(res.data);
  });
*/
   
  axios.get("http://localhost:3000/api/tasks/5cae82fb78cadf0004c4fdb5").then(res => {
   this.applicants = res.data.task.applicants
  })
  console.log(this.applicants)
  axios.put("http://localhost:3000/api/tasks/5cae82fb78cadf0004c4fdb5", {
      applicants: [...this.applicants,"5c9fe28433caec2078bfa350"]
  })
  .then(res => {
      console.log(res);
      console.log(res.data)
      this.setState(state => ({
          currentApplicants:[...state.currentApplicants,this.applicants],
          applicantsSoFar:state.currentApplicants.length
      }))
      
  });
  
  alert("You applied Succesfully")
}


}



export default Applyfortasks
