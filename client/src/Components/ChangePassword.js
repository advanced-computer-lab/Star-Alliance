import { React, useState, useRef, useContext } from "react";
import FlightService from "../Services/FlightService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../Components/Alert";
import UserService from "../Services/UserService";
import { UserCtx } from "../Context/GlobalContext";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  let history = useHistory();
  const [User, setUser] = useContext(UserCtx);
  // let passFormRef = createRef();
  const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // datetime example "2016-05-18T16:00:00Z"
    // userId: UserService.getUserId(),
    const oldPassword = e.target.oldpass.value;
    const newPassword = e.target.newpass.value;
    const confirmPassword = e.target.confirmpass.value;
    if (oldPassword === newPassword) {
      setalertMessage("Old password and new password can't be same");
      setalertOpen(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setalertMessage("New password and confirm password doesn't match");
      setalertOpen(true);
      return;
    }

    const data = {
      userId: User.id,
      oldPassword,
      newPassword,
    };

    console.log("data", data);

    UserService.changePassword(data)
      .then((res) => {
        console.log(res);
        setalertMessage("Password changed successfully");
        setalertOpen(true);
        setTimeout(() => {
          history.push("/");
        }, 5000);

      })
      .catch((err) => {
        console.log(err);
        setalertMessage(err.response.data);
        setalertOpen(true);
      });

    // FlightService.passcheck(data).then((data) => {
    //   console.log("recived ===> ", data.data);
    //   console.log("new ===> ", e.target.newpass.value);
    //   console.log("verify ===> ", e.target.confirmpass.value);
    //   if (data.data) {
    //     if (e.target.newpass.value === e.target.confirmpass.value) {
    //       const data1 = {
    //         findUser: "61a35fcdfd33ed54997b5271",
    //         password: e.target.newpass.value,
    //       };
    //       console.log("newpass ===> ", data1);
    //       FlightService.updatepass(data1);
    //       showAlert("Password Changed Successfuly");
    //     } else {
    //       showAlert("New Password and Verify does not match");
    //     }
    //   } else {
    //     showAlert("Wrong current Password");
    //   }
    // });
  };

  const showAlert = (message) => {
    setalertMessage(message);
    setalertOpen(true);

    setTimeout(() => {
      setalertOpen(false);
    }, 3000);
  };
  return (
    <div class="col-md-6 offset-md-3 ">
      <Alert
        open={alertOpen}
        setOpen={setalertOpen}
        title={alertMessage}
        desc=""
      />
      <span class="anchor" id="formChangePassword"></span>
      <div >
        <div
          class="card-body"
          style={{
            backgroundColor: "#112D4E",
            fontFamily: "",
            color: "white",
            borderRadius: "2rem",            
          }}
        >
          <h3 class="mb-0">Change Password</h3>
          <br></br>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="oldpass"
                placeholder="Enter your Current Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newpass"
                placeholder="Enter your New Password"
              />
              <span
                class="form-text small text-muted"
                style={{ color: "white" }}
              >
                The password must be 8-20 characters, and must <em>not</em>{" "}
                contain spaces.
              </span>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Verify</Form.Label>
              <Form.Control
                type="password"
                name="confirmpass"
                placeholder="Enter your New Password"
              />
              <span class="form-text small text-muted">
                To confirm, type the new password again.
              </span>
            </Form.Group>
            <Button type="submit" class="btn btn-primary btn-lg float-right">
              Save
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
