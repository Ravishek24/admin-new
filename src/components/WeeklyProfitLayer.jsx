import React, { useEffect, useState } from 'react';
import { getWeeklyProfit } from '../utils/apiService';

const WeeklyProfitLayer = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchWeeklyProfit();
    }, []);

    const fetchWeeklyProfit = async () => {
        try {
            const res = await getWeeklyProfit();
            setData(res?.data);
        } catch (error) {
            console.error('Error fetching user stats');
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-gray-900 text-[#ccc] rounded-lg max-w-xl mx-auto mt-6 shadow-lg w-full">
            <h2 className="text-xl font-semibold mb-2">Weekly Profit Report</h2>
            <p className="mb-4 text-sm text-gray-300">
                Week: <span className="font-medium">{data.week_start}</span> to{' '}
                <span className="font-medium">{data.week_end}</span>
            </p>

            <table className="w-[100%] text-sm text-left border border-gray-700" style={{width:'100%'}}>
                <thead className="bg-gray-800 text-gray-300">
                    <tr>
                        <th className="p-2 border border-gray-700">Game</th>
                        <th className="p-2 border border-gray-700">Total Bet</th>
                        <th className="p-2 border border-gray-700">Total Win</th>
                        <th className="p-2 border border-gray-700">Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.game_wise_profit.map((game, index) => (
                        <tr key={index} className="border-t border-gray-700">
                            <td className="p-2 border border-gray-700 capitalize">{game.game_type}</td>
                            <td className="p-2 border border-gray-700">{game.total_bet}</td>
                            <td className="p-2 border border-gray-700">{game.total_win}</td>
                            <td className="p-2 border border-gray-700">{game.profit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 text-right font-semibold text-green-400">
                Total Weekly Profit: ₹{data.total_profit}
            </div>
        </div>
    );
};

export default WeeklyProfitLayer;
