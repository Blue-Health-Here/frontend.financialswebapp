"use client";
import { useEffect, useRef } from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Title, SubTitle } from "chart.js";
import { Line } from "react-chartjs-2";
import customSubtitlePlugin from "./customSubtitlePlugin";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Title, SubTitle, customSubtitlePlugin);

const ExpenseChart = () => {
    const chartRef = useRef<ChartJS<"line"> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const ctx = chart.ctx;

            if (ctx) {
                const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
                gradient.addColorStop(0, "#93C5FD");
                gradient.addColorStop(0.5, "#1E3A8A");
                gradient.addColorStop(1, "#1E3A8A");

                chart.data.datasets[0].borderColor = gradient;
                chart.data.datasets[0].borderWidth = 2;
                chart.data.datasets[0].pointRadius = 0;
                chart.data.datasets[0].backgroundColor = "transparent";
                chart.update();
            }
        }
    }, []);

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Expense",
                data: [15000, 28000, 20000, 35000, 25000, 38000],
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 0,
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: { raw: unknown }) => {
                        const value = tooltipItem.raw as number;
                        return `$ ${value.toLocaleString()}`;
                    },
                },
            },
            title: {
                display: true,
                text: "Expense",
                align: "start",
                color: "#5E5873",
                font: {
                    size: 28,
                    weight: "semibold",
                },
                padding: {
                    top: 0,
                    bottom: 5,
                },
            },
            subtitle: {
                display: true,
                text: '',
                align: 'center',
                font: {
                    size: 18,
                    weight: 'normal',
                },
                padding: {
                    top: -35,
                    bottom: 5,
                },

            },
        },
        scales: {
            x: { grid: { display: false } },
            y: {
                grid: { color: "rgba(200, 200, 200, 0.3)" },
                ticks: {
                    callback: function (value: number) {
                        return value >= 1000 ? `${value / 1000}k` : value;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Line ref={(el) => (chartRef.current = el as ChartJS<"line"> | null)} data={data} options={options} />
        </div>
    );
};

export default ExpenseChart;
