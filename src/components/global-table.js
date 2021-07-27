import React from 'react';

export function GlobalTable({ arrayThead, arrayTbody, count }) {
    return (
        <table className="table table-hover ">
            <thead>
                <tr className="table-success">
                    {arrayThead.map( attributeHero => {
                        return <th key={attributeHero}>{attributeHero}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {arrayTbody ? <>{arrayTbody}</> : null}
                {count ? <tr>{count.map(counter => {
                    return <td key={counter.powerStats}>{counter.count }</td>
                })}</tr> : null}
            </tbody>
        </table>
    );
}
