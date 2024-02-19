import React from 'react';
import './move-history.css';

const MoveHistory = ({history}) => {
    return (
        <div className='move-history-container'>
            <ol>
                {history.map((move, index) => {
                    if (index % 2 === 0) {
                        return (
                            <li key={index}>
                                <p>{index / 2 + 1}.</p>
                                <div>{move}</div>
                                <div>{history[index + 1]}</div>
                            </li>
                        );
                    }
                })}
            </ol>
        </div>
    );
};

export default MoveHistory;
