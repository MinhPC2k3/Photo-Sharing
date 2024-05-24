import React, { useState } from "react";
import {AutoComplete,Button,Cascader,Checkbox,Col,Form,Input,InputNumber,Upload,Row,Select,message} from "antd";
// import '../assets/styles/LoginForm.css'
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const tailRightItem={
  wrapperCol:{
    sm:{
      span:8,
      offset:16,
    }
  }
  
}
function Profile({ submitModal, closeModal,buttonFunc ,profilePicture,setProfilePicture,userName,phoneNumber,userID,email}) {
  // const [profilePicture,setProfilePicture] = useState("")
  const props = {
    name: 'file',
    action: 'http://localhost:8080/upload',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    beforeUpload: ()=>{
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        // console.log();
        //${info.file.response}
        setProfilePicture(info.file.response)
        message.success(`${info.file.name} file uploaded successfully `);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
  const onFinish = (values) => {
    values.profilePicture=profilePicture
    closeModal();
    buttonFunc(values);
      
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    closeModal();
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "84",
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            min:2,
            message: "The input is not valid First Name!",
          },
          {
            required: true,
            message: "Please input your First Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            min:2,
            message: "The input is not valid Last Name!",
          },
          {
            required: true,
            message: "Please input your Last Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailFormItemLayout} name="profilePicture">
        {/* <Upload maxCount={1} {...props} name="image"> */}
        <Upload maxCount={1} name="file" {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item {...tailRightItem}>
        <Button type="primary" htmlType="submit" >
          Change
        </Button>
        <Button htmlType="button" onClick={onReset} className="Profile-Cancel-Btn">
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Profile;
