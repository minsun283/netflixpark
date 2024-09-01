import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AppLayout = () => {

  const [keyword,setKeyword]=useState("")

  const navigate = useNavigate()

  const searchByKeyword =(event)=>{
    event.preventDefault()
    navigate(`/movies?q=${keyword}`);
    setKeyword("")
  }
  return (
    <div>
    <Navbar expand="lg" className="bg-body-dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#"><img width={150} src="https://ongpng.com/wp-content/uploads/2023/04/7.Netflix-Logo-1728x734-1.png"></img></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '120px'}}
          navbarScroll
        >
          <Nav.Link href=""><Link to ="/" style={{ textDecoration: "none", color:'white',fontWeight:500,fontSize:20}}>Home</Link></Nav.Link>
          <Nav.Link href=""><Link to ="/movies" style={{ textDecoration: "none",color:'white',fontWeight:500,fontSize:20}}>Movies</Link></Nav.Link>
        
        
        </Nav>
        <Form className="d-flex" onSubmit={searchByKeyword}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={keyword}
            onChange={(event)=>setKeyword(event.target.value)}
          />
          <Button variant="outline-danger" type="submit">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 
  <Outlet/> </div> //Router 안에있는 자손들 갖고오게 도와줌
  )
}

export default AppLayout