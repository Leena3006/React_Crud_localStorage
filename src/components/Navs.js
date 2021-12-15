import React from 'react'
import {Navbar,Nav,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Navs() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Crud App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Button variant='outline-primary'><Link to="/">Home</Link></Button> &nbsp; &nbsp; 
                            <Button variant='outline-primary'><Link to="/form">Add</Link></Button>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navs
