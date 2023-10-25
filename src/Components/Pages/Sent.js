import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthStore";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "./Sent.css";
const Sent = () => {
  const mailsSent = useSelector((state) => state.auth.sentMails);
  const dispatch = useDispatch();

  const mail = useSelector((state) => state.auth.email);

  useEffect(() => {
    async function Data() {
      try {
        const response = await fetch(
          `https://mail-box-66aab-default-rtdb.firebaseio.com/mails/${mail}/sent.json`,
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
              date: data[email].date,
            };
          });
        }
        dispatch(authActions.setSentMails(itemsArray));
      } catch (err) {
        alert(err);
      }
    }
    Data();
  }, []);

  return (

    <div>
      {mailsSent.length===0 &&  <div className="empty"><h1>😞No Mails were Sent</h1></div> }
      {mailsSent.map((mail) => (
        <>
          <div className="cont">
            <Col>
              <Form.Label style={{ fontSize: "15px", fontWeight: "bold" }}>
                Sent To:
              </Form.Label>
              <Form.Label>{mail.sentBy}</Form.Label>
            </Col>
            <Col>
              <Form.Label>{mail.emailContent}</Form.Label>
            </Col>
            <Form.Label>{mail.date}</Form.Label>
          </div>
          <hr></hr>
        </>
      ))}
    </div>
  );
};

export default Sent;
