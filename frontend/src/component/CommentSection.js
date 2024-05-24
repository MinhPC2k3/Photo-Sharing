import React, { useEffect } from "react";
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
  Button,
  Comment,
  Form,
  Header,
} from "semantic-ui-react";
import { useState } from "react";
import "../assets/styles/ContentCard.css";
import { message } from "antd";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
const CommentSection = ({ comment ,setUpdateComment,token}) => {
  const [avaPath, setAvaPath] = useState("");
  const [title,setTitle]=useState("")
  function submitComment() {
    console.log(comment);
    createComment(title)
  }
  useEffect(() => {
    console.log("cmt",comment.authorFirstName)
    setAvaPath("http://localhost:8080/" + comment.authorProfilePicture);
  }, [setAvaPath]);
  async function createComment(title) {
    await fetch("http://localhost:8080/comments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":token,
      },
      body: JSON.stringify({
        postId: comment.postId,
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
    <div>
      <Comment>
        <CommentAvatar src={avaPath} />
        <CommentContent>
          <CommentAuthor as="a">
            {comment.authorFirstName + " " + comment.authorLastName}
          </CommentAuthor>
          {/* <CommentMetadata>
          <div>Today at 5:42PM</div>
        </CommentMetadata> */}
          <CommentText>{comment.body}</CommentText>
          {/* <CommentActions>
            <CommentAction>Reply</CommentAction>
          </CommentActions> */}
        </CommentContent>
      </Comment>
      {/* <Form reply>
        <input
          //   value={password}
          placeholder="Enter your comment here"
          //   type="input"
          onChange={(ev) => {
            setTitle(ev.target.value)
            // setComment(ev.target.value)
            console.log("Title : ",title)
          }}
          className="inputBox"
          //   onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
          onClick={submitComment}
        />
      </Form> */}
    </div>
  );
};
export default CommentSection;
