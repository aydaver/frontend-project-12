import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as Error} from 'formik';
import { Button, Modal } from "react-bootstrap";
import { schemas } from "../../../Functions/validation";
import { useSelector } from "react-redux";
import axios from "axios";

const EditChannelInput = (props) => {

    const [lgShow, setLgShow] = useState(false);

    const [errorStatus, setErrorStatus] = useState();

    const channelsExist = useSelector((state) => 
        state.channels.channels
    );

    return  <>
                {props.hasButton ? <Button className="btn btn-primary" onClick={() => setLgShow(true)}>+</Button> : <></>}
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                channelName: '',
                            }}
                            onSubmit={async (values) => {
                                const token = localStorage.getItem('token');
                                const newChannel = {name: values.channelName}
                                if (channelsExist.filter((channel) => channel.name === newChannel.name).length !== 0) {
                                    setErrorStatus('Должно быть уникальным')
                                } else {
                                    try {
                                        await axios.patch(`/api/v1/channels/${props.channelId}`, newChannel, {
                                            headers: {
                                            Authorization: `Bearer ${token}`,
                                            },
                                        }).then(() => {
                                            setLgShow(false);
                                            setErrorStatus('');
                                        })
                                    } catch (error) {
                                        setErrorStatus(error.status);
                                    }
                                }
                            }}
                            validationSchema={schemas.custom}
                        > 
                            {() => (
                                <div className="">
                                    <Form>
                                        <div style={{height: '20px'}}></div>
                                        <div className="form-group">
                                            <Field autoFocus type="channelName" id="channelName" name="channelName" className="form-control"/>
                                            <Error name="channelName">{(error) => <span className="text-danger">{error}</span>}</Error>
                                            <p className='text-danger'>{errorStatus}</p>
                                        </div>
                                        <Button type="submit" className='w-100 mt-5'>
                                            {props.buttonTitle}
                                        </Button>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            </>
        }

export default EditChannelInput;