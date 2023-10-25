import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import { DEFAULT_BREAKPOINTS } from "react-bootstrap/esm/ThemeProvider";
const ComposeMail = () => {
  const [details, setDetails] = useState({ email: "", mailContent: "" });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const email = useSelector((state) => state.auth.email);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDetails({
      ...details,
      mailContent: editorState.getCurrentContent().getPlainText(),
    });
  };

  const setParticipantName = (e) => {
    setDetails({ ...details, email: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const d = new Date();
    const date =
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds() +
      " " +
      d.getDay() +
      "-" +
      d.getMonth() +
      "-" +
      d.getFullYear();
    const trimmedRecievedMail = details.email.replace("@gmail.com", "");
    fetch(
      `https://mail-box-66aab-default-rtdb.firebaseio.com/mails/${email}/sent.json`,
      {
        method: "POST",
        body: JSON.stringify({
          sentBy: trimmedRecievedMail,
          
          emailContent: details.mailContent,
          date: date,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
      } else {
        console.log(res.json());
      }
    });

    fetch(
      `https://mail-box-66aab-default-rtdb.firebaseio.com/mails/${trimmedRecievedMail}/recieved.json`,
      {
        method: "POST",
        body: JSON.stringify({
          recievedBy: email,
          isMailRead:false,
          emailContent: details.mailContent,
          date: date,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
      } else {
        console.log(res.json());
      }
    });

    setDetails({ email: "", mailContent: "" });
    setEditorState("");
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <Form.Label>To:</Form.Label>
        <Form.Control
          required
          type="email"
          value={details.email}
          placeholder="enter participant name"
          onChange={setParticipantName}
        ></Form.Control>

        <Editor
          required
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />

        <Button type="submit">Sent</Button>
      </form>
    </div>
  );
};

export default ComposeMail;
