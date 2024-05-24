import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";
const LoginForm = ({  setLoginData }) => {
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
        return res.json().then((jsondata) => {
          setLoginData(jsondata.user);
          navigate("/home");
        });
      }
      
    });
  }
  async function signUp(values) {

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
        Or
        <Button
          type="link"
          block
          style={{ display: "inline", width: "90px", padding: "0px" }}
          onClick={showModal}
        >
          Register now!
        </Button>
        <Modal
          title="Edit Profile"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          style={{ padding: "0px" }}
          width={"600px"}
        >
          <Profile
            submitModal={handleOk}
            closeModal={handleCancel}
            buttonFunc={signUp}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
          />
        </Modal>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
