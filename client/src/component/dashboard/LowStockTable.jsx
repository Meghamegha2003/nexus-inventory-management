const LowStockTable = ({ products = [] }) => {
    const lowStockProducts = products
        .filter(product =>
            Number(product.quantity) > 0 &&
            Number(product.quantity) < Number(product.minimumStock)
        )
        .slice(0, 5);

    return (
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-[#302342] text-white px-3 py-2 flex justify-between">
                <h3 className="text-xs font-medium">Top 5 Low Stock Items</h3>
                <button className="text-[10px]">View all</button>
            </div>

            <div className="p-3 overflow-x-auto">
                <table className="w-full text-left text-[10px]">
                    <thead>
                        <tr className="border-b text-gray-700">
                            <th className="py-2 font-medium">Product</th>
                            <th className="py-2 font-medium text-center">Current Stock</th>
                            <th className="py-2 font-medium text-right">Minimum Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lowStockProducts.length ? (
                            lowStockProducts.map((product, index) => (
                                <tr
                                    key={product._id || product.id || index}
                                    className="border-b last:border-0 text-gray-600"
                                >
                                    <td className="py-2">{product.name}</td>
                                    <td className="py-2 text-center text-red-500">
                                        {product.quantity}
                                    </td>
                                    <td className="py-2 text-right">
                                        {product.minimumStock}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-gray-400">
                                    No low stock products
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default LowStockTable;