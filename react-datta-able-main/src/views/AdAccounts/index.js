import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';


const AdAccount = () => {
    const [isGoogleEnabled, setIsGoogleEnabled] = useState(false);
    const [userAccountID, setUserAccountID] = useState();
    
    const buttonVariant_Disabled = { variant: 'danger', icon: 'feather icon-slash mx-1' }
    const buttonVariant_Enabled = { variant: 'success', icon: 'feather icon-slash mx-1' }

    useEffect(() => {
        // Update the document title using the browser API
        axios.get(`http://127.0.0.1:8000/google_ads/authorizedPlatforms`)
            .then( res => {
                if(res !== null){
                    if(res.data[0]?.fields.ad_platform === 'google_ads'){
                        setIsGoogleEnabled(true)
                        setUserAccountID(res.data[0]?.fields.account_id)
                    } 
                }
            })
      });

    let handleGoogleEnable = () => {
        axios.get(`http://127.0.0.1:8000/google_ads/enable`)
            .then( res => {
                window.location = res.data.authorization_url
                console.log(res);
            })
    }

    let handleGoogleDisable = () => {
        axios.get(`http://127.0.0.1:8000/google_ads/disable`)
            .then( res => {
                if(res.status == 200){
                    setIsGoogleEnabled(false)
                }
                console.log(res);
            })
    }

    return (
            <React.Fragment>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <h4 className="d-flex justify-content-between">Google Ad <i className="fa fa-check-circle 4x"></i></h4>
                            </Card.Header>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                    {
                                        isGoogleEnabled ? <Button variant={buttonVariant_Enabled.variant} icon={buttonVariant_Enabled.icon} onClick={handleGoogleDisable} className="text-capitalize">
                                                            Disable Google Ad
                                                            
                                                        </Button>  :
                                                        <Button variant={buttonVariant_Disabled.variant} icon={buttonVariant_Disabled.icon} onClick={handleGoogleEnable} className="text-capitalize">
                                                        Connect Google Ad
                                                    </Button> 
                                    } 
                                    </div>
                                    <div className="col-3">
                                        
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </React.Fragment>
    );
};

export default AdAccount;
