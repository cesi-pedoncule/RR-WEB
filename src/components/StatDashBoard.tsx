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
        switch (resource.createdAt.getMonth()) {
            case 1:
                data[0]++;
                break;
            case 2:
                data[1]++;
                break;
            case 3:
                data[2]++;
                break;
            case 4:
                data[3]++;
                break;
            case 5:
                data[4]++;
                break;
            case 6:
                data[5]++;
                break;
            case 7:
                data[6]++;
                break;
            case 8:
                data[7]++;
                break;
            case 9:
                data[8]++;
                break;
            case 10:
                data[9]++;
                break;
            case 11:
                data[10]++;
                break;
            case 12:
                data[11]++;
                break;           
        }
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