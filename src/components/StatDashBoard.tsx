import { User } from 'rr-apilib';
import StatDashBoardStyles from '../styles/Components/StatDashBoardStyles.module.css'
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

interface Props {
    user: User;
}

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
);

export default function StatDashBoard({ user } : Props) {
    const labels: string[] = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
    let data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    if(!user) {
        return (
            <div></div>
        )
    }

    Array.from(user.resources.cache.values()).map((resource) => {
        data[resource.createdAt.getMonth()-1]++;
    });
    
    const chartData = {
        labels,
        datasets: [
            {
            label: 'enregistrement(s)',
            data: data,
            backgroundColor: 'rgba(3, 152, 158, 1)',
            }
        ]
    }

    return (
        <div className={StatDashBoardStyles.container}>
            {
                <Bar data={chartData}/>
            }
        </div>
    )
}