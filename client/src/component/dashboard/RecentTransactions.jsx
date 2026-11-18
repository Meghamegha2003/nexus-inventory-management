
import { Receipt } from 'lucide-react';

const transactions = [
    ['Goods Receipt', 'GRN-000123', 'Goods Receipt from Al Noor supplies', 'Main Warehouse', '10:12 AM'],
    ['Stock Transfer', 'ST-000098', 'Goods Receipt from Al Noor supplies', 'Main Warehouse', '10:12 AM'],
    ['Stock Adjustment', 'ADJ-000099', 'Goods Receipt from Al Noor supplies', 'Main Warehouse', '10:12 AM'],
    ['Purchase Order', 'ISS-234588', 'Goods Receipt from Al Noor supplies', 'Main Warehouse', '10:12 AM'],
    ['Goods Receipt', 'GRN-000123', 'Goods Receipt from Al Noor supplies', 'Main Warehouse', '10:12 AM'],
    ['Stock Transfer', 'ST-000098', 'Goods Receipt from Al Noor supplies', 'Main Warehouse', '10:12 AM'],
];

const RecentTransactions = () => {
    return (
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">

            <div className="bg-[#302342] text-white px-3 py-2 flex justify-between">
                <h3 className="text-xs font-medium">
                    Recent Transaction
                </h3>

                <button className="text-[10px]">
                    View all
                </button>
            </div>

            <div className="p-3 overflow-x-auto">

                <table className="w-full text-left text-[10px] min-w-[650px]">

                    <thead>
                        <tr className="border-b text-gray-700">
                            {[
                                'Type',
                                'Reference No.',
                                'Description',
                                'Warehouse',
                                'Time',
                                'Status'
                            ].map((heading) => (
                                <th key={heading} className="py-2 pr-3 font-medium">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr
                                key={index}
                                className="border-b last:border-0 text-gray-600"
                            >
                                <td className="py-2 pr-2">
                                    <span className="flex items-center gap-2">
                                        <span className="bg-orange-500 p-1 rounded text-white">
                                            <Receipt size={12} />
                                        </span>

                                        {transaction[0]}
                                    </span>
                                </td>

                                <td className="py-2 pr-2">
                                    {transaction[1]}
                                </td>

                                <td className="py-2 pr-2 max-w-[130px]">
                                    {transaction[2]}
                                </td>

                                <td className="py-2 pr-2">
                                    {transaction[3]}
                                </td>

                                <td className="py-2 pr-2">
                                    {transaction[4]}
                                </td>

                                <td className="py-2">
                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </section>
    );
};

export default RecentTransactions;
