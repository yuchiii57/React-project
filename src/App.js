import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HyDrawer from "./HyDrawer";

import PrivilegeMang from "./PrivilegeMang/PrivilegeMang";
import Employee from "./Employee/Employee";
import Store from "./Store";
import Stockin from "./Stock/Stockin/Stockin";
import Attendance from "./Attendance/Attendance";


const App = () => {

  return (
    <Store>
      <Router>
        <div>
              <div>
                <HyDrawer />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/privilegemang" component={PrivilegeMang} />
                  <Route path="/employee" component={Employee} />
                  <Route path="/stock" component={Stockin} />
                  <Route path="/attendance" component={Attendance} />
                </Switch>
              </div>

        </div>
      </Router>
    </Store>
  );

};
const Home = () =>
  <div align="center">

  </div>;

export default App;
