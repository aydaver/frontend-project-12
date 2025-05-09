import { useEffect, useState } from "react";
import { fetchChannels, addChannel, removeChannel, renameChannel } from "../../../common/channelsSlice";
import { useDispatch } from 'react-redux';
import { clearMessagesById } from "../../../common/messagesSlice";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { Row, Col, Nav, Tab, Button } from 'react-bootstrap';
import Messages from "./Messages";
import AddChannelInput from "./additionalUI/ChannellInput";
import RemovableChannel from "./additionalUI/RemovableChannel";
import ConfirmModal from "./additionalUI/ConfirmModal";
import i18next from 'i18next';
import russian from '../../../common/locales/ru';

i18next.init({
    lng: 'ru',
    resources: {
      ru: {
        translation:
          russian,
      },
    },
});

const Channels = () => {

    const [formType, setFormType] = useState('add');

    const [activeChannelId, setActiveChannelId] = useState('1');

    const [isModalShown, setModalShown] = useState(false);

    const [oldChannelName, setOldChannelName] = useState('');

    const [isDeleteModalShown, setDeleteModalShown] = useState(false);

    const dispatch = useDispatch();

    const currentUser = localStorage.getItem('username')


    useEffect(() => {
        dispatch(fetchChannels())
    }, []);


    useEffect(() => {

        const socket = io("ws://localhost:5001");
    
        socket.on('newChannel', (payload) => {
            dispatch(addChannel(payload));
            console.log(payload);
            if (currentUser === payload.createdBy) {
                setActiveChannelId(payload.id)
            }
        });
    
        return () => {
            socket.off('newChannel');
        };
        
      }, []);

    useEffect(() => {

        const socket = io("ws://localhost:5001");

        socket.on('removeChannel', (payload) => {
            dispatch(removeChannel(payload));
            dispatch(clearMessagesById(payload));
            setActiveChannelId('1');
        })

    }, [])  

    useEffect(() => {

        const socket = io("ws://localhost:5001");

        socket.on('renameChannel', (payload) => {
            dispatch(renameChannel(payload));
        });

    }, []) 

    const handleMessages = (channelId, channelName) => {
        if (activeChannelId === channelId) {
            return <Messages channelId={channelId} channelName={channelName}/>
        }
    }

    const channels = useSelector(state => state.channels.channels);

return  <Tab.Container activeKey={activeChannelId} className="" id="left-tabs-example" defaultActiveKey={activeChannelId}>
            <Row className="h-75 w-75 shadow rounded" sm={12} lg={12}>
                <Col className="rounded-left border-end" sm={3} lg={3}>
                    <div className="d-flex my-4 justify-content-between align-content-center">
                        <h4 className="py-0 my-0" style={{height: '30px'}}>{i18next.t('channelsTitle')}</h4>
                        <Button className="btn btn-primary" onClick={() => {
                            setFormType('add');
                            setModalShown(true);
                        }}>+</Button>
                        <AddChannelInput close={() => setModalShown(false)} isShown={isModalShown} title={i18next.t('addChannelTitle')} buttonTitle={i18next.t('addButton')} formType={formType} channelId={activeChannelId} oldChannelName={oldChannelName}/>
                        <ConfirmModal isShown={isDeleteModalShown} close={() => setDeleteModalShown(false)} channelId={activeChannelId}/>
                    </div>
                    <Nav variant="pills" className="flex-column w-100">
                        {channels.map((channel) => {
                            if (!channel.removable) {
                                return  <Nav.Link onClick={() => setActiveChannelId(channel.id)} className="w-100 flex-wrap p-0" style={{'--hover-color':'red'}} key={channel.id} eventKey={channel.id}>
                                            <button className ={activeChannelId === channel.id ? "text-start h-100 w-100 p-0 m-0 rounded btn btn-primary p-2" : "text-start h-100 w-100 p-0 m-0 rounde btn btn-link text-decoration-none p-2"}>
                                                {`# ${channel.name}`}
                                            </button> 
                                        </Nav.Link>
                            } else {
                                return  <Nav.Link onClick={() => setActiveChannelId(channel.id)} className="w-100 p-0 flex-wrap" key={channel.id} eventKey={channel.id}>
                                            <RemovableChannel handleFormTypeAndModal={() => {
                                                setFormType('edit');
                                                setModalShown(true);
                                                setOldChannelName(channel.name);
                                            }} 
                                            handleDeleteAcceptModal={() => setDeleteModalShown(true)}
                                            channelId={channel.id} 
                                            activeChannelId={activeChannelId} 
                                            channelName={channel.name}/>
                                        </Nav.Link>
                            }
                        })
                        }   
                    </Nav>
                </Col>
                <Col className="bg-white h-100 px-0 rounded-end" sm={9} lg={9}>
                    <Tab.Content className="h-100">
                            {channels.map((channel) => 
                            <Tab.Pane className="h-100" key={channel.id} eventKey={channel.id}> 
                                    {handleMessages(channel.id, channel.name)}
                            </Tab.Pane>
                            )} 
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
}

export default Channels;