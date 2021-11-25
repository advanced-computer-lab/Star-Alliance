import React from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';

const Footer = () =>{

    const foo = {
        backgroundColor: "#96AAD7",
        marginTop: "1rem",
        padding: "1rem",
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%"
      };

      const icons = {
        marginRight:"1rem"
      };

    return(
    <>
  <MDBFooter className='footer text-white text-center text-lg-left' style={foo}>
     
        <MDBRow>
            <span>Get connected with us on social networks:</span>
            <div className="text-cnter mt-3">
            <SocialIcon style={icons} url="https://twitter.com/jaketrent" />
            <SocialIcon style={icons} url="https://facebook.com/jaketrent" />
            <SocialIcon style={icons} url="https://linkedin.com/jaketrent" />
            </div>
        </MDBRow>

      <div className='text-center p-3' style={{color:"#0000FF"}}>
        &copy; {new Date().getFullYear()} 
      </div>
    </MDBFooter>

    </>
    );
}
export default Footer;