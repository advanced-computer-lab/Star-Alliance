import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import ImgCard from "../Components/ImgCard";
import DeletePopup from "../Components/DeletePopup";
import UpdateForm from "../Components/UpdateForm";
import CreateFlight from "../Components/CreateFlight.js";
import FlightsList from "../Components/FlightsList";
import { Link } from "react-router-dom";

const home = () => {
  const homeCardsInfo = [
    {
      title: "Create Flight",
      text: "creating new flights",
      imgsrc:
        "https://images.unsplash.com/photo-1523837157348-ffbdaccfc7de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGNyZWF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      btnText: "More",
      children: <CreateFlight />,
    },
    {
      title: "Delete Flight",
      text: "Deleting existing flights",
      imgsrc:
        "https://media.istockphoto.com/photos/business-concept-male-finger-pointing-delete-key-picture-id464515667?b=1&k=20&m=464515667&s=170667a&w=0&h=ZOliRecXTJeqdKBngcEHcGxz7JIuZYiPnyUoq0ujh18=",
      btnText: "More",
      children: (
        <DeletePopup
          name="Delete"
          title="Delete Flight"
          description="Enter the flight number you want to delete"
          btnText="Delete"
          label="Flight Number"
          color="btn btn-outline-danger"
        />
      ),
    },

    {
      title: "Update",
      text: "updating existing flights",
      imgsrc:
        "https://media.istockphoto.com/photos/button-on-computer-keyboard-picture-id1146311500?b=1&k=20&m=1146311500&s=170667a&w=0&h=lAmXM845JSpofUXfiwCBURBw74y4PkB4wfJGi9iiONY=",
      btnText: "More",
      children: <UpdateForm test={"cece"} />,
    },
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <div style={{ height: "10cm" }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "10cm" }}
              src="https://media.istockphoto.com/photos/passenger-airplane-flying-above-clouds-during-sunset-picture-id155439315?b=1&k=20&m=155439315&s=170667a&w=0&h=N2BzlH2GYabhWN0LXZTqTkVODuTb8qDAESQYCPzIig8="
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Above All, We Care</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "10cm" }}
              src="https://media.istockphoto.com/photos/corporate-jet-picture-id1305805559?b=1&k=20&m=1305805559&s=170667a&w=0&h=PgS30I7bdCmaWZXC7tHeRjhAUFoiv7LDgeqJBpfVorw="
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Above All, We Care</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "10cm" }}
              src="https://images.unsplash.com/photo-1617408701769-c8a8706fd58f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGFpcmxpbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Above All, We Care</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <br></br>
      <br></br>
      
     {/*  {createdFlightSuc===true?
      <div class="alert alert-success col-8 offset-2 my-2" role="alert">
        This is a success alert—check it out!
      </div>:<></>} */}
      <div className="border d-flex align-items-center justify-content-center">
        {homeCardsInfo.map((info) => (
          <ImgCard {...info} />
        ))}
        <Card
          style={{
            width: "18rem",
            marginLeft: "1cm",
            marginRight: "1cm",
          }}
        >
          <Card.Img
            variant="top"
            style={{ height: "5cm" }}
            src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2VhcmNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
          <Card.Body>
            <Card.Title>Show All Flights</Card.Title>
            <Card.Text>showing all existing flights</Card.Text>
            <Link to="/FlightsList">
              <Button
                style={{ width: "7cm" }}
                variant="outline-primary"
                href="/FlightsList"
              >
                More
              </Button>
            </Link>
            {/* <Button
              style={{ width: "7cm" }}
              variant="outline-primary"
              href="/FlightsList"
            >
              More
            </Button> */}
          </Card.Body>
        </Card>

        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default home;

// {
//   title: "",
//   text: "",
//   imgsrc:
//     "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2VhcmNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//   btnText: "More",
//   children: <FlightsList />,
// },
