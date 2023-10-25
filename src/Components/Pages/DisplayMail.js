import React from "react";
import { Form, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { authActions } from "../Store/AuthStore";
const DisplayMail = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.token);
  const mails = useSelector((state) => state.auth.recievedMails);
  const params = useParams();
  const history = useHistory();
  const mail = mails.filter((mail) => mail.id === params.id);
  const goToInbox = () => {
    const changedMails = mails.filter((email) => email.id !== params.id);
    const changedMail = { ...mail[0], ["isMailRead"]: true };
    const changed = [...changedMails, changedMail];

    dispatch(authActions.setRecievedMails(changed));
    history.push("/inbox");
  };

  return (
    <div>
      <Button onClick={goToInbox}>Back</Button>
      <div className="form">{mail[0].emailContent}</div>
    </div>
  );
};

export default DisplayMail;
