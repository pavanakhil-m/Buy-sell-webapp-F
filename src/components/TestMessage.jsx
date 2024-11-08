import React, { useState, useEffect } from 'react';
import { request } from '../utils/axios_helper';

export default function TestMessage() {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        request("GET", "/api/v1/test", {})
            .then((res) => {
                setData(res.data); 
            });
    }, []); 

    return (
        <div className="">
            <div className="">
                {data && data.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            
        </div>
    );
}
