"use client"

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "sep"],
        datasets: [
            {
                label: "Pharmacy",
                data: [70, 80, 95, 90, 75, 100, 85, 95],
                backgroundColor: "#1E3A8A",
                barThickness: 8,
            },
        ],

    };
    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 8,
                    boxHeight: 8,
                    padding: 30
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { display: false },

            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    lineWidth: 1,
                    drawOnChartArea: true,
                    drawTicks: false,
                },
                title: {
                    display: true,
                    text: "Total Expense",
                    font: { size: 16 },
                    color: "grey",
                },
                ticks: {
                    padding: 10,
                    stepSize: 30,
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
