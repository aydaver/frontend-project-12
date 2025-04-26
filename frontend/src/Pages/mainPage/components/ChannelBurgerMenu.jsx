import { useState, useEffect } from "react";
import { ButtonGroup, Button, Dropdown } from "react-bootstrap";
import axios from 'axios';

const ChannelBurgerElement = (props) => {

    const token = localStorage.getItem('token')

    const handleRemoveChannel = async () => {
        await axios.delete(`/api/v1/channels/${props.channelId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    }

    const [isActive, setActive] = useState();

    useEffect(() => {
        const isActive = props.channelId === props.activeChannelId;
        setActive(isActive);
    }, [props.activeChannelId, props.channelId]);
    

    return (
        <Dropdown as={ButtonGroup} className="w-100">
            <div className="w-100 justify-content-between d-flex">
                <Button className='px-0' variant={isActive ? 'primary' : 'secondary'} style={{backgroundColor: 'rgba(28,28,28,0)', border: 'none', color: isActive ? 'white' : '#0d6efd'}}>{`# ${props.channelName}`}</Button>
            
                <Dropdown.Toggle className='pe-0' split variant={isActive ? 'primary' : 'secondary' } style={{backgroundColor: 'rgba(28,28,28,0)', border: 'none', color: isActive ? 'white' : '#0d6efd'}} id="dropdown-split-basic"/>
            </div>
          <Dropdown.Menu >
            <Dropdown.Item as={Button} onClick={handleRemoveChannel}>Удалить</Dropdown.Item>
            <Dropdown.Item as={Button} >Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
}

export default ChannelBurgerElement;