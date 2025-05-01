import Channels from "./Channels";
import Messages from "./Messages";
import ExitButton from "./additionalUI/ExitButton";
import CommonHeader from "../../Common/ui/CommonHeader";
import React from 'react';

const Chat = () => {
    return  <div className="h-100">
                <CommonHeader><ExitButton/></CommonHeader>
                <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                    <Channels/>
                </div>
            </div>
}

export default Chat;
