import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router';
//import { Table, Button } from 'react-bootstrap'
import './form.css'

const getDatafromLS = () =>{
    const data = localStorage.getItem('employees');
    if(data){
        return JSON.parse(data);
    }
    else{
        return []
    }
}

const Forms = () => {

    const [employeesList, setemployeesList] = useState(getDatafromLS());

    const [Name, setName] = useState('');
    const [Emp_no, setEmp_no] = useState();
    const [location, setlocation] = useState('');
    const [iseditEmp,setiseditEmp] = useState(null);
    const [toggleSubmit, settoggleSubmit] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('employees',JSON.stringify(employeesList));
    }, [employeesList])


    const handleAddEmpSubmit = (e) =>{
        e.preventDefault();
        if(!Name && !Emp_no && !location){
            alert('Fill the data first.')
        }else 
        if(Name && Emp_no && location && !toggleSubmit){
            setemployeesList(
                employeesList.map((emp)=>{
                    if(emp.id === iseditEmp){
                        return{...emp,Name:Name,Emp_no:Emp_no,location:location}
                    }
                    return emp;
                })
            )
        } 
        else {
        let employee ={
            id:new Date().getTime().toString(),
            Name,
            Emp_no,
            location
        }
        setemployeesList([...employeesList,employee]);
        setName('');
        setEmp_no('');
        setlocation('');
    }
}

    
    
    return (
        <div>
        <form autoComplete="off" onSubmit={handleAddEmpSubmit} >
            <input placeholder='Employee Name' name="Name" id="Name" value={Name} onChange={(e)=>setName(e.target.value)}/><br /><br />
            <input  placeholder='Employee No.' name="Emp_no" id="Emp_no" value={Emp_no} onChange={(e)=>setEmp_no(e.target.value)}/><br /><br />
            <input placeholder='Location' name="location" id="location" value={location} onChange={(e)=>setlocation(e.target.value)}/><br /><br />
            <button type="submit">Submit</button>
        </form>
        <br /><br />
        </div>
    )
}

export default Forms