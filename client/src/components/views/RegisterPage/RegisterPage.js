import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onChangeName = (e) => {
    setName(e.currentTarget.value);
  };
  const onChangeconfirmPassword = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지않습니다.");
    }

    let body = {
      email: email,
      password: password,
      name: name,
    };
    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("회원가입에 실패했습니다.");
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
        <label>이름</label>
        <input type="text" value={name} onChange={onChangeName} />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onChangePassword} />
        <label>비밀번호확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onChangeconfirmPassword}
        />
        <br />
        <button>확인</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
