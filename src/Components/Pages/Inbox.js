import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../Store/AuthStore";
import { useDispatch } from "react-redux";
import { Col, Form ,Button} from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Inbox.css'
import { useHistory } from "react-router-dom";
const Inbox = () => {
  const history=useHistory()
  const [update,setUpdate]=useState(false)
  const mailId=useSelector((state)=>state.auth.email)
  const token=useSelector((state)=>state.auth.token)
  const mail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.auth.recievedMails);
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
              sentBy: data[email].recievedBy,
              isMailRead:data[email].isMailRead,
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
    setUpdate(false)
  }, [token,update]);

  const deleteMail=(e,id)=>{
    setUpdate(true)
    e.preventDefault()
    fetch(`https://mail-box-66aab-default-rtdb.firebaseio.com/mails/${mailId}/recieved/${id}.json`,
    {
      method:"DELETE",
      headers:{
        "Content-type":"application/json"
      },
    }).then((res)=>{
      if(res.ok){

      }else{
        console.log(res.json())
      }
    })
  }

  return (
    <>
    {mails.length===0 && <div className="empty"><h1>😞Inbox is empty</h1></div>}
      {mails.length !== 0 &&
        mails.map((email) => (
          <div className="cont">
          
            <Nav.Link as={Link} to={`${email.id}`}>
            <Col>
           {console.log(email)}
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
            <Button onClick={(e)=>(deleteMail(e,email.id))}>Delete Mail</Button>

            </Nav.Link>
            
            <hr></hr>
          </div>
        ))}
    </>
  );
};
export default Inbox;
