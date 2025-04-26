import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const AddChannelInput = () => {

    const [lgShow, setLgShow] = useState(false);

    const [errorStatus, setErrorStatus] = useState();
    
    return <>
            <Button onClick={() => setLgShow(true)}>+</Button>

            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Добавить канал
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
                            try {
                                await axios.post('/api/v1/channels', newChannel, {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  })
                            } catch (error) {
                                setErrorStatus(error.status);
                                
                            }
                        }}
                    > 
                        {() => (
                            <div className="">
                                <Form>
                                    <div style={{height: '20px'}}></div>
                                    <div className="form-group">
                                        <label htmlFor="channelName">Название нового канала</label>
                                        <Field type="channelName" id="channelName" name="channelName" className="form-control"/>
                                        <p className='text-danger'>{errorStatus}</p>
                                    </div>
                                    <Button type="submit" className='w-100 mt-5' onClick={() => setLgShow(false)}>
                                      Добавить
                                    </Button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            </>
        }

export default AddChannelInput;