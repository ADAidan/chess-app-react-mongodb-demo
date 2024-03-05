import React, { useState, useEffect } from 'react';

const Player = ({ name, elo }) => {
    return (
        <div>
            {`${name} (${elo})`}
        </div>
    )
}

export default Player;