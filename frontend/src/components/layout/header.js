import {
  Dropdown,
  Layout,
  theme as antTheme,
  Tooltip,
  Modal,
  Avatar,
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Upload,
  Row,
  Select,
  message,
} from "antd";
import { Header } from "antd/es/layout/layout";
import "../../assets/styles/Layout.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState, createElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MoonSvg } from "../../assets/img/moon.svg";
import { ReactComponent as SunSvg } from "../../assets/img/sun.svg";
import { ReactComponent as EnUsSvg } from "../../assets/img/en_US.svg";
import { ReactComponent as LanguageSvg } from "../../assets/img/language.svg";
import Profile from "../../pages/Profile";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const HeaderComponent = ({
  collapsed,
  setCollapsed,
  userName,
  setLoginData,
  profilePicture,
  setProfilePicture,
  setUpdateJson,
  token,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
  const [loading, setLoading] = useState(false);
  const showCreatePostModal = () => {
    setIsOpenCreatePost(true);
  };

  const handleOkCreatePostModal = () => {
    setIsOpenCreatePost(false);
  };

  const handleCancelCreatePostModal = () => {
    setIsOpenCreatePost(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [imgPath, setImgPath] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [postImgPath, setPostImgPath] = useState("");
  // const fetchImage = async () => {
  //   const res = await fetch("http:/localhost:8080/"+profilePicture);
  //   const imageBlob = await res.blob();
  //   const imageObjectURL = URL.createObjectURL(imageBlob);
  //   setImg(imageObjectURL);
  // };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    handleCancelCreatePostModal();
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 8,
        offset: 10,
      },
    },
  };
  const tailRightItem = {
    wrapperCol: {
      sm: {
        span: 8,
        offset: 16,
      },
    },
  };
  const props = {
    name: "file",
    action: "http://localhost:8080/upload",
    // headers: {
    //   authorization: 'authorization-text',
    // },
    beforeUpload: () => {
      console.log("Doing...");
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // console.log();
        //${info.file.response}
        setPostImgPath(info.file.response);
        message.success(`${info.file.name} file uploaded successfully `);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setPostImgPath(info.file.response);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  async function createPost(title,postPicture) {
    await fetch("http://localhost:8080/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":token,
      },
      body: JSON.stringify({
        title:title,
        postPicture:postPicture
      }),
    }).then((res) => {
      // console.log(user)
      if (res.status !== 200) {
        // setLoginError("Email is not registered.")
        message.error("Create post error!");
      } else if (res.status === 200) {
        message.success("Create post success");
        handleOkCreatePostModal();
        setUpdateJson("1234")
      }
      return res.json();
    });
  }
  const onFinish = (values) => {
    values.profilePicture=profilePicture
    handleOkCreatePostModal();
    
    createPost(values.title,postImgPath);
    
  };
  useEffect(() => {
    setImgPath("http://localhost:8080/" + `${profilePicture}`);
  }, [setImgPath]);

  return (
    <Header className="appHeader">
      <div className="Header-leading">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div style={{ alignItems: "center", display: "flex" }}>
          <p>Hi {userName}!</p>
        </div>
      </div>
      <div className="actions">
        <Button
          type="primary"
          defaultActiveColor="#d9e9ff"
          className="Create-post"
          onClick={showCreatePostModal}
        >
          Create post
        </Button>
        <Tooltip
        // title={formatMessage({
        //   id: theme === 'dark' ? 'gloabal.tips.theme.lightTooltip' : 'gloabal.tips.theme.darkTooltip',
        // })}
        >
          <span>
            {createElement(isDarkTheme ? MoonSvg : SunSvg, {
              // onClick: setIsDarkTheme(!isDarkTheme),
            })}
          </span>
        </Tooltip>
        <Dropdown
          menu={{
            // onClick: info => selectLocale(info),
            items: [
              {
                key: "en_US",
                icon: <EnUsSvg />,
                // disabled: locale === 'en_US',
                label: "English",
              },
            ],
          }}
        >
          <span>
            <LanguageSvg id="language-change" />
          </span>
        </Dropdown>
        <Dropdown
          menu={{
            // onClick: info => selectLocale(info),
            items: [
              {
                label: (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/login",{replace : true});
                    }}
                    className="logout-drop-down"
                  >
                    <p>Logout</p>
                  </span>
                ),
                key: "0",
              },
              {
                type: "divider",
              },
              {
                label: (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={showModal}
                    className="logout-drop-down"
                  >
                    <p>Edit Profile</p>
                  </span>
                ),
                key: "1",
              },
            ],
          }}
        >
          <span>
            {/* <UserOutlined /> */}
            <Avatar src={<img src={imgPath} alt="avatar" />} />
          </span>
        </Dropdown>
        {/* <input className='inputButton' type="button"  value="Sign In" onClick={handleClick}/>  */}
      </div>
      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{ padding: "0px" }}
        width={"600px"}
      >
        <Profile submitModal={handleOk} closeModal={handleCancel} />
      </Modal>
      <Modal
        title="Create post"
        open={isOpenCreatePost}
        onCancel={handleCancelCreatePostModal}
        footer={null}
        style={{ padding: "0px" }}
        width={"50%"}
        height={"600px"}
      >
        <Form style={{ width: "100%" }} onFinish={onFinish}>
          {/* <Profile submitModal={handleOk} closeModal={handleCancel} /> */}
          <Form.Item
            name="title"
            // label="What do you think?"
            rules={[]}
          >
            <Input placeholder="What's on your mind?" />
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout}
            name="profilePicture"
            style={{ width: "100%" }}
          >
            {/* <Upload maxCount={1} {...props} name="image"> */}
            <Upload
              maxCount={1}
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="http://localhost:8080/upload"
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "700px",
                    height: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <Upload
              name="file"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="http://localhost:8080/upload"
              onChange={handleChange}
            ></Upload>
          </Form.Item>
          <Form.Item {...tailRightItem}>
            <Button type="primary" htmlType="submit">
              OK
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
              className="Profile-Cancel-Btn"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Header>
  );
};

export default HeaderComponent;
