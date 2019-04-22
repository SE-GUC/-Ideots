import React, { Component } from 'react'


import axios from "axios";
import "./Applyfortask.css";
import PropTypes from 'prop-types';




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
    axios.get("https://lirten-hub-guc.herokuapp.com/api/tasks/5caf03a293cf2015f42e2446")
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

          

       <div className = "Content">
       
        
          <p>
        <span className = "description">description : { this.state.task.description}</span>
          </p>
        
        <p> 
       <span className = "skills"> Required Skills : {this.state.task.requiredSkills}</span>
        </p>
        
        <p>
        <span className = "experience">Experience :{ this.state.task.yearsOfExperience} Years</span>
        </p>
        
        <p>
        <span className = "category">Category: {this.state.task.category}</span>
        </p>
        
        <p>
        <span className = "payment">Payment : {this.state.task.payment}</span>
        </p>
        
        <p>
        <span className = "partnerrate"> Rate of partner: {this.state.task.ratePartnerDoer}</span>
        </p>

        <p>
        <span className = "rateconsultancy"> Rate of Consultancy: {this.state.task.ratePartnerConsultancy }</span>
        </p>
        <p>
        <span className = "applicants" >Current applicants: {this.state.applicantsSoFar}</span>
        </p>
       
         <div className = "bara">

        <p >
        <button  onClick = {this.Submit} >Apply</button>
        </p>
        
        

        </div>

        
      

        </div>  
     
     
       
         
          
    

      
            
        )
           
  
 } 


  getUnique = (arr) =>{

  const final = [ ];

  arr.map((e,i)=> !final.includes(e) && final.push(e) )

  return final
}

Submit = () => {

  
  axios.post("https://lirten-hub-guc.herokuapp.com/api/application", {  applicantId: "5c9fe28433caec2078bfa358",
  taskId:"5caf03a293cf2015f42e2446" })
  .then(res => {
    console.log(res);
    console.log(res.data);
  });

   
 
  console.log(this.applicants)
  axios.put("https://lirten-hub-guc.herokuapp.com/api/tasks/5caf03a293cf2015f42e2446", {
      applicants:this.getUnique( [...this.applicants,"5c9fe28433caec2078bfa358"])
  })
  .then(res => {
      console.log(res);
      console.log(res.data)
      this.setState(state => ({
          
          currentApplicants: [...state.currentApplicants,this.applicants],
          applicantsSoFar:this.applicants.length
      }))
      
  });


  window.setTimeout(this.refresh,300);
      
    alert("Applied successfully");
    
}


refresh = () => {
  window.location.reload()
}
}



export default Applyfortasks
