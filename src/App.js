import React, { useReducer, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import List from "./components/List";
import AddUser from "./components/addUser";

import EditUser from "./components/EditUser";

import { AnimatePresence } from "framer-motion";
import Footer from "./components/footer";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { getAllEmployees } from "./redux/user/user.action";
import { selectEmployeesDetail } from "./redux/user/user.selector";

function App({ getAllEmployees, allEmployees }) {
  const [employees, setEmployees] = useState({});
  useReducer(() => {
    const getDetails = async () => {
      await getAllEmployees();
      await setEmployees(allEmployees);
    };
    getDetails();
    getDetails();
    getDetails();
  }, [ getAllEmployees]);
  console.log(employees);

  return (
    <>
      <Header />

      <AnimatePresence exitBeforeEnter>
        <BrowserRouter>
          <Switch>
            <Route exact name="home" path="/">
              <Home />
            </Route>

            <Route path="/edit:id" name="edit">
              <EditUser />
            </Route>
            <Route path="/view" exact name="view">
              <List />
            </Route>
            <Route path="/adduser" exact name="adduser">
              <AddUser />
            </Route>
          </Switch>
        </BrowserRouter>
      </AnimatePresence>
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAllEmployees: () => dispatch(getAllEmployees()),
});
const mapStateToProps = createStructuredSelector({
  allEmployees: selectEmployeesDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
