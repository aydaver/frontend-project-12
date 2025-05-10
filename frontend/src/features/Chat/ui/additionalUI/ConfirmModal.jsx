import { Modal, Button } from 'react-bootstrap'
import i18next from '../../../../common/locales/i18n'
import { channelRemove } from '../../model/channelsApi'

const ConfirmModal = (props) => {
  const token = localStorage.getItem('token')

  const handleRemoveChannel = () => {
    channelRemove(props.channelId, token)
  }

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
              handleRemoveChannel()
              props.close()
            }}
            style={{ position: 'relative' }}
          >
            {i18next.t('deleteButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmModal
