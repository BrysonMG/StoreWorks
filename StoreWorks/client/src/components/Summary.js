import React, { useState, useEffect } from 'react';
import { getAllSales } from '../modules/saleManager';
import { getAllReceived } from '../modules/receivedManager';
import { getAllShrink } from '../modules/shrinkManager';
import { getAllProducts } from '../modules/productManager';
import { SoldCard } from './SoldCard';
import { ReceivedCard } from './ReceivedCard';
import { ShrinkCard } from './ShrinkCard';
import '../styles/summary.css';
import '../styles/tables.css';


export const Summary = () => {
    const [sales, setSales] = useState([]);
    const [received, setReceived] = useState([]);
    const [shrink, setShrink] = useState([]);
    const [products, setProducts] = useState([]);

    const getTotalReceivedCost = () => {
        let totalCost = 0.00;
        for (const eachRec of received) {
            totalCost += parseFloat(eachRec.receivedTotal)
        }
        return totalCost.toFixed(2);
    }

    const getTotalSalesIncome = () => {
        let totalIncome = 0.00;
        for (const eachSale of sales) {
            totalIncome += parseFloat(eachSale.saleTotal)
        }
        return totalIncome.toFixed(2);
    }

    const getTotalShrinkLoss = () => {
        let totalLoss = 0.00;
        for (const eachShrink of shrink) {
            totalLoss += parseFloat(eachShrink.shrinkTotal)
        }
        return totalLoss.toFixed(2);
    }

    const getNetGainOrLoss = () => {
        const netTotal = (getTotalSalesIncome() - getTotalReceivedCost() - getTotalShrinkLoss());
        return netTotal.toFixed(2);
    }

    const getOnHandValue = () => {
        let totalValue = 0.00;
        for (const eachProd of products) {
            totalValue += parseFloat(eachProd.sellPrice);
        }
        return totalValue.toFixed(2);
    }

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

    const getProducts = () => {
        getAllProducts().then(allProducts => {
            setProducts(allProducts)
        })
    }

    useEffect(() => {
        getSales();
        getReceived();
        getShrink();
        getProducts();
    }, [])

    return (
        <div className="summaryContainer">
            <div className="scrollBox">
                <table>
                    <thead>
                        <tr>
                            <th className="tableLabel" colSpan='3'>Products Received</th>
                        </tr>
                        <tr>
                            <th className="tableLabel" colSpan='3'>Total Cost: ${getTotalReceivedCost()}</th>
                        </tr>
                        <tr className="tableSubLabel">
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {received.map(rec => {
                            return <ReceivedCard key={rec.id} received={rec} />
                        })}
                    </tbody>
                </table>
            </div>

            <div className="scrollBox">
                <table>
                    <thead>
                        <tr>
                            <th className="tableLabel" colSpan='3'>Products Sold</th>
                        </tr>
                        <tr>
                            <th className="tableLabel" colSpan='3'>Total Income: ${getTotalSalesIncome()}</th>
                        </tr>
                        <tr className="tableSubLabel">
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Sold For</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {
                            return <SoldCard key={sale.id} sale={sale} />
                        })}
                    </tbody>
                </table>
            </div>

            <div className="scrollBox">
                <table>
                    <thead>
                        <tr>
                            <th className="tableLabel" colSpan='3'>Shrinkage</th>
                        </tr>
                        <tr>
                            <th className="tableLabel" colSpan='3'>Total Loss: ${getTotalShrinkLoss()}</th>
                        </tr>
                        <tr className="tableSubLabel">
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shrink.map(shr => {
                            return <ShrinkCard key={shr.id} shrink={shr} />
                        })}
                    </tbody>
                </table>
            </div>

            <div className="smallTables">
                <div className="scrollBox">
                    <table>
                        <thead>
                            <tr>
                                <th className="tableLabel">Net Profit(+) / Loss(-)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>$ {getNetGainOrLoss()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="scrollBox">
                    <table>
                        <thead>
                            <tr>
                                <th className="tableLabel">Current Inventory Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>$ {getOnHandValue()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}