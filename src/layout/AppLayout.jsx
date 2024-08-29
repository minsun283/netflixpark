import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
    <Navbar expand="lg" className="bg-body-dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#"><img width={150} src="https://ongpng.com/wp-content/uploads/2023/04/7.Netflix-Logo-1728x734-1.png"></img></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '120px' }}
          navbarScroll
        >
          <Nav.Link href=""><Link to ="/">Home</Link></Nav.Link>
          <Nav.Link href=""><Link to ="/movies">Movies</Link></Nav.Link>
        
        
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-danger">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 
  <Outlet/> </div> //Router 안에있는 자손들 갖고오게 도와줌
  )
}

export default AppLayout