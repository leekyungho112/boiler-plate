import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
//state 를 사용하여 인풋값에 이메일 비밀번호가 변화된 타이핑 값을 가지기 위해
//value 값을 변화 시켜줄 onchange 핸들러를 만들어 setState를 이용한다.

function LoginPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: email,
      password: password,
    };
    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>이메일</label>
        <input type="email" value={email} onChange={onChangeEmail} />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onChangePassword} />
        <br />
        <button>로그인</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
