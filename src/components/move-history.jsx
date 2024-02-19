import React, { useRef, useEffect } from 'react';
import './move-history.css';

const MoveHistory = ({history}) => {
    const moveHistoryRef = useRef(null);

    useEffect(() => {
        moveHistoryRef.current.scrollTop = moveHistoryRef.current.scrollHeight;
    }, [history]);

    return (
        <div className='move-history-container' 
        ref={moveHistoryRef}>
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
