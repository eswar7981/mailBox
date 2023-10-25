import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../Store/AuthStore";
import { useDispatch } from "react-redux";
import { Col, Form } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Inbox.css'
const Inbox = () => {
  const token=useSelector((state)=>state.auth.token)
  const mail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.auth.recievedMails);
  useEffect(() => {
    console.log('hii')
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
              isMailRead:false,
              sentBy: data[email].recievedBy,
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
  }, [token]);

  return (
    <>
      {mails.length !== 0 &&
        mails.map((email) => (
          <div className="cont">
          
            <Nav.Link as={Link} to={`${email.id}`}>
            <Col>
            <h1>{email.isMailRead}</h1>
              {email.isMailRead===false && <span className="dot"></span>}
              <Form.Label style={{ fontSize: "15px", fontWeight: "bold" }}>
                Recieved From:
              </Form.Label>
              <Form.Label>{email.sentBy}</Form.Label>
            </Col>
            <Col>
              <Form.Label>{email.emailContent}</Form.Label>
            </Col>
            <Form.Label>{email.date}</Form.Label>

            </Nav.Link>
            
            <hr></hr>
          </div>
        ))}
    </>
  );
};
export default Inbox;
