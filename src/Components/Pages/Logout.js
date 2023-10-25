import React from 'react'
import { Form,Button } from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../Store/AuthStore'
const Logout = () => {
    const dispatch=useDispatch()
    const history=useHistory()


    const logOut=()=>{
      
        dispatch(authActions.setTokenId(false))
        dispatch(authActions.setUserEmail(''))
        history.push("./login")
    }
  return (
    <div className='cont'>
        <Col>
        <Form.Label>Are You Sure</Form.Label>
        </Col>
        <Col> <Button onClick={logOut}>Logout</Button>
      </Col>
       
       
    </div>
  )
}

export default Logout
