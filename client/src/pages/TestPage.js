// THIS is Just A Test Page, And Will be removed Later
import { React, useState, useRef } from "react";
import Alert from "../Components/Alert.js";
import Button from "react-bootstrap/Button";

const TestPage = () => {
  const [open, setOpen] = useState(false);
  const alertBox = useRef();

  const handleBtnClick = () => {
    // alertBox.somefunc();
    console.log(alertBox);

    // setOpen(true);
    // setTimeout(
    //   ()=> setOpen(false),
    //   3000
    // )
  };

  return (
    <>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>

      <Alert
        open={open}
        setOpen={setOpen}
        title="monkey"
        desc="someDEsc"
        duration={3000}
      />
      <Button onClick={handleBtnClick}> Click me </Button>
    </>
  );
};

export default TestPage;
