import React from 'react';
import './buttons.css';
import { faFlag, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ResignButton = () => {
    return (
        <button className='resign-button'>
            <FontAwesomeIcon icon={faFlag}/> 
            Resign
        </button>
    );
};

export const DrawButton = () => {
    return (
        <button className='draw-button'>
            <FontAwesomeIcon icon={faHandshake}/> 
            Offer Draw
        </button>
    );
};