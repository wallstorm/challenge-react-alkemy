import React from 'react';
import { Link } from 'react-router-dom';

export function TeamRow({ hero, i, search, AddOrDelete, psOrAlignment }) {
    let ps = hero.powerstats;
    return (
            <tr>
                <th scope="row">{hero.name}</th>
                <td>
                    <img src={hero.image.url} width="70px"  alt={hero.name}/>
                </td>
                {psOrAlignment ? 
                    <>
                        <td>{ps.combat}</td>
                        <td>{ps.durability}</td>
                        <td>{ps.intelligence}</td>
                        <td>{ps.power}</td>
                        <td>{ps.speed}</td>
                        <td>{ps.strength}</td>
                        <td><Link to={`/${hero.id}`}><button className="btn btn-info" type="button">View Details</button></Link></td>
                    </>
                : <td>{hero.biography.alignment}</td>}
                
                <td>
                    {search ?
                        <button
                            className="btn btn-success"
                            type="button"
                            value={JSON.stringify(search[i])}
                            onClick={AddOrDelete()}
                        >
                            Add Character
                        </button>
                    : 
                    <button
                        className="btn btn-danger"
                        type="button"
                        id={i}
                        onClick={AddOrDelete()}
                    >
                        Delete
                    </button>
                    }
                </td>
            </tr>
    );
}