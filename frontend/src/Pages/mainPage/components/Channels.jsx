/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { fetchChannels, addChannel, removeChannel } from "../../../store/channelsSlice";
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Tab, Button } from 'react-bootstrap';
import Messages from "./Messages";
import { clearMessagesById } from "../../../store/messagesSlice";
import AddChannelInput from "./AddChannellInput";
import ChannelBurgerElement from "./ChannelBurgerMenu";

const Channels = () => {
   const dispatch = useDispatch();

   const [activeChannelId, setActiveChannelId] = useState('1');

    useEffect(() => {
        dispatch(fetchChannels())
    }, []);

    const handleMessages = (channelId) => {
        if (activeChannelId === channelId) {
            return <Messages channelId={channelId}/>
        }
    }

    useEffect(() => {

        const socket = io("ws://localhost:5002");
    
        socket.on('newChannel', (payload) => {
            dispatch(addChannel(payload));
        });
    
        return () => {
          socket.off('newChannel');
        };
        
      }, []);

    useEffect(() => {

        const socket = io("ws://localhost:5002");

        socket.on('removeChannel', (payload) => {
            dispatch(removeChannel(payload));
            dispatch(clearMessagesById(payload));
        })

    }, [])  

    const channels = useSelector(state => state.channels.channels);

    return (
        <Container fluid className="h-100 align-content-center flex-column d-flex">
            <Row className="h-100 justify-content-center" sm={12} lg={12}>
                <Col className="h-100 align-content-center" sm={8} lg={8}>
                    <Row className="h-75 bg-light shadow rounded justify-content-center" sm={12} lg={12}>
                        <Col className="h-100" sm={12} lg={12}>
                            <Tab.Container className="d-flex w-100 h-100" id="left-tabs-example" defaultActiveKey={activeChannelId}>
                                <Row className="h-100" sm={12} lg={12}>
                                    <Col className="rounded-left border-end h-100" sm={3} lg={3}>
                                        <div className="d-flex my-4 justify-content-between align-content-center">
                                            <h4 className="py-0 my-0" style={{height: '30px'}}>Каналы</h4>
                                            <AddChannelInput/>
                                        </div>
                                        <Nav variant="pills" className="flex-column w-100">
                                            {channels.map((channel) => {
                                                if (!channel.removable) {
                                                    return  <Nav.Link onClick={() => setActiveChannelId(channel.id)} className="w-100" key={channel.id} eventKey={channel.id}>
                                                                {`# ${channel.name}`}
                                                            </Nav.Link>
                                                } else {
                                                    return  <Nav.Link onClick={() => setActiveChannelId(channel.id)} className="w-100 pl-1 py-0" key={channel.id} eventKey={channel.id}>
                                                                <ChannelBurgerElement channelId={channel.id} activeChannelId={activeChannelId} channelName={channel.name}/>
                                                            </Nav.Link>
                                                }
                                            })
                                            }
                                            
                                        </Nav>
                                    </Col>
                                    <Col className="bg-white h-100" sm={9} lg={9}>
                                        <Tab.Content className="h-100">
                                                {channels.map((channel) => 
                                                <Tab.Pane className="h-100" key={channel.id} eventKey={channel.id}> 
                                                        <Row>
                                                            <div className="bg-light py-3 shadow-sm">
                                                                <p className="pt-0 pb-2 my-0" style={{ fontWeight: 600 }}>{`# ${channel.name}`}</p>
                                                                <p className="py-0 my-0" style={{fontSize: '15px'}}>0 сообщений</p>
                                                            </div>
                                                        </Row>
                                                        <Row className="h-100">
                                                                <div className="h-100">
                                                                    {handleMessages(channel.id)}
                                                                </div>   
                                                        </Row>
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