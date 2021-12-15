import { useContext } from "react";
import Naavbar from "./Components/Naavbar";
import Main from "./pages/Main.js";
import Footer from "./Components/Footer";
import GlobalContext, { UserCtx } from "./Context/GlobalContext.js";

function App() {
  return (
    <GlobalContext>
      <div style={{ fontFamily: "Verdana " }}>//Verdana
        <Naavbar />
        <div style={{ marginTop: "80px" }}>
          {/*add margin top compansate for navbar*/}
          <Main />
        </div>
      </div>
      <div style={{ marginTop: "2cm" }}>
        <Footer />
      </div>
    </GlobalContext>
  );
}
export default App;
