import '../assets/styles/Login.css';
import logoLogin from '../assets/img/logo_app.png'
import LoginForm from '../component/LoginForm';
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Modal } from "antd";
import { json, useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";
import App from '../App';


// import BackgroundLogin from '../img/background-aaa-stack.jpg'


function LoginForm ({setLoginData,setLoginProfilePicture,setLoginPhoneNum,setLoginUserID,setLoginEmail,setLoginToken}){
  const LoginForm = () => {
    const [profilePicture, setProfilePicture] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    // const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values) => {
      login(values.email, values.password);

    };
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    // const error = () => {
    //   messageApi.open({
    //     type: 'error',
    //     content: loginError,
    //   });
    // };
    async function login(email, password) {
      await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }).then(async (res) => {
        // console.log(user)
        if (res.status === 401) {
          // setLoginError("Email is not registered.")
          message.error("Email is not registered.");
        } else if (res.status === 400) {
          // setLoginError("Password is incorrect.")
          message.error("Password is incorrect.");
        }
        if (res.status === 200) {
          setLoginToken(res.headers.get("Authorization"))
          return res.json().then((jsondata) => {
            setLoginData(jsondata.user.firstName+" "+jsondata.user.lastName);
            setLoginToken(jsondata.user.token)
            setLoginProfilePicture(jsondata.user.profilePicture)
            setLoginEmail(jsondata.user.email)
            setLoginPhoneNum(jsondata.user.phoneNumber)
            setLoginUserID(jsondata.user.id)
            console.log(jsondata.user.token)
            navigate("/home",{replace : true});
          });
        }
        
      });
    }
    async function signUp(values) {
      console.log(values);
      await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          confirmPassword: values.password,
          phoneNumber: values.phoneNumber,
          gender: values.gender,
          profilePicture: values.profilePicture,
        }),
      }).then((res) => {
        // console.log(user)
        if (res.status !== 200) {
          // setLoginError("Email is not registered.")

          message.error("Create account error!");
        } else if (res.status === 200) {
          message.success("Create account success");
          handleOk();
        }
        return res.json();
      });
    }
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        <div></div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <div className="Login">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <body className="Login-body">
        <div className="Login-content" style={{opacity:1}}>
          <div className="Container">
            <div className='Sidebar-background'>
              <div className="Login-sidebar">
                <img src={logoLogin} className="Login-logo" alt="Login logo" />
                {/* <img src={BackgroundLogin} className="Login-background" alt="Background img" /> */}
                <div className="Login-description">
                  <p className='Description-title'>PHOTO SHARING</p>
                  <p className='Description-content'>Free Access To People All Over the World</p>
                </div>
                <div className="Footer-sidebar">
                  <p>@2024-2025 PHOTO SHARING</p>
                  {/* <menu>
                    <a className="Footer-link" href=''>Privacy</a>
                    <a className="Footer-link" href=''>Legal</a>
                    <a className="Footer-link" href=''>Contact</a>
                  </menu> */}
                </div>
              </div>
            </div>
                    <div className="Login-input">
              {/* <div className="Login-quickLink">
                <p>Quick link : </p>
                <a href="">Forget User Password</a>
              </div> */}
              <div className="Login-form">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default LoginScreen;
