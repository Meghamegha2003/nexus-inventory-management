
import ProductTableHeader from './ProductTableHeader';
import ProductTableBody from './ProductTableBody';

const ProductTable = ({
    filteredProducts,
    loading,
    error,
    onRetry,
    onActiveChange
}) => {
    return (
        <div className="flex flex-col gap-3 max-h-[calc(100vh-190px)]">
            <div className="rounded-lg border border-[#DCE0EB] bg-white overflow-x-auto">
                <table className="w-full min-w-[1100px] table-fixed text-left text-[11px] border-separate border-spacing-0">
                    <colgroup>
                        <col className="w-[12%]" />
                        <col className="w-[14%]" />
                        <col className="w-[15%]" />
                        <col className="w-[20%]" />
                        <col className="w-[10%]" />
                        <col className="w-[14%]" />
                        <col className="w-[15%]" />
                    </colgroup>

                    <ProductTableHeader />
                </table>
            </div>

            <div className="flex-1 min-h-0 overflow-auto rounded-lg border border-[#DCE0EB] bg-white">
                <table className="w-full min-w-[1100px] table-fixed text-left text-[11px] border-separate border-spacing-0">
                    <colgroup>
                        <col className="w-[12%]" />
                        <col className="w-[14%]" />
                        <col className="w-[15%]" />
                        <col className="w-[20%]" />
                        <col className="w-[10%]" />
                        <col className="w-[14%]" />
                        <col className="w-[15%]" />
                    </colgroup>

                    <ProductTableBody
                        products={filteredProducts}
                        loading={loading}
                        error={error}
                        onRetry={onRetry}
                        onActiveChange={onActiveChange}
                    />
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
