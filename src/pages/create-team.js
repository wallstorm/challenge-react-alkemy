import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';

import axios from 'axios';

// components
import { TeamRow } from '../components/team-row';
import { GlobalTable } from '../components/global-table';

function CreateTeam() {
    const [hero, setHero] = useState([]);
    const [search, setSearch] = useState([]);
    const [team, setTeam] = useState([]);
    const [countGood, setCountGood] = useState(0);
    const [countBad, setCountBad] = useState(0);


    useEffect(() => {
        let _isMounted = true;
        
        const url = `https://superheroapi.com/api/1941857049297716/search/${hero.nameHero}`;
        
        axios.get(url)
            .then(res => {
                if (_isMounted) {
                    setSearch(res.data.results);
                };
            })
            .catch(err => {
                console.log(err)
            })
        return function cleanup() {
            return _isMounted = false;
        }
    }, [hero])

    function addHero(e) {
        
        const hero = JSON.parse(e.target.value);

        if (team.length >= 6) {
            return alert("Solo puedes incluir 6 héroes en tu equipo");
        }
        
        let flag = null; // Será true si se quiere agregar un heroe que ya fue seleccionado
        team.forEach(heros => {
            if (heros.id === hero.id) {
                flag = true;
            }
        });
        
        if (flag) {
            flag = false;
            return alert('Ya has agregado a este heroe en tu equipo');
        }
        if (hero.biography.alignment === 'good' && countGood < 3) {
            setCountGood(countGood + 1);
            setTeam([...team, hero]);
            return
        }
        if (hero.biography.alignment === 'bad' && countBad < 3) {
            setCountBad(countBad + 1);
            setTeam([...team, hero]);
            return
        } else {
            return alert('Solo se permite tener 3 heroes malos y 3 heroes buenos.');
        }
    }

    function deleteHero(e) {
        const idHero = parseInt(e.target.id);

        if (team[idHero].biography.alignment === 'good') {
            setCountGood(countGood - 1);
        } else {
            setCountBad(countBad - 1);
        }

        const temp = [...team];

        temp.splice(idHero, 1);

        setTeam(temp)
        
    }

    function createTeam() {
        
        if (team.length === 0) {
            alert("No has ingresado ningun heroe");
        } else if (team.length < 6) {
            alert("Debes ingresar 6 héroes para tu equipo");
        } else {
            localStorage.setItem('team', JSON.stringify(team));
            alert("EQUIPO CREADO... Ve a la sección 'Home' para ver a tu equipo.");
            setTeam([]);
            setSearch([]);
        }
    }

    if(search) {
        var heroes = search.map((hero, i) => {
                    return (
                        <TeamRow key={i} hero={hero} i={i} search={search} AddOrDelete={() => addHero} />
                    )
                    
                })
    }

    if(team) {
        var heroTeam = team.map((hero, i) => {
            return (
                <TeamRow key={i} hero={hero} i={i} AddOrDelete={() => deleteHero} psOrAlignment={false} />
            )
        })
    }
    
    let arrayHead = ["hero", "image", "alignment", "operation"];

    return (
        <div className="container">
            <h1>Create your favorite team of heroes</h1>
            <Formik
                initialValues={{ nameHero: '' }}
                onSubmit={async (values) => {
                    setHero(values);
                }}
            >
                <Form>
                    <label htmlFor="nameHero">Search</label>
                    <Field id="nameHero" name="nameHero" className="form-control mb-3" aria-label="Search"/>
                    <button type="submit" className="btn btn-outline-success mb-3">Search</button>
                </Form>
            </Formik>
            
            
            <GlobalTable arrayThead={arrayHead} arrayTbody={heroes} />
            <h2>Your Team</h2>

            <GlobalTable arrayThead={arrayHead} arrayTbody={heroTeam} />
            
            <button className="btn btn-primary btn-lg" type="button" onClick={createTeam}>Create Team</button>
        </div>
    );
};

export default CreateTeam;