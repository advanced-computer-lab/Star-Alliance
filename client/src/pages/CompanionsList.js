import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const CompanionsList = () => {

    const x = 3;
    
    return (
    <div class="align-items-center justify-content-center" style={{fontFamily:"cursive"}}>
      <br></br>
      <br></br>
      <br></br>

      
      <div 
        className=" mt-5 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 " //
        style={{
          borderRadius: "2rem",
          backgroundColor: "#112D4E",
          height: "auto",
        }}
      >

    
        <h1 className="mt-3 mb-2 mx-5" style={{color : "white"}} >Companions List </h1>
    
      <Row className = "col-10 mx-5" style={{color : "white"}}>
          
        <Form.Group as={Col}  controlId="formGridName">
            <Form.Label>Companion1</Form.Label>
            <Form.Control
              name="FirstName"
              placeholder="Enter companion name"
            />
          </Form.Group>
          
          

        </Row>

        <Row className = "col-10 mx-5" style={{color : "white"}}>
          
        <Form.Group as={Col}  controlId="formGridName">
            <Form.Label>Companion2</Form.Label>
            <Form.Control
              name="FirstName"
              placeholder="Enter companion name"
            />
          </Form.Group>
          
          

        </Row>

        <Row className = "col-10 mx-5" style={{color : "white"}}>
          
        <Form.Group as={Col}  controlId="formGridName">
            <Form.Label>Companion3</Form.Label>
            <Form.Control
              name="FirstName"
              placeholder="Enter companion name"
            />
          </Form.Group>
          
          

        </Row>

        <Row className = "col-10 mx-5" style={{color : "white"}}>
          
        <Form.Group as={Col}  controlId="formGridName">
            <Form.Label>Companion4</Form.Label>
            <Form.Control
              name="FirstName"
              placeholder="Enter companion name"
            />
          </Form.Group>

        </Row>
        

        <div  style={{height:"3cm",width:"19cm",marginTop:"0.8cm"}}>
        <Button  style={{marginRight:"10cm"}} variant="primary" type="confirm" >
            Confirm companions
        </Button>
        
        </div>
        

        
        


    </div>
    
    </div>

);

}

export default CompanionsList;