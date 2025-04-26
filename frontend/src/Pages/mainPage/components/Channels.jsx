/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { fetchChannels, addChannel, removeChannel } from "../../../store/channelsSlice";
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Tab, Button } from 'react-bootstrap';
import Messages from "./Messages";
import { clearMessagesById } from "../../../store/messagesSlice";
import ChannelInput from "./ChannellInput";
import ChannelBurgerElement from "./ChannelBurgerMenu";
import CountMessages from "../../../Functions/countMessages";

const Channels = () => {
   const dispatch = useDispatch();

   const [activeChannelId, setActiveChannelId] = useState('1');

    useEffect(() => {
        dispatch(fetchChannels())
    }, []);

    useEffect(() => {

        const socket = io("ws://localhost:5002");
    
        socket.on('newChannel', (payload) => {
            dispatch(addChannel(payload));
            setActiveChannelId(payload.id)
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
            setActiveChannelId('1');
        })

    }, [])  

    const handleMessages = (channelId) => {
        if (activeChannelId === channelId) {
            return <Messages channelId={channelId}/>
        }
    }

    const channels = useSelector(state => state.channels.channels);

    return (
        <Container className="h-100 align-content-center flex-column d-flex">
            <Row className="h-100 justify-content-center" sm={12} lg={12}>
                <Col className="align-content-center h-100" sm={8} lg={8}>
                    <Row className="h-75 bg-light shadow rounded justify-content-center" sm={12} lg={12}>
                        <Col className="h-100" sm={12} lg={12}>
                            <Tab.Container activeKey={activeChannelId} className="d-flex w-100 h-100" id="left-tabs-example" defaultActiveKey={activeChannelId}>
                                <Row className="h-100" sm={12} lg={12}>
                                    <Col className="rounded-left border-end" sm={3} lg={3}>
                                        <div className="d-flex my-4 justify-content-between align-content-center">
                                            <h4 className="py-0 my-0" style={{height: '30px'}}>Каналы</h4>
                                            <ChannelInput hasButton={true} isShown={false} title="Добавить канал" buttonTitle="Добавить" type='add'/>
                                        </div>
                                        <Nav variant="pills" className="flex-column w-100">
                                            {channels.map((channel) => {
                                                if (!channel.removable) {
                                                    return  <Nav.Link onClick={() => setActiveChannelId(channel.id)} className="w-100 flex-wrap" key={channel.id} eventKey={channel.id}>
                                                                {`# ${channel.name}`}
                                                            </Nav.Link>
                                                } else {
                                                    return  <Nav.Link onClick={() => setActiveChannelId(channel.id)} className="w-100 pl-1 py-0 flex-wrap" key={channel.id} eventKey={channel.id}>
                                                                <ChannelBurgerElement channelId={channel.id} activeChannelId={activeChannelId} channelName={channel.name}/>
                                                            </Nav.Link>
                                                }
                                            })
                                            }   
                                        </Nav>
                                    </Col>
                                    <Col className="bg-white h-100 px-0" sm={9} lg={9}>
                                        <Tab.Content className="h-100">
                                                {channels.map((channel) => 
                                                <Tab.Pane className="h-100" key={channel.id} eventKey={channel.id}> 
                                                    <div className="h-100 d-flex flex-column">
                                                        <div className="bg-light py-3 shadow-sm">
                                                            <p className="pt-0 mb-0 ms-3 fw-semibold">{`# ${channel.name}`}</p>
                                                            <CountMessages channelId={channel.id}/>
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden d-flex flex-column">
                                                            {handleMessages(channel.id)}
                                                        </div>
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