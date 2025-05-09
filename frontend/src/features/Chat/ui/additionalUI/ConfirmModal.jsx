import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import { channelRemove } from '../../model/channelsApi';
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

const ConfirmModal = (props) => {
  const token = localStorage.getItem('token');

  const handleRemoveChannel = async () => {
    try {
      await channelRemove(props.channelId, token);
      toast.success(i18next.t('channelDeleted'), {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch {
      toast.error(i18next.t('connectionError'), {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <Modal size="md" aria-labelledby="example-modal-sizes-title-lg" centered show={props.isShown} onHide={props.close} style={{ position: 'fixed' }}>
      <Modal.Header closeButton>
        <Modal.Title>{i18next.t('deleteChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{i18next.t('areYouSure')}</p>
        <div className="align-items-center justify-content-end d-flex">
          <Button className="me-3 btn-secondary" onClick={() => props.close()}>{i18next.t('cancelButton')}</Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => {
  handleRemoveChannel();
  props.close();
}}
            style={{ position: 'relative' }}
          >
            {i18next.t('deleteButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
