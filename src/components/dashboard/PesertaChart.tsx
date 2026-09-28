import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PesertaChart: React.FC = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Jumlah Peserta per Kelas",
      },
    },
  };

  const labels = ["Website", "Mobile", "Jaringan", "Multimedia"];

  const data = {
    labels,
    datasets: [
      {
        label: "Peserta",
        data: [55, 38, 45, 58],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <Bar options={options} data={data} />
    </div>
  );
};

export default PesertaChart;
