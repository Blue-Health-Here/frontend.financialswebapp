"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    LogarithmicScale,
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    ChartDataLabels
);

const BarChart = ({
    Xlabels,
    Ylabels,
    useGradient = false,
    barColors = [],
    yAxisTitle,
    pointStyle,
    showTopValues = true,
    stepSize,
    chartMaxValue,
    borderRadius,
    yTitleColor,
    yLabelColor,
    xLabelColor,
    showXLabels = true,
    tooltipOptions = {},
    topValueSize,
    barThickness,
    useLogarithmicScale = false,
    height = "100%", 
}: any) => {

    const getGradient = (ctx: any, chartArea: any) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, "#0C1737");
        gradient.addColorStop(0.25, "#152961");
        gradient.addColorStop(0.5, "#354E96");
        gradient.addColorStop(0.75, "#7889B9");

        return gradient;
    };

    const adjustedYLabels = Object.keys(Ylabels).reduce((acc, key) => {
        acc[key] = Ylabels[key].map((value: number) => {
            if (!useLogarithmicScale && value > 0 && value < chartMaxValue * 0.01) {
                return chartMaxValue * 0.01;
            }
            return value;
        });
        return acc;
    }, {} as any);

    const data = {
        labels: Xlabels,
        datasets: Object.keys(Ylabels).map((key, index) => ({
            label: key.charAt(0).toUpperCase() + key.slice(1),
            data: useLogarithmicScale ? Ylabels[key] : adjustedYLabels[key],
            barThickness: barThickness,
            borderRadius: borderRadius,
            backgroundColor: (ctx: any) =>
                useGradient && ctx.chart.chartArea ? getGradient(ctx.chart.ctx, ctx.chart.chartArea) : barColors[index] || "#999",
            originalData: Ylabels[key],
        })),
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: showTopValues ? 20 : 0, // Add top padding if showing values
                bottom: 0
            }
        },
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    pointStyle: pointStyle,
                    boxWidth: 8,
                    boxHeight: 8,
                    padding: 20, // Reduced padding to save space
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
                font: { size: topValueSize || 10 }, // Provide a default size
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
                type: useLogarithmicScale ? 'logarithmic' : 'linear',
                beginAtZero: true,
                grid: { drawOnChartArea: true },
                title: {
                    display: true,
                    text: yAxisTitle,
                    color: yTitleColor,
                    font: { size: 12 },
                },
                ticks: {
                    padding: 5, 
                    stepSize: !useLogarithmicScale ? stepSize : undefined,
                    color: yLabelColor,
                    callback: function(value: number) {
                        if (value === 0) return '0';
                        
                        if (value >= 1000000) {
                            return '$' + (value / 1000000) + 'M';
                        } else if (value >= 1000) {
                            return '$' + (value / 1000) + 'K';
                        }
                        return '$' + value;
                    }
                },
                ...(useLogarithmicScale && {
                    min: 1,  
                    max: chartMaxValue || undefined,
                })
            },
        },
    };

    return (
        <div style={{ position: 'relative', height: height, width: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;