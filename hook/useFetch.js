import { useState, useEffect } from "react";
import axios from "axios";


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `${endpoint}`, // apenas um exemplo
        headers: {
            "X-API-Key": 'MY-EXAMPLE-API-KEY',
            "X-API-Host": "api.plantbasedap.pucminas.br", // apenas um exemplo
        },
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            console.log("options", options)
            // em uma situação real seria utilizada a API
            const response = await axios.request(options);

            console.log("fetch", response)


            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;
