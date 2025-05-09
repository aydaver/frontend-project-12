import { Modal, Button } from 'react-bootstrap';
import { channelRemove } from '../../model/channelsApi';
import { toast } from 'react-toastify';
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

const ConfirmModal = (props) => {

    const token = localStorage.getItem('token');

    const handleRemoveChannel = async () => {
        try {
            await channelRemove(props.channelId, token)
            toast.success(i18next.t('channelDeleted'), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch {
            toast.error(i18next.t('connectionError'), {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
            })
        }
    }

    return  <>
                <Modal centered show={props.isShown} onHide={props.close} style={{ pointerEvents: 'none' }}>
                    <Modal.Header closeButton style={{ pointerEvents: 'none' }}>
                        <Modal.Title>{i18next.t('deleteChannelTitle')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ pointerEvents: 'none' }}>
                            <p style={{ pointerEvents: 'none' }}>{i18next.t('areYouSure')}</p>
                            <div className="align-items-center justify-content-end d-flex" style={{ pointerEvents: 'none' }}>
                                <Button className="me-3 btn-secondary" onClick={() => props.close()} style={{ pointerEvents: 'none' }}>{i18next.t('cancelButton')}</Button>
                                <Button variant='danger' type="button" onClick={() => {
                                    handleRemoveChannel();
                                    props.close();
                                }}>
                                    {i18next.t('deleteButton')}
                                </Button>
                            </div>
                    </Modal.Body>              
                </Modal>
            </>
}

export default ConfirmModal;
