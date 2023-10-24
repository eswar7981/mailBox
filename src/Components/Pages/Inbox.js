import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../Store/AuthStore";
import { useDispatch } from "react-redux";
import { Col, Form } from "react-bootstrap";
const Inbox = () => {
  const mail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.auth.sentMails);
  useEffect(() => {
    async function Data() {
      try {
        const response = await fetch(
          `https://mail-box-66aab-default-rtdb.firebaseio.com/mails/${mail}/recieved.json`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const data = await response.json();
        let itemsArray = [];
        if (!!data) {
          itemsArray = Object.keys(data).map((email) => {
            return {
              id: email,
              sentBy: data[email].sentBy,
              emailContent: data[email].emailContent,
              Date: data[email].date,
            };
          });
        }
        dispatch(authActions.setRecievedMails(itemsArray));
      } catch (err) {
        alert(err);
      }
    }
    Data();
  }, []);

  return (
    <>
      {mails.length!==0 && mails.map((email) => (
        <div className="cont">
          <Col>
            <Form.Label style={{ fontSize: "15px", fontWeight: "bold" }}>
              Recieved From:
            </Form.Label>
            <Form.Label>{mail.sentBy}</Form.Label>
          </Col>
          <Col>
            <Form.Label>{mail.emailContent}</Form.Label>
          </Col>
          <Form.Label>{mail.date}</Form.Label>
          <hr></hr>
        </div>
      ))}
    </>
  );
};
export default Inbox;
