import React, { useState, useEffect } from 'react';
import { getAllSales } from '../modules/saleManager';
import { getAllReceived } from '../modules/receivedManager';
import { getAllShrink } from '../modules/shrinkManager';


export const Summary = () => {
    const [sales, setSales] = useState([]);
    const [received, setReceived] = useState([]);
    const [shrink, setShrink] = useState([]);

    const getSales = () => {
        getAllSales().then(allSales => {
            setSales(allSales)
        })
    }

    const getReceived = () => {
        getAllReceived().then(allReceived => {
            setReceived(allReceived)
        })
    }

    const getShrink = () => {
        getAllShrink().then(allShrink => {
            setShrink(allShrink)
        })
    }

    useEffect(() => {
        getSales();
        getReceived();
        getShrink();
    }, [])
}