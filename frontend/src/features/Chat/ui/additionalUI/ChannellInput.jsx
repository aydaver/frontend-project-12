import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as Error} from 'formik';
import { Button, Modal } from "react-bootstrap";
import { schemas } from "../../../../common/helpers/validation";
import { useSelector } from "react-redux";
import { channelPost, channelEdit } from "../../model/channelsApi";
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
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

const ChannelInput = (props) => {

    const connectionErrorToast = () => {
        toast.error(i18next.t('connectionError'), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const [errorStatus, setErrorStatus] = useState('');

    const channelsExist = useSelector((state) => state.channels.channels);

    const handleSubmit = async (values) => {

        const token = localStorage.getItem('token');

        filter.loadDictionary('ru')
        filter.loadDictionary('en')

        const newChannel = {name: filter.clean(values.channelName)};

        if (channelsExist.filter((channel) => channel.name === newChannel.name).length !== 0) {
            setErrorStatus('Должно быть уникальным');
        } else {
            if (props.formType === 'add') {
                try {
                    await channelPost(newChannel, token)
                    toast.success(i18next.t('channelAdded'), {
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
                    connectionErrorToast();
                }
            } else if (props.formType === 'edit') {
                try {
                    await channelEdit(props.channelId, newChannel, token)
                    toast.success(i18next.t('channelEdited'), {
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
                    connectionErrorToast();
                }
            }
            props.close();
            setErrorStatus('');
        }
    }

    return  <>
                <Modal
                    size="md"
                    show={props.isShown}
                    onHide={() => props.close()}
                    aria-labelledby="example-modal-sizes-title-lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {props.formType === 'add' ? i18next.t('addChannelTitle') : i18next.t('renameChannelTitle')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                channelName: props.formType === "edit" ? props.oldChannelName : '',
                            }}
                            onSubmit={(values) => handleSubmit(values)}
                            validationSchema={schemas.channel}
                        > 
                            {() => (
                                <Form>
                                    <div className="form-group mt-3">
                                        <label htmlFor="channelName">Имя канала</label>
                                        <Field autoFocus type="text" id="channelName" name="channelName" className="form-control"/>
                                        <Error name="channelName">{(error) => <span className="text-danger">{error}</span>}</Error>
                                        <p className='text-danger'>{errorStatus}</p>
                                    </div>
                                    <div className="align-items-center justify-content-end d-flex">
                                        <Button className="me-3 btn-secondary" onClick={() => props.close()}>{i18next.t('cancelButton')}</Button>
                                        <Button type="submit" className=''>
                                            {props.formType === 'add' ? i18next.t('addButton') : i18next.t('renameButton')}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            </>
}

export default ChannelInput;