import { useSelector } from "react-redux";
import { fetchChannels } from "../../../store/channelsSlice";
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Button } from 'react-bootstrap';
import Messages from "./Messages";

const Channels = () => {
   const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchChannels())
    }, [dispatch])
    
    const channels = useSelector(state => state.channels.channels);

    return (
        <Container className="h-100 align-content-center">
            <Row className="h-75 justify-content-center" sm={12}>
                <Col sm={8}>
                    <Row className="h-100 bg-light shadow rounded justify-content-center" sm={12}>
                        <Col sm={12}>
                            <Tab.Container className="d-flex w-100" id="left-tabs-example" defaultActiveKey="general">
                                <Row className="h-100" sm={12}>
                                    <Col className="rounded-left border-end h-100" sm={3}>
                                        <div className="d-flex my-4 justify-content-between align-content-center">
                                            <h4 className="py-0 my-0" style={{height: '30px'}}>Каналы</h4>
                                            <Button>+</Button>
                                        </div>
                                        <Nav variant="pills" className="flex-column w-100">
                                            {channels.map((channel) => <Nav.Link className="w-100" key={channel.name} eventKey={channel.name}>{channel.name}</Nav.Link>)}
                                        </Nav>
                                    </Col>
                                    <Col className="bg-white" sm={9}>
                                        <Tab.Content>
                                                {channels.map((channel) => 
                                                <Tab.Pane key={channel.id} eventKey={channel.name}> 
                                                    <div>
                                                        <Row>
                                                            <div className="bg-light py-3 shadow-sm">
                                                                <p className="pt-0 pb-2 my-0" style={{ fontWeight: 600 }}>{`# ${channel.name}`}</p>
                                                                <p className="py-0 my-0" style={{fontSize: '15px'}}>0 сообщений</p>
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <Messages currentChannelId={channel.id}/>
                                                        </Row>
                                                    </div>
                                                </Tab.Pane>
                                                )} 
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Channels;