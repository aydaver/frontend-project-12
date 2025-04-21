import { useSelector } from "react-redux";
import { fetchChannels } from "../../../store/channelsSlice";
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

const Channels = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchChannels())
    }, [dispatch])
    
    const channels = useSelector(state => state.channels.channels);

    return (
        <ul>
            {channels.map((channel) => <li key={channel.key}>{channel.name}</li>)}    
        </ul>
    )
}

export default Channels;