import Naavbar from "./Components/Naavbar";
import Main from "./pages/Main.js";
import Footer from "./Components/Footer";
import GlobalContext from "./Context/GlobalContext.js";

function App() {
  return (
    <GlobalContext>
      <div style={{ fontFamily: "cursive" }}>
        <Naavbar />
        <div style={{ marginTop: "80px" }}>
          {/*add margin top compansate for navbar*/}
          <Main />
        </div>
        <Footer />
      </div>
    </GlobalContext>
  );
}

export default App;
