import React from 'react';
import {
    useParams
  } from "react-router-dom";

function find(hero, id) {
    return hero.find(h => h.id === id);
}

function Hero() {
    let { id } = useParams()
    var team = JSON.parse(localStorage.getItem('team'));
    let hero = find(team, id);

    let sty = {
        font: {fontWeight: "bold"}   
    };

    return (
        <div className="container">
            <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src={hero.image.url} alt={hero.name} />
                <div className="card-body">
                    <h5 className="card-title">{hero.name}</h5>
                    <p className="card-text"><span style={sty.font}>Weight: </span>{hero.appearance.weight[1]}</p>
                    <p className="card-text"><span style={sty.font}>Height: </span>{hero.appearance.height[1]}</p>
                    <p className="card-text"><span style={sty.font}>Aliases: </span>{hero.biography.aliases[0]}</p>
                    <p className="card-text"><span style={sty.font}>Eye color: </span>{hero.appearance['eye-color']}</p>
                    <p className="card-text"><span style={sty.font}>Hair color: </span>{hero.appearance['hair-color']}</p>
                    <p className="card-text"><span style={sty.font}>work: </span>{hero.work.occupation}</p>
                </div>
            </div>            
        </div>
    )
}

export default Hero;