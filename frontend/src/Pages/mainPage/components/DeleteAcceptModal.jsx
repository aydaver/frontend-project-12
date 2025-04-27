import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteAcceptModal = (props) => {

    const token = localStorage.getItem('token');

    const handleRemoveChannel = async () => {
      await axios.delete(`/api/v1/channels/${props.channelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
    }


    return  <>
                <Modal centered show={props.isShown} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить канал</Modal.Title>
                </Modal.Header>
                <Modal.Body>Уверены?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.close}>
                        Отмена
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handleRemoveChannel();
                        props.close();
                    }}>
                        Удалить
                    </Button>
                </Modal.Footer>
                </Modal>
            </>
}

export default DeleteAcceptModal;