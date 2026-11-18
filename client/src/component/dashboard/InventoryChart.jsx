const categoryColors = [
    '#2563eb',
    '#16a34a',
    '#f59e0b',
    '#ec4899',
    '#8b5cf6'
];

const InventoryChart = ({ products = [] }) => {
    const categoryTotals = products.reduce((result, product) => {
        const category = product.category || 'Others';
        const value = Number(product.price || 0) * Number(product.quantity || 0);

        result[category] = (result[category] || 0) + value;

        return result;
    }, {});

    const totalValue = Object.values(categoryTotals).reduce(
        (total, value) => total + value,
        0
    );

    let currentPercentage = 0;

    const categories = Object.entries(categoryTotals).map(([name, value], index) => {
        const percentage = totalValue ? (value / totalValue) * 100 : 0;
        const start = currentPercentage;

        currentPercentage += percentage;

        return {
            name,
            percentage,
            color: categoryColors[index % categoryColors.length],
            start,
            end: currentPercentage
        };
    });

    const gradient = categories.length
        ? `conic-gradient(${categories.map(cat =>
            `${cat.color} ${cat.start}% ${cat.end}%`
        ).join(', ')})`
        : '#e5e7eb';

    return (
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-[#302342] text-white px-3 py-2">
                <h3 className="text-xs font-medium">
                    Inventory Value by Category
                </h3>
            </div>

            <div className="p-3">
                <div className="flex items-center justify-around gap-3 flex-wrap">
                    <div
                        className="w-[115px] h-[115px] rounded-full shrink-0 flex items-center justify-center"
                        style={{ background: gradient }}
                    >
                        <div className="w-[65px] h-[65px] bg-white rounded-full" />
                    </div>

                    <div className="space-y-2">
                        {categories.map(cat => (
                            <div key={cat.name} className="flex items-center gap-2">
                                <span
                                    className="w-2.5 h-2.5 rounded-sm"
                                    style={{ backgroundColor: cat.color }}
                                />

                                <span className="text-[10px] text-gray-600">
                                    {cat.name}
                                </span>

                                <span className="text-[10px] font-medium ml-auto">
                                    {cat.percentage.toFixed(1)}%
                                </span>
                            </div>
                        ))}

                        {!categories.length && (
                            <p className="text-[10px] text-gray-400">
                                No category data available
                            </p>
                        )}
                    </div>
                </div>

                <p className="text-[10px] mt-3 text-gray-700">
                    Total Value: JD {totalValue.toFixed(2)}
                </p>
            </div>
        </section>
    );
};

export default InventoryChart;