import { useState, useEffect } from "react";
import { ButtonGroup, Button, Dropdown } from "react-bootstrap";
import i18next from 'i18next';
import russian from '../../../Common/locales/ru';

await i18next.init({
    lng: 'ru',
    resources: {
      ru: {
        translation:
          russian,
      },
    },
});

const RemovableChannel = (props) => {

    const [isActive, setActive] = useState();

    useEffect(() => {
        const active = props.channelId === props.activeChannelId;
        setActive(active);
    }, [props.activeChannelId, props.channelId]);

    return  <Dropdown as={ButtonGroup} className="w-100">
              <div className="w-100 d-flex justify-content-between">
                  <Button 
                      className='px-0 text-start w-100' 
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
                  <Dropdown.Toggle 
                      className='pe-0' 
                      split variant={isActive ? 'primary' : 'secondary' } 
                      style={{backgroundColor: 'rgba(28,28,28,0)', 
                      border: 'none', 
                      color: isActive ? 'white' : '#0d6efd'}} 
                      id="dropdown-split-basic"
                  />
              </div>
              <Dropdown.Menu >
                <Dropdown.Item as={Button} onClick={props.handleDeleteAcceptModal}>{i18next.t('deleteButton')}</Dropdown.Item>
                <Dropdown.Item as={Button} onClick={props.handleFormTypeAndModal}>{i18next.t('renameButton')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
}

export default RemovableChannel;