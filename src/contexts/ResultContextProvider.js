import React from "react";
import { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({children}) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getResults = async(type) => {
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Key': '39da7c3abamshafeb8a897d38219p1d8cbejsn146e299bff98',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
            }
        });
        const data = await response.json();

        console.log(data);

        setResults(data);
        setIsLoading(false);    
    }

    return (
        <ResultContext.Provider value={{results, getResults, searchTerm, setSearchTerm, isLoading}} >
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);