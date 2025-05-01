import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as Error} from 'formik';
import { Button, Modal } from "react-bootstrap";
import { schemas } from "../../../Common/helpers/validation";
import { useSelector } from "react-redux";
import { channelPost, channelEdit } from "../../model/channelsApi";

const ChannelInput = (props) => {

    const [errorStatus, setErrorStatus] = useState('');

    const channelsExist = useSelector((state) => state.channels.channels);

    const handleSubmit = async (values) => {

        const token = localStorage.getItem('token');

        const newChannel = {name: values.channelName};

        if (channelsExist.filter((channel) => channel.name === newChannel.name).length !== 0) {
            setErrorStatus('Должно быть уникальным');
        } else {
            try {
                if (props.formType === 'add') {
                    channelPost(newChannel, token)
                } else if (props.formType === 'edit') {
                    channelEdit(props.channelId, newChannel, token)
                }
                props.close();
                setErrorStatus('');
            } catch (error) {
                setErrorStatus(error.status);
            }
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
                            {props.formType === 'add' ? 'Добавить канал' : 'Переименовать канал'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                channelName: props.formType === "edit" ? props.oldChannelName : '',
                            }}
                            onSubmit={(values) => handleSubmit(values)}
                            validationSchema={schemas.custom}
                        > 
                            {() => (
                                <Form>
                                    <div className="form-group mt-3">
                                        <Field autoFocus type="text" id="channelName" name="channelName" className="form-control"/>
                                        <Error name="channelName">{(error) => <span className="text-danger">{error}</span>}</Error>
                                        <p className='text-danger'>{errorStatus}</p>
                                    </div>
                                    <Button type="submit" className='w-100 mt-5'>
                                        {props.formType === 'add' ? 'Добавить' : 'Переименовать'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            </>
}

export default ChannelInput;