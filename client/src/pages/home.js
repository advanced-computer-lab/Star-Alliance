import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import ImgCard from "../Components/ImgCard";

import UpdateForm from "../Components/UpdateForm";
import CreateFlight from "../Components/CreateFlight.js";
import FlightsList from "../Components/FlightsList";

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
      children: <h1>missing component</h1>,
    },
    {
      title: "Show All Flights",
      text: "showing all existing flights",
      imgsrc:
        "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2VhcmNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      btnText: "More",
      children: <FlightsList />,
    },
    {
      title: "Update",
      text: "updating existing flights",
      imgsrc:
        "https://media.istockphoto.com/photos/button-on-computer-keyboard-picture-id1146311500?b=1&k=20&m=1146311500&s=170667a&w=0&h=lAmXM845JSpofUXfiwCBURBw74y4PkB4wfJGi9iiONY=",
      btnText: "More",
      children: <UpdateForm />,
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
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <br></br>
      <br></br>
      <div className="border d-flex align-items-center justify-content-center">
        {homeCardsInfo.map((info) => (
          <ImgCard {...info} />
        ))}

        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default home;
