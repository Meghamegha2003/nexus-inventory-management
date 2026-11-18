
const ProductTableBody = ({
    products,
    loading,
    error,
    onActiveChange
}) => {
    if (loading || error || !products || products.length === 0) {
        return (
            <tbody>
                <tr>
                    <td
                        colSpan={7}
                        className={`px-4 py-8 text-center text-[15px] font-light ${
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
            {products.map((product, index) => (
                <tr
                    key={product.id || product._id}
                    className={`
                        h-[40px]
                        transition-colors duration-150
                        ${index % 2 === 0 ? 'bg-white' : 'bg-[#fff5f1]'}
                        hover:bg-[#fff0e8]
                    `}
                >
                    <td className="px-3 py-1 text-center text-[15px] font-light text-[#777] border-b border-[#f1e8e4] whitespace-nowrap">
                        {product.id || product._id}
                    </td>

                    <td className="px-3 py-1 text-center text-[15px] font-light text-[#777] border-b border-[#f1e8e4] whitespace-nowrap">
                        {product.productCode || '-'}
                    </td>

                    <td className="px-3 py-1 text-center text-[15px] font-light text-[#777] border-b border-[#f1e8e4] whitespace-nowrap">
                        {product.barcode || '-'}
                    </td>

                    <td className="px-3 py-1 text-center text-[15px] font-light text-[#777] border-b border-[#f1e8e4] whitespace-nowrap">
                        {product.productName || '-'}
                    </td>

                    <td className="px-3 py-1 text-center border-b border-[#f1e8e4]">
                        <label className="inline-flex items-center justify-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={Boolean(product.active)}
                                onChange={(e) =>
                                    onActiveChange?.(
                                        product.id || product._id,
                                        e.target.checked
                                    )
                                }
                                className="peer sr-only"
                            />

                            <span
                                className="
                                    w-[16px] h-[16px]
                                    flex items-center justify-center
                                    rounded-[3px]
                                    border border-[#ccc]
                                    bg-white
                                    transition-colors duration-150
                                    peer-checked:bg-[#ff6500]
                                    peer-checked:border-[#ff6500]
                                    peer-focus-visible:ring-2
                                    peer-focus-visible:ring-orange-300
                                "
                            >
                                <svg
                                    viewBox="0 0 16 16"
                                    className="w-[12px] h-[12px] text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        d="M3 8l3 3 7-7"
                                        className="opacity-0"
                                    />
                                </svg>
                            </span>
                        </label>
                    </td>

                    <td className="px-3 py-1 text-center text-[15px] font-light text-[#777] border-b border-[#f1e8e4] whitespace-nowrap">
                        {product.category || '-'}
                    </td>

                    <td className="px-3 py-1 text-center text-[15px] font-light text-[#777] border-b border-[#f1e8e4] whitespace-nowrap">
                        {product.brand || '-'}
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default ProductTableBody;
