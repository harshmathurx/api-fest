import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GoogleLoginButton } from "./components/GoogleLoginButton";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<GoogleLoginButton />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
      {/* </header> */}
    </div>
  );
}

export default App;
