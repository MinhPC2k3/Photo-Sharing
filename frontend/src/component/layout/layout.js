import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Divider, message } from "antd";
import HeaderComponent from "./header";
import ContentCard from "../ContentCard";
import Profile from "../../pages/Profile";
import ProfileCard from "../ProfileCard";

const { Sider, Content, Footer } = Layout;

const AppLayout = ({
  userName,
  setLoginData,
  profilePicture,
  phoneNumber,
  userID,
  email,
  token,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [screenIndex, setScreenIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [updatePost,setUpdateJson] =useState("")
  const [commentPath, setCommentPath] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
        profilePicture: values.profilePicture.file,
      }),
    }).then((res) => {
      // console.log(user)
      if (res.status !== 200) {
        // setLoginError("Email is not registered.")
        message.error("Update account error!");
      } else if (res.status === 200) {
        message.success("Update account success");
      }
      return res.json();
    });
  }
  useEffect(()=>{
  },[posts,updatePost])
  useEffect(() => {
     fetch("http://localhost:8080/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }).then((res) => {
      // console.log(user)
      if (res.status !== 200) {
        // setLoginError("Email is not registered.")
        message.error("Get post error!");
      } else if (res.status === 200) {
        return res.json().then((data) => {
          setPosts(data.posts);
          
        });
      }
    });
  }, [setPosts,updatePost]);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
              onClick: () => {
                setScreenIndex(0);
              },
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Profile",
              onClick: () => {
                setScreenIndex(1);

              },
            },
            // {
            //   key: '4',
            //   icon: <UploadOutlined />,
            //   label: 'Profile',
            // },
            // {
            //   key: '5',
            //   icon: <UploadOutlined />,
            //   label: 'About',
            // },
          ]}
        />
      </Sider>
      <Layout>
        <HeaderComponent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          userName={userName}
          setLoginData={setLoginData}
          profilePicture={profilePicture}
          token={token}
          setUpdateJson={setUpdateJson}
        />
        <Content
          className="Content"
          style={{
            minHeight: 280,
            backgroundColor: "ededed",
            padding: 15,
            overflow: "auto",
            display: "block",
          }}
        >
          {/* {screenIndex ===0 ? <><ContentCard/>
          <Divider />
          <ContentCard/>
          <Divider />
          <ContentCard/></>: <></>} */}
          {screenIndex === 0 ? (
            posts.map((post) => (
              <div>
                <ContentCard post={post} token={token}></ContentCard>
                <Divider />
              </div>
            ))
          ) : (
            <></>
          )}
          {screenIndex === 1 ? (
            <div
              className="Profile-screen"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ width: "30%" }}>
                <ProfileCard
                  userName={userName}
                  setLoginData={setLoginData}
                  profilePicture={profilePicture}
                  phoneNumber={phoneNumber}
                  userID={userID}
                  email={email}
                ></ProfileCard>
              </div>
              <div style={{ width: "40%" }}>
                <Profile
                  submitModal={() => {}}
                  closeModal={() => {}}
                  buttonFunc={signUp}
                ></Profile>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* <ContentCard/>
          <ContentCard/> */}
          {/* <ContentCard/> */}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
