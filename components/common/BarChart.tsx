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
    yAxisTitle,
    pointStyle,
    showTopValues = true,
    stepSize,
    borderRadius,
    yTitleColor,
    yLabelColor,
    xLabelColor,
    showXLabels = true,
    tooltipOptions = {},
    topValueSize,
    barThickness
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
            borderRadius: borderRadius,
            backgroundColor: (ctx: any) =>
                useGradient && ctx.chart.chartArea ? getGradient(ctx.chart.ctx, ctx.chart.chartArea) : barColors[index] || "#999",
        })),
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
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
            tooltip: {
                backgroundColor: '#93C5FD',
                titleColor: '#1E3A8A',
                bodyColor: '#1E3A8A',
                ...tooltipOptions,
            },
            datalabels: {
                display: showTopValues,
                color: "black",
                anchor: "end",
                align: "top",
                font: { size: topValueSize },
                formatter: (value, context) => {
                    const datasetIndex = context.datasetIndex;
                    const dataIndex = context.dataIndex;
                    const total = data.datasets.reduce((sum, dataset) => sum + dataset.data[dataIndex], 0);
                    return datasetIndex === data.datasets.length - 1 ? `$${total}` : "";
                },
            },
        },

        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: {
                    display: showXLabels,
                    color: xLabelColor
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                grid: { drawOnChartArea: true },
                title: {
                    display: true,
                    text: yAxisTitle,
                    color: yTitleColor,
                    font: { size: 14 },
                },
                ticks: {
                    padding: 10,
                    stepSize: stepSize,
                    color: yLabelColor
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;