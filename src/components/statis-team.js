import React from 'react';

export function Statis({ teamKind, weight, height }) {
    return (
        <div>
            <h3>Statistics</h3>
            <p><span>Team Kind: </span>{teamKind}</p>
            <p><span>Weight: </span>{weight}</p>
            <p><span>Height: </span>{height}</p>
        </div>
    );
}