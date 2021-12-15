import React,{useState,useEffect} from 'react'
//import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
//import Forms from './form'

const getDatafromLS = () =>{
    const data = localStorage.getItem('employees');
    if(data){
        return JSON.parse(data);
    }
    else{
        return []
    }
}

function List() {

    const [employeesList, setemployeesList] = useState(getDatafromLS());

    const [Name, setName] = useState('');
    const [Emp_no, setEmp_no] = useState();
    const [location, setlocation] = useState('');
    const [iseditEmp,setiseditEmp] = useState(null);
    const [toggleSubmit, settoggleSubmit] = useState(false)


    const deleteEmp = (ind) =>{
        if(window.confirm('Are You Sure?')){
        const filteredList = employeesList.filter((emp)=>{
            return ind !== emp.id;
        })
        setemployeesList(filteredList);
        }
    }

    useEffect(() => {
        localStorage.setItem('employees',JSON.stringify(employeesList));
    }, [employeesList])

    
const editEmp = (id) =>{
    settoggleSubmit(true);
    const newEmp = employeesList.find((emp)=>{
        return emp.id === id
    })
    console.log(newEmp);
    setName(newEmp.Name);
    setEmp_no(newEmp.Emp_no);
    setlocation(newEmp.location);
     
    setiseditEmp(id);
}

const handleAddEmpSubmit = () =>{
    if(!Name && !Emp_no && !location){
        alert('Fill the data first.')
    }else 
    if(Name && Emp_no && location && toggleSubmit){
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
}
}

    return (
        <div>
            {toggleSubmit ? <form autoComplete="off" onSubmit={handleAddEmpSubmit} >
            <input placeholder='Employee Name' name="Name" id="Name" value={Name} onChange={(e)=>setName(e.target.value)}/><br /><br />
            <input  placeholder='Employee No.' name="Emp_no" id="Emp_no" value={Emp_no} onChange={(e)=>setEmp_no(e.target.value)}/><br /><br />
            <input placeholder='Location' name="location" id="location" value={location} onChange={(e)=>setlocation(e.target.value)}/><br /><br />
            <button type="submit">Submit</button>
        </form> :<div></div>}
        
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Location</th>
                            <th>Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesList.map((emp,index) => {
                        return <tr key={index}>
                            <td>{index+1}</td>
                            <td>{emp.Name}</td>
                            <td>{emp.Emp_no}</td>
                            <td>{emp.location}</td>
                            <td><Button variant='outline-primary' onClick={()=>editEmp(emp.id)}>Edit</Button> &nbsp; &nbsp;
                            <Button variant='outline-danger' onClick={()=>deleteEmp(emp.id)}>Delete</Button></td>
                        </tr>
                    })}    
                    </tbody>
                </Table>
            </div>
    )
}

export default List