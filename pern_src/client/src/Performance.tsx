import { DataObject } from './Types';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface Props {
	stackData: DataObject;
	allData: DataObject[];
}

const Performance = ({ stackData, allData }: Props) => {
	const [updatedData, setUpdatedData] = useState<{
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			borderColor: string;
			backgroundColor: string;
		}[];
	}>({
		labels: [],
		datasets: [
			{
				label: 'Execution Time',
				data: [],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	});

	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	const options = {
		indexAxis: 'y' as const,
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		responsive: true,
		plugins: {
			legend: {
				position: 'right' as const,
			},
		},
	};

	interface ExecutionTimeData {
		[key: string]: number;
	}

	const [executionTimeData, setExecutionTimeData] = useState<ExecutionTimeData>({});

	const labels = allData.map((el) => {
		let url = new URL('/', el.data.route);
		let urlCount = url.origin.length;
		let split = el.data.route.split('');
		let updatedRoute = split.slice(urlCount).join('');
		return updatedRoute;
	});

	const data = {
		labels,
		datasets: [
			{
				label: 'Execution Time',
				data: allData.map((el) => {
					const executionTime = el.data.executionTime;
					const numberfy = Number(executionTime.replace('s', ''));
					return numberfy;
				}),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	interface NewData {
		[key: string]: { sum: number; count: number };
	}

	useEffect(() => {
		const newData: NewData = {};
		labels.forEach((label, index) => {
			if (!newData[label]) {
				newData[label] = {
					sum: data.datasets[0].data[index],
					count: 1,
				};
			} else {
				newData[label] = {
					sum: newData[label].sum + data.datasets[0].data[index],
					count: newData[label].count + 1,
				};
			}
		});
		const averageData: { [key: string]: number } = {};
		for (const [label, { sum, count }] of Object.entries(newData)) {
			averageData[label] = sum / count;
		}
		const uniqueLabels = Object.keys(newData);
		const averageExecutionTimes = Object.values(averageData);
		const updatedData = {
			labels: uniqueLabels,
			datasets: [
				{
					label: 'Execution Time',
					data: averageExecutionTimes,
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				},
			],
		};
		setUpdatedData(updatedData);
		console.log('average data:', averageData);
		setExecutionTimeData(averageData);
	}, [allData]);

	console.log('execution time average:', executionTimeData);
	console.log('allData:', allData);

	return (
		<>
			<Bar data={updatedData} options={options} />
		</>
	);
};

export default Performance;
