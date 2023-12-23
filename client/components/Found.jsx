'use client'

import React, { useEffect, useState } from 'react';
import { IoIosRefresh } from "react-icons/io";

const Found = () => {
    const [foundPlaqueLocation, setFoundPlaqueLocation] = useState([]);
    const [originalData, setOriginalData] = useState([]); // Orijinal veriyi saklamak için ekledik
    const [filters, setFilters] = useState('');

    const api = async () => {
        const response = await fetch('http://localhost:5000/api/v1/plaque/found', {
            method: 'GET'
        });
        const result = await response.json();
        if (result.success === true) {
            setFoundPlaqueLocation(result.data);
            setOriginalData(result.data); // Orijinal veriyi burada sakladık
        }
    };

    const filterPlaques = () => {
        const filteredPlaques = originalData.filter(data => {
            return data.plaqueName.toLowerCase().includes(filters.toLowerCase());
        });
        setFoundPlaqueLocation(filteredPlaques);
    };


    useEffect(() => {
        api();
    }, []);

    useEffect(() => {
        filterPlaques();
    }, [filters, originalData]); // filters ve originalData bağımlılıklarını ekledik
    return (
        <div>
            <div className="p-8 rounded-lg">
                <h1 className="text-5xl w-full font-roboto text-black mb-16 underline underline-offset-8">Bulunan Plakalar</h1>

                <div className="flex flex-row gap-4 mt-8">
                    <input
                        onChange={(e) => setFilters(e.target.value)}
                        id="plaque"
                        type="text"
                        className="w-1/2 h-10 border rounded-xl outline-none  border-gray-200 focus:border-2"
                        placeholder="Bulunan Plakalar Tablosunu Filtrele"
                    />
                    <button
                        onClick={() => filterPlaques()}
                        className="w-40 hover:bg-blue-700 border p-2 text-white bg-blue-500  rounded-lg font-roboto"
                    >
                        Filtreleme
                    </button>
                </div>
                <div className='w-[75%] mt-6 flex flex-row items-center justify-center'>
                    <button onClick={() => api()} className='bg-blue-500 rounded-full p-2 text-white hover:bg-blue-600 font-roboto'>
                        <IoIosRefresh />
                    </button>
                </div>
                <div className="flex flex-col gap-4 mt-1">
                    <table className="flex flex-col lg:w-[75%] sm:w-[100%] xsm:w-[100%] md:w-[100%]   overflow-x-auto  rounded-lg">
                        <thead>
                            <tr className="bg-slate-700 flex flex-row items-center h-12 p-3">
                                <th className="text-white  ml-16 mr-auto">Bulunan Plakalar</th>
                                <th className="text-white mr-16 ">Konum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foundPlaqueLocation.map((data, index) => (
                                <tr key={index} className="flex flex-row items-center h-12 p-3 border">
                                    <th className="text-black ml-16 mr-auto">{data.plaqueName}</th>
                                    <th className="mr-8">{data.foundLocation[0]}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Found;
