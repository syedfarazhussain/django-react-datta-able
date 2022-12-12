import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';


const VerifyAccount = () => {
    let[accountID, setAccountID] = useState();
    const history = useHistory();
    let params = (new URL(document.location)).searchParams;
    let accountIds = params.get("accountIds");
    accountIds = accountIds.replace(/[\[\]']+/g,'')
    accountIds = accountIds.split(",");
   
    console.log("this is from state", accountID)

    let handleAccountIdChange = (e) => {
        setAccountID(e.target.value);
    }

    let handleFormSubmit = () => {
        
        console.log("post values to save data backend function");

        axios.post(`http://127.0.0.1:8000/google_ads/saveAccountID`,{
            'accountID': (accountID) ? accountID : accountIds[0],
            'ad_platform': 'google_ads'
        }).then( res => {
            if(res.status == 200){
                history.push('/app/AdAccount')
               console.log(res.status);
            }
                
        });
    }

    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Header>
                            <h4 className="">Select Account</h4>
                        </Card.Header>
                        <Card.Body>
                            <div className="row d-flex align-items-center">
                                <div className="col">
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Control 
                                        as="select" 
                                        onChange={handleAccountIdChange}
                                        defaultValue={accountIds[0]}
                                        >
                                        { accountIds.map((item,i) => (
                                            <option value={item} key={i}>{item}</option>
                                        ))}
                                        
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleFormSubmit}>Submit</Button>
                                </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default VerifyAccount;
