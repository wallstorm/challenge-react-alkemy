import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import { Statis } from '../components/statis-team';
import { TeamRow } from '../components/team-row';
import { GlobalTable } from '../components/global-table';

function Home() {
    const [ team, setTeam ] = useState(JSON.parse(localStorage.getItem('team')));
    
    function deleteHero(e) {
        const idHero = parseInt(e.target.id);

        const temp = [...team];

        temp.splice(idHero, 1);

        setTeam(temp);
        localStorage.setItem('team', JSON.stringify(temp));
    }

    // contadores
    let count = [
        {powerStats: "combat", count: 0},
        {powerStats: "durability", count: 0},
        {powerStats: "intelligence", count: 0},
        {powerStats: "power", count: 0},
        {powerStats: "speed", count: 0},
        {powerStats: "strength", count: 0},
    ]

    // peso y altura total
    let weightTotal = 0;
    let heightTotal = 0;    

    if (team) {

        var teamHero = team.map((hero, i) => {
            let ps = hero.powerstats;
            let app = hero.appearance;

            weightTotal += parseInt(app.weight[1].slice(0, 3));
            heightTotal += parseInt(app.height[1].slice(0, 3));

            if (ps.combat !== 'null' ) {
                count[0].count += parseInt(ps.combat);
            }
            if (ps.durability !== 'null') {
                count[1].count += parseInt(ps.durability);
            }
            if (ps.intelligence !== 'null') {
                count[2].count += parseInt(ps.intelligence);
            }
            if (ps.power !== 'null') {
                count[3].count += parseInt(ps.power);
            }    
            if (ps.speed !== 'null') { 
                count[4].count += parseInt(ps.speed);
            }
            if (ps.strength !== 'null') { 
                count[5].count += parseInt(ps.strength);
            }
            
            return (
                <TeamRow key={i} psOrAlignment={true} hero={hero} i={i} AddOrDelete={() => deleteHero} />
            );
        });
    };

    // Obtenemos el mayor y el powerstat conrrespondiente
    let may = 0;
    let stat = '';
    count.forEach(function(cont) {
        if (cont.count > may) {
            may = cont.count;
            stat = cont.powerStats;
        }
    });

    // promedio de peso y altura
    let weightAverage = Math.round(weightTotal / team.length);
    let heightAverage = Math.round(heightTotal / team.length);

    // arrays
    let arrayThead = ["Hero", "Image", "Combat", "Durability", "Intelligence", "Power", "Speed", "Strength", "Operations"];
    let arrayCount = ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"];


    return (
        <div className="container">
            {team.length !== 0 ?
            <>
            <div className="row">
                <div className="col-sm"><Statis teamKind={stat} weight={weightAverage} height={heightAverage} /></div>
                <div className="col-sm"><GlobalTable arrayThead={arrayCount} count={count} /></div>
            </div>
            <div className="row ">
                <div className="col-sm"><GlobalTable arrayThead={arrayThead} arrayTbody={teamHero} /></div>
            </div>
            </>
            : <Link to="/create-team">Create your first team</Link> }
        </div>
    );
};

export default Home;