import Naavbar from "./Components/Naavbar";
import Main from "./pages/Main.js";
import Footer from "./Components/Footer";

function App() {
  return (
    <div style={{ fontFamily: "cursive" }}>
      <Naavbar />
      <div style={{ marginTop: "80px" }}>
        {/*add margin top compansate for navbar*/}
        <Main />
      </div>

      <Footer />
    </div>
  );
}

export default App;
