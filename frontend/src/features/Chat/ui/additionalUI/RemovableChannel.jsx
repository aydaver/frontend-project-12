import { useState, useEffect } from "react";
import { ButtonGroup, Button, Dropdown } from "react-bootstrap";
import i18next from 'i18next';
import russian from '../../../../common/locales/ru';

i18next.init({
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

    return  <Dropdown as={ButtonGroup} className={isActive ? "w-100 btn btn-primary p-0" : "w-100 p-0"}>
              <div className="w-100 m-0 p-0 d-flex justify-content-between">
                  <button 
                      className={isActive ? 'p-0 h-100 text-start w-100 btn btn-primary p-2 text-decoration-none' 
                        : 
                        'p-0 h-100 text-start w-100 btn btn-link p-2 text-decoration-none'
                      }
                  >
                    <span 
                        style={{
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap',
                        }} 
                        className="d-block w-100"
                    >
                      {`# ${props.channelName}`}
                    </span>
                  </button>   
                  <Dropdown.Toggle 
                      className='py-0 px-2' 
                      split
                      style={{
                        backgroundColor: 'rgba(28,28,28,0)', 
                        border: 'none', 
                        color: isActive ? 'white' : '#0d6efd'
                      }} 
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