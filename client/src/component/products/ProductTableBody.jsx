
const ProductTableBody = ({ products, loading, error }) => {
    if (loading || error || !products || products.length === 0) {
        return (
            <tbody>
                <tr>
                    <td
                        colSpan={6}
                        className={`px-6 py-8 text-center ${
                            error ? 'text-red-500' : 'text-gray-500'
                        }`}
                    >
                        {loading
                            ? 'Loading products...'
                            : error
                                ? error
                                : 'No products found.'}
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {products.map((product) => (
                <tr
                    key={product.id || product._id}
                    className="hover:bg-gray-50 transition-colors"
                >
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-100">
                        {product.id || product._id}
                    </td>

                    <td className="px-6 py-4 text-gray-800 font-medium border-b border-gray-100">
                        {product.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600 border-b border-gray-100">
                        {product.description || '-'}
                    </td>

                    <td className="px-6 py-4 text-gray-600 border-b border-gray-100">
                        ₹{product.price}
                    </td>

                    <td className="px-6 py-4 text-gray-600 border-b border-gray-100">
                        {product.quantity}
                    </td>

                    <td className="px-6 py-4 text-gray-600 border-b border-gray-100">
                        {product.category || '-'}
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default ProductTableBody;
