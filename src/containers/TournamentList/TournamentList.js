import React, {Component} from 'react'
import classes from './TournamentList.css'
import My_map from '../../components/Map/Map'


export default class TournamentList extends Component
{
    render() {
        console.log("rendering")
        return (
            <div className={classes.TournamentList}>
                <div>
                    <h1>Наши турниры &nbsp;
                        <i className="fas fa-medal"></i>
                    </h1>
                    <My_map/>
                </div>
            </div>
        )

    }
}