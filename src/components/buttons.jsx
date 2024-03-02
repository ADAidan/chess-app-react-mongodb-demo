import React from 'react';
import './buttons.css';
import { faFlag, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gameOver from '../utils/gameOver';

export const ResignButton = () => {
    const handleResign = () => {
        gameOver('resign');
    };

    return (
        <button 
        className='resign-button'
        onClick={handleResign}>
            <FontAwesomeIcon icon={faFlag}/> 
            Resign
        </button>
    );
};

export const DrawButton = () => {
    const handleOfferDraw = () => {
        gameOver('draw agreed');
    };

    return (
        <button 
        className='draw-button'
        onClick={handleOfferDraw}>
            <FontAwesomeIcon icon={faHandshake}/> 
            Offer Draw
        </button>
    );
};