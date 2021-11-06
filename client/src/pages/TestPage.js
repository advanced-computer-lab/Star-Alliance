// THIS is Just A Test Page, And Will be removed Later
import { React, useState, useRef } from "react";
import Alert from "../Components/Alert.js";
import PopupView from "../Components/PopupView.js";
import Button from "react-bootstrap/Button";
import UpdateForm from "../Components/UpdateForm.js";
import ImgCard from "../Components/ImgCard.js";

const TestPage = () => {
  const [open, setOpen] = useState(false);

  const handleBtnClick = () => {
    setOpen(true);
  };

  return (
    <>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <ImgCard
        title="title"
        text="eiocjeiojceioc"
        btnText="clickme"
        imgsrc="https://images.unsplash.com/photo-1523837157348-ffbdaccfc7de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGNyZWF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      />
      <PopupView showDialog={open} setshowDialog={setOpen} title="Update Form">
        <UpdateForm />
      </PopupView>
      <Button onClick={handleBtnClick}> Click me </Button>
    </>
  );
};

export default TestPage;
