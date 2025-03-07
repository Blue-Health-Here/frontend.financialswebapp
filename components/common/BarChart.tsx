"use client";

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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = ({
    Xlabels,
    Ylabels,
    useGradient = false,
    barColors = [],
    barThickness,
    yAxisTitle,
    pointStyle,
    showTopValues = true,
    stepSize
}: any) => {
    const getGradient = (ctx: any, chartArea: any) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, "#0C1737");
        gradient.addColorStop(0.25, "#152961");
        gradient.addColorStop(0.5, "#354E96");
        gradient.addColorStop(0.75, "#7889B9");

        return gradient;
    };

    const data = {
        labels: Xlabels,
        datasets: Object.keys(Ylabels).map((key, index) => ({
            label: key.charAt(0).toUpperCase() + key.slice(1),
            data: Ylabels[key],
            barThickness: barThickness,
            borderRadius: 10,
            backgroundColor: (ctx: any) =>
                useGradient && ctx.chart.chartArea ? getGradient(ctx.chart.ctx, ctx.chart.chartArea) : barColors[index] || "#999",
        })),
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    pointStyle: pointStyle,
                    boxWidth: 8,
                    boxHeight: 8,
                    padding: 30,
                    borderRadius: 50,
                },
            },
            datalabels: showTopValues
                ? {
                    color: "black",
                    anchor: "end",
                    align: "top",
                    font: { weight: "bold", size: 12 },
                    formatter: (value, context) => {
                        const datasetIndex = context.datasetIndex;
                        const dataIndex = context.dataIndex;
                        const total = data.datasets.reduce((sum, dataset) => sum + dataset.data[dataIndex], 0);
                        return datasetIndex === data.datasets.length - 1 ? `$${total}` : "";
                    },
                }
                : false,
        },

        scales: {
            x: {
                stacked: true,
                grid: { display: false },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                grid: { drawOnChartArea: true },
                title: {
                    display: true,
                    text: yAxisTitle,
                    font: { size: 14 },
                },
                ticks: {
                    padding: 10,
                    stepSize: stepSize,
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
