import { useState, useEffect } from "react";
import { ButtonGroup, Button, Dropdown } from "react-bootstrap";
import EditChannelInput from "./EditChannelInput";
import axios from 'axios';

const ChannelBurgerElement = (props) => {

    const token = localStorage.getItem('token');

    const [isShown, setShown] = useState(false);

    const handleRemoveChannel = async () => {
      await axios.delete(`/api/v1/channels/${props.channelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
    }
    const handleShown = () => setShown(true);

    const [isActive, setActive] = useState();

    useEffect(() => {
        const isActive = props.channelId === props.activeChannelId;
        setActive(isActive);
    }, [props.activeChannelId, props.channelId]);
    

    return (
        <>
          <EditChannelInput hasButton={false} isShown={false} title="Переименовать канал" buttonTitle="Переименовать" type='edit'/>
          <Dropdown as={ButtonGroup} className="w-100">
              <div className="w-100 d-flex justify-content-between">
                  <Button className='px-0 text-start w-100' 
                    variant={isActive ? 'primary' : 'secondary'} 
                    style={{
                      backgroundColor: 'rgba(28,28,28,0)', 
                      border: 'none', 
                      color: isActive ? 'white' : '#0d6efd',
                      overflow: 'hidden', 
                    }}
                  >
                    <span 
                      style={{
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',}} 
                      className="d-block w-100"
                    >
                      {`# ${props.channelName}`}
                    </span>
                  </Button>
              
                  <Dropdown.Toggle className='pe-0' split variant={isActive ? 'primary' : 'secondary' } style={{backgroundColor: 'rgba(28,28,28,0)', border: 'none', color: isActive ? 'white' : '#0d6efd'}} id="dropdown-split-basic"/>
              </div>
            <Dropdown.Menu >
              <Dropdown.Item as={Button} onClick={handleRemoveChannel}>Удалить</Dropdown.Item>
              <Dropdown.Item as={Button} onClick={handleShown}>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
}

export default ChannelBurgerElement;