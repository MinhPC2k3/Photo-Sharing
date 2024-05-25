import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Input,
  InputNumber,
  Upload,
  Row,
  Select,
  Avatar,
  Flex,
  message,
} from "antd";
import {
  CommentText,
  CommentMetadata,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentActions,
  CommentAction,
  CommentAuthor,
  FormTextArea,
  Comment,
  Button as CmtBtn,
  Form,
  Header,
} from "semantic-ui-react";
import CommentSection from "./CommentSection";
import "../assets/styles/LoginForm.css";
import logoLogin from "../assets/img/logo_app.png";
import contentImage from "../assets/img/background-aaa-stack.jpg";
import {
  UploadOutlined,
  LikeOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import "../assets/styles/ContentCard.css";
import { use } from "chai";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
function ContentCard({ post, token }) {
  const [authorImgPath, setAuthorImgPath] = useState("");
  const [postImgPath, setPostImgPath] = useState("");
  const [commentPath, setCommentPath] = useState("");
  const [comments, setComments] = useState([]);
  const [updateComment, setUpdateComment] = useState("");
  useEffect(() => {
    setAuthorImgPath("http://localhost:8080/" + post.authorProfilePicture);
  }, [setAuthorImgPath]);
  useEffect(() => {
    setPostImgPath("http://localhost:8080/" + post.postPicture);
  }, [setPostImgPath]);
  useEffect(() => {
    setCommentPath("http://localhost:8080/comments/" + post._id);
    console.log("http://localhost:8080/comments/" + post._id);
    fetch("http://localhost:8080/comments/" + post._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }).then((res) => {
      // console.log(user)
      if (res.status !== 200) {
        // setLoginError("Email is not registered.")
        message.error("Get image error!");
      } else if (res.status === 200) {
        // message.success("Get post success ");
        return res.json().then((data) => {
          if (data.comments.length !== 0) {
            setComments(data.comments);
            console.log("List ", comments);
          }
        });
      }
    });
  }, [setComments,updateComment,setUpdateComment]);
  const [title,setTitle]=useState("")
  function submitComment(title,postId) {
    createComment(title,postId)
  }
  async function createComment(title,postId) {
    await fetch("http://localhost:8080/comments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":token,
      },
      body: JSON.stringify({
        postId: postId,
        body:title,
      }),
    }).then((res) => {
      // console.log(user)
      if (res.status !== 200) {
        message.error("Create comment error!");
      } else if (res.status === 200) {
        message.success("Create comment success");
        setUpdateComment("1234")
      }
      return res.json();
    });
  }
  return (
    <div className="Card-container">
      <div className="Card-header">
        <Avatar src={authorImgPath} />
        <p>{post.authorFirstName + " " + post.authorLastName}</p>
      </div>
      <div className="Card-title">
        <p>{post.title}</p>
      </div>
      <div className="Card-picture">
        <img src={postImgPath} />
      </div>
      <Flex wrap gap="small" style={{ padding: "0 2rem" }}>
        <Button icon={<LikeOutlined />} className="Card-button">
          Like
        </Button>
        <Button icon={<CommentOutlined />} className="Card-button">
          Comment
        </Button>
      </Flex>
      <CommentGroup className="Comment-group">
        <Header as="h3" dividing>
          Comments
        </Header>
        {comments.map((comment) => (
          <CommentSection comment={comment} token={token} />
        ))}
        <Form reply>
          <input
            //   value={password}
            placeholder="Enter your comment here"
            //   type="input"
            onChange={(ev) => {
              setTitle(ev.target.value)
            }}
            className="inputBox"
            //   onKeyDown={(e) => handleKeyDown(e)}
          />
          <CmtBtn
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
            onClick={()=>{submitComment(title,post._id)}}
          />
        </Form>
      </CommentGroup>
    </div>
  );
}

export default ContentCard;
