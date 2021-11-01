import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PopupView from "./PopupView.js";

const ImgCard = (props) => {
  const { title, text, imgsrc, btnText } = props;
  const [popupOpen, setPopupOpen] = useState(false);
  const handleBtnClick = () => {
    setPopupOpen(true);
  };
  return (
    <>
      <PopupView
        showDialog={popupOpen}
        setshowDialog={setPopupOpen}
        title={title}
      >
        {props.children}
      </PopupView>

      <Card style={{ width: "18rem"}} className="mx-4">
        <Card.Img variant="top" style={{ height: "5cm" }} src={imgsrc} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button
            style={{ width: "16rem"}}
            onClick={handleBtnClick}
            variant="outline-primary"
          >
            {btnText}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ImgCard;
