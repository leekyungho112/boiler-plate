import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    // 라우터를 사용하기 위해 최상위 컴포넌트를 묶고 시작해야한다.
    // BrowserRouter as Router, HashRouter등
    // Switch 일치하는 라우터만 랜더링
    /* route exact를 넣은 이유는 부분적으로 닮아도 같은거라고 인식을 하게되어
     첨 보는 route의 컴포넌트로 이동시켜버린다. 부분적인것만 닮아도 같은거라고
     인식하는 부분을 없애기 위해서 */
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />

          <Route path="/login" component={Auth(LoginPage, false)} />

          <Route path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
