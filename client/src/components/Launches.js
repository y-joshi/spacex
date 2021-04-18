import React from 'react';
import { useQuery, gql } from '@apollo/client';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery{
        launches{
            flight_number
            mission_name
            launch_year
            launch_date_utc
            details
            launch_success
        }
    }
`;

function Launches() {
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);
    if (loading) return <h1>Loading...</h1>;
    if (error) return `Error! ${error.message}`;

    return (
        <React.Fragment>
            <h1 className="display-4 my-3">Launches</h1>
            <MissionKey />
            {
                data.launches.map(launch => (
                    <LaunchItem key={launch.flight_number} launch={launch} />
                ))
            }

        </React.Fragment>
    )
}

export default Launches
