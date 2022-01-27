import Login from "./components/login/Login";
import Page1 from "./components/page1/Page1";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Login />
      <Router>
        <Switch>
          <Route path="/page1" component={Page1} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
