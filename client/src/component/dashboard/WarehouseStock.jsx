
const WarehouseStock = () => {

    const warehouses = [
        { name: 'Main Warehouse', value: 'JD 12,312.00', items: 345, percentage: 80 },
        { name: 'Main Warehouse', value: 'JD 12,312.00', items: 345, percentage: 65 },
        { name: 'Main Warehouse', value: 'JD 12,312.00', items: 345, percentage: 55 },
        { name: 'Main Warehouse', value: 'JD 12,312.00', items: 345, percentage: 90 },
        { name: 'Main Warehouse', value: 'JD 12,312.00', items: 345, percentage: 45 },
        { name: 'Main Warehouse', value: 'JD 12,312.00', items: 345, percentage: 70 },
        { name: 'Main Warehouse', value: 'JD 12,312.00', items: 345, percentage: 85 },
    ];

    const colors = [
        '#2563eb',
        '#16a34a',
        '#f59e0b',
        '#a855f7',
        '#ef4444',
        '#16a34a',
        '#2563eb'
    ];

    return (
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">

            <div className="bg-[#302342] text-white px-3 py-2 flex justify-between">
                <h3 className="text-xs font-medium">
                    Stock Value By Warehouse
                </h3>

                <button className="text-[10px]">
                    View all
                </button>
            </div>

            <div className="p-3 overflow-x-auto">

                <table className="w-full text-left text-[10px]">

                    <thead>
                        <tr className="border-b text-gray-700">
                            <th className="py-2">Warehouse</th>
                            <th className="py-2">Stock Value by Warehouse</th>
                            <th className="py-2 text-right">Items</th>
                        </tr>
                    </thead>

                    <tbody>
                        {warehouses.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b last:border-0 text-gray-600"
                            >
                                <td className="py-2 pr-2 whitespace-nowrap">
                                    {item.name}
                                </td>

                                <td className="py-2">
                                    <div className="flex items-center gap-2">

                                        <span className="whitespace-nowrap">
                                            {item.value}
                                        </span>

                                        <div className="w-full bg-gray-100 h-1 rounded-full">
                                            <div
                                                className="h-1 rounded-full"
                                                style={{
                                                    width: `${item.percentage}%`,
                                                    backgroundColor: colors[index]
                                                }}
                                            />
                                        </div>

                                    </div>
                                </td>

                                <td className="py-2 text-right">
                                    {item.items}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </section>
    );
};

export default WarehouseStock;
