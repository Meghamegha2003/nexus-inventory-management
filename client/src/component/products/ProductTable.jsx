
import ProductTableHeader from './ProductTableHeader';
import ProductTableBody from './ProductTableBody';

const ProductTable = ({
    filteredProducts,
    loading,
    error,
    onRetry
}) => {
    return (
        <div className="flex flex-col gap-3 max-h-[calc(100vh-190px)]">

            {/* Table Header */}
            <div className="rounded-lg border border-[#DCE0EB] bg-white overflow-hidden">
                <table className="w-full min-w-[1100px] table-fixed text-left text-[11px] border-separate border-spacing-0">
                    <colgroup>
                        <col className="w-[15%]" />
                        <col className="w-[18%]" />
                        <col className="w-[27%]" />
                        <col className="w-[12%]" />
                        <col className="w-[13%]" />
                        <col className="w-[15%]" />
                    </colgroup>

                    <ProductTableHeader />
                </table>
            </div>

            {/* Table Body */}
            <div className="flex-1 min-h-0 overflow-auto rounded-lg border border-[#DCE0EB] bg-white">
                <table className="w-full min-w-[1100px] table-fixed text-left text-[11px] border-separate border-spacing-0">
                    <colgroup>
                        <col className="w-[15%]" />
                        <col className="w-[18%]" />
                        <col className="w-[27%]" />
                        <col className="w-[12%]" />
                        <col className="w-[13%]" />
                        <col className="w-[15%]" />
                    </colgroup>

                    <ProductTableBody
                        products={filteredProducts}
                        loading={loading}
                        error={error}
                        onRetry={onRetry}
                    />
                </table>
            </div>

        </div>
    );
};

export default ProductTable;
