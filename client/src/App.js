import { useContext } from "react";
import Naavbar from "./Components/Naavbar";
import Main from "./pages/Main.js";
import Footer from "./Components/Footer";
import GlobalContext, { UserCtx } from "./Context/GlobalContext.js";
import UserHomeContext from "./Context/UserHomeContext.js";

function App() {
  return (
    <GlobalContext>
      <UserHomeContext>
        <div style={{ fontFamily: "Verdana " }}>
          <Naavbar />
          <br />
          <br />
          <div style={{ marginTop: "80px" }}>
            {/*add margin top compansate for navbar*/}
            <Main />
          </div>
        </div>
        <div style={{ marginTop: "2cm" }}>
          <Footer />
        </div>
      </UserHomeContext>
    </GlobalContext>
  );
}
export default App;
