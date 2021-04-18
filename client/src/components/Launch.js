import React from 'react';
import { useQuery, gql } from '@apollo/client';
import classNames from 'classnames';
import {Link} from 'react-router-dom'

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!){
        launch(flight_number: $flight_number){
            flight_number
            mission_name
            launch_year
            launch_success
            details
            rocket{
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

function Launch(props) {
    let { flight_number } = props.match.params;
    flight_number = parseInt(flight_number);
    

    const { loading, error, data } = useQuery(LAUNCH_QUERY, {
        variables: { flight_number }
    });
    if (loading) return <h1>Loading...</h1>;
    if (error) return `Error! ${error.message}`;
    console.log(data);
    const {
        mission_name,
        launch_year,
        launch_success,
        details,
        rocket: {
            rocket_id,
            rocket_name,
            rocket_type
        }
    } = data.launch;
    return (
        <React.Fragment>
            <h2 className="display-4 my-3 ml-3">
                <span className="text-dark">Mission: </span>{mission_name}
            </h2>
            <h4 className="mb-3 ml-3">Launch Details</h4>
            <ul className="list-group ml-3 mr-3">
                <li className="list-group-item ">
                    Flight Number : {flight_number}
                </li>
                <li className="list-group-item ">
                    Launch Year : {launch_year}
                </li><li className="list-group-item ">
                    Launch Successful :{' '}
                    <span
                        className={classNames({
                            'text-success': launch_success,
                            'text-danger': !launch_success
                        })}
                    >
                        {launch_success ? 'Yes' : 'No'}
                    </span>
                </li><li className="list-group-item ">
                    Details: {details}
                </li>
            </ul>

            <h4 className="mb-3 mt-3 ml-3">Rocket Details</h4>
            <ul className="list-group ml-3 mr-3">
                <li className="list-group-item">
                    Rocket Id : {rocket_id}
                </li>
                <li className="list-group-item">
                   Rocket Name : {rocket_name}
                </li>
                <li className="list-group-item">
                   Rocket Type : {rocket_type}
                </li>
            </ul>
            <Link to = '/' className="btn btn-secondary ml-3 mt-3">Back</Link>
        </React.Fragment>
    )
}

export default Launch;
