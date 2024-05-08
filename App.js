import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home/index";

import LoginForm from "./LoginForm/index";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default App;
