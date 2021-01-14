import DropImage from "./DropImage";
import Movies from "./Movies";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/"
          render = {routeProps => <DropImage {...routeProps}/>}
        />

        <Route exact path="/results/:name"
          render = {routeProps => <Movies {...routeProps}/>}
        />

      </Switch>
    </BrowserRouter>
  );
}


export default App;
