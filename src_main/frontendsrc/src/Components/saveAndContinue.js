import React from 'react';
import {Button} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import history from '../history';
import './css/saveAndContinue.css';

export class SaveAndContinue extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(){
        sessionStorage.setItem('/idverify',JSON.stringify(true));
        sessionStorage.setItem(this.props.current,JSON.stringify(false));
        return history.push('/idverify');
    }
    render(){
        return (
            <div className="sNCFullBody">
                <Container>
                    <Row>
                        <Col className="lockIconColumn"><img src={require('./lock.png')} height="25" width="25" alt="lock icon"/></Col>
                        <Col><p className="sNCBodyText">Your ID or photo will be used only for KYC purpose</p></Col>
                    </Row>
                    <Row>
                        <Button className="saveAndContinueButton" color={this.props.active?"success":"secondary"} disabled={!this.props.active} onClick={this.handleClick} block>SAVE & CONTINUE</Button>
                    </Row>
                </Container>
            </div>
        );
    }
};