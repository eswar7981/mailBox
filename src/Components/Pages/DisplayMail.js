import React from "react";
import { Form, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { authActions } from "../Store/AuthStore";
const DisplayMail = () => {
  const dispatch = useDispatch();
  const email=useSelector((state)=>state.auth.email)
  const login = useSelector((state) => state.auth.token);
  const mails = useSelector((state) => state.auth.recievedMails);
  const params = useParams();
  const history = useHistory();
  const mail = mails.filter((mail) => mail.id === params.id);
  const goToInbox = (e,data) => {
    
    e.preventDefault()
   fetch(`https://mail-box-66aab-default-rtdb.firebaseio.com/mails/${email}/recieved/${params.id}.json`,{
    method:"PUT",
    body:JSON.stringify({
      recievedBy: data.sentBy,
      isMailRead:true,
      emailContent: data.emailContent,
      date: data.Date,
    }),
    "Content-type":"application/json"
   }).then((res)=>{
    if(res.ok){

    }else{
      console.log(res.json())
    }
   })


    const changedMails = mails.filter((email) => email.id !== params.id);
    const changedMail = { ...mail[0], ["isMailRead"]: true };
    const changed = [...changedMails, changedMail];

    history.push("/inbox");
  };

  return (
    <div>
      <Button onClick={(e)=>(goToInbox(e,mail[0]))}>Back</Button>
      <div className="form">{mail[0].emailContent}</div>
    </div>
  );
};

export default DisplayMail;
