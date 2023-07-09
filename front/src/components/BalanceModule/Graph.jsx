import React, { useEffect, useRef } from "react";
//import Chart from "chart.js/auto";
import { Chart, registerables } from "chart.js";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

Chart.register(...registerables);

const GraphWrapper = styled.div``;

const PieChart = ({ balanceData }) => {
        // let location = useLocation();
        const chartRef = useRef(null);
        const chartInstance = useRef(null);

        const title = balanceData[0].network;

        const labels = balanceData[0].balances.map(
                (item) => `${item.name} (${item.symbol})`
        );
        const data = balanceData[0].balances.map((item) =>
                parseFloat(item.balance * item.price).toFixed(2)
        );

        useEffect(() => {
                if (chartRef.current) {
                        if (chartInstance.current) {
                                chartInstance.current.destroy();
                                chartInstance.current = null;
                        }

                        if (chartRef.current) {
                                chartInstance.current = new Chart(
                                        chartRef.current,
                                        {
                                                type: "pie",
                                                data: {
                                                        labels: labels,
                                                        datasets: [
                                                                {
                                                                        data: data,
                                                                        backgroundColor:
                                                                                [
                                                                                        "rgba(255, 99, 132, 0.6)",
                                                                                        "rgba(54, 162, 235, 0.6)",
                                                                                        "rgba(255, 206, 86, 0.6)",
                                                                                        "rgba(75, 192, 192, 0.6)",
                                                                                        "rgba(153, 102, 255, 0.6)",
                                                                                        "rgba(255, 159, 64, 0.6)",
                                                                                ],
                                                                },
                                                        ],
                                                },
                                                options: {
                                                        plugins: {
                                                                legend: {
                                                                        display: true,
                                                                },

                                                                tooltip: {
                                                                        callbacks: {
                                                                                label: function (
                                                                                        context
                                                                                ) {
                                                                                        return ` $${context.parsed.toFixed(
                                                                                                2
                                                                                        )}`;
                                                                                },
                                                                        },
                                                                },
                                                        },
                                                },
                                        }
                                );
                        }
                }
        }, [data, labels, title]);

        return (
                <GraphWrapper>
                        <canvas ref={chartRef} />
                </GraphWrapper>
        );
};

export default PieChart;
