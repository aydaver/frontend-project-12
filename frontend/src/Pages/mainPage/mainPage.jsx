import React from 'react';
import Channels from './components/Channels';
import ExitButton from './components/ExitButton';
import CommonHeader from '../CommonComponents/commonHeader';

const MainPage = () => {
    return  <div className="h-100 bg-light">
                <CommonHeader>
                    <ExitButton/>
                </CommonHeader>
                <Channels/> 
            </div>
}

export default MainPage;
