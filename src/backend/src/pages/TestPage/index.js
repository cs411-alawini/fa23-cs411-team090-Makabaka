import { useEffect, useState } from 'react';
import axios from 'axios';

import RestaurantReferral from '../../components/GameReferral'

const restaurantIDs = [17972286928074856000, 6439431995832154000, 14858487583252476000, 14082953212814273000, 6249083880162181000]

function TestPage() {
    const [restaurantDetails, setRestaurantDetails] = useState([]);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const requests = restaurantIDs.map((id) =>
                    axios.get(`${process.env.REACT_APP_API_URL}/api/restaurant/${id}`)
                );

                const responses = await Promise.all(requests);
                const details = responses.map((response) => response.data);
                setRestaurantDetails(details);
            } catch (error) {
                console.error('Failed to fetch restaurant details:', error);
            }
        };

        fetchRestaurantDetails();
    }, []);

    return <div>
        <h1>Test Page</h1>
        <RestaurantReferral restaurantDetails={restaurantDetails} />
    </div>;
}

export default TestPage;
