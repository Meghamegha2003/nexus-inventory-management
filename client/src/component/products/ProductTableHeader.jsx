
import { ArrowUpDown } from 'lucide-react';

const ProductTableHeader = () => {
    const headings = [
        'Product ID',
        'Product Name',
        'Description',
        'Price',
        'Quantity',
        'Category'
    ];

    return (
        <thead className="bg-white">
            <tr className="text-gray-700">
                {headings.map((heading) => (
                    <th
                        key={heading}
                        className="px-6 py-4 font-['Roboto'] font-medium text-[19px] leading-[23px] tracking-[-0.03em] text-center whitespace-nowrap"
                    >
                        <div className="inline-flex items-center gap-2">
                            <span>{heading}</span>
                            <ArrowUpDown
                                size={14}
                                strokeWidth={1.8}
                                className="text-gray-500 shrink-0"
                            />
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default ProductTableHeader;
