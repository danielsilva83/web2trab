import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../src/store";
import Auth from "./components/auth";
import Resultados from "./view/Resultados";
import Cadastrar from "./view/Cadastrar";
import DashboardHome from "./view/DashboardHome";
// import Livros from "./view/livros";
import HomePage from "./view/Home";
import Login from "./view/Login";
import Questoes from "./view/Questoes";

function Routes() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cadastrar" component={Cadastrar} />
          <Route
            exact
            path="/resultados"
            component={() => <Auth component={Resultados} redirect={Login} />}
          />
          <Route
            exact
            path="/questoes"
            component={() => <Auth component={Questoes} redirect={Login} />}
          />
          {/* <Route
            exact
            path="/livros"
            component={() => <Auth component={Livros} redirect={Login} />}
          /> */}
          <Route
            exact
            path="/home"
            component={() => (
              <Auth component={DashboardHome} redirect={Login} />
            )}
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}
export default Routes;
