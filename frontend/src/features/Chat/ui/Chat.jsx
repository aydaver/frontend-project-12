import Channels from "./Channels";
import ExitButton from "./additionalUI/ExitButton";
import CommonHeader from "../../../common/ui/CommonHeader";
import React from 'react';
import { ToastContainer } from 'react-toastify';

const Chat = () => {
    return  <div className="h-100">
                <CommonHeader><ExitButton/></CommonHeader>
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                    <Channels/>
                </div>
            </div>
}

export default Chat;
