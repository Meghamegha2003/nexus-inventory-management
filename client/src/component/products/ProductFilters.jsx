import {
    Search,
    Filter,
    Plus,
    RefreshCw
} from 'lucide-react';

const filterOptions = [
    'Product ID',
    'Product Name',
    'Description',
    'Category',
    'Price',
    'Quantity'
];

const ProductFilters = ({
    search,
    setSearch,
    filterOpen,
    setFilterOpen,
    selectedFilter,
    setSelectedFilter,
    filterValue,
    setFilterValue,
    onAdd,
    onRefresh,
    loading
}) => {
    return (
        <div className="flex flex-wrap items-center gap-2 mb-4">

            <div className="relative flex-1 min-w-[180px] max-w-[320px]">
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs outline-none focus:border-blue-500"
                />
            </div>

            <div className="relative">
                <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md"
                >
                    <Filter size={15} />
                </button>

                {filterOpen && (
                    <div className="absolute top-10 left-0 z-30 w-48 bg-white border rounded-lg shadow-xl p-2">
                        <p className="text-xs font-semibold text-gray-700 px-2 py-1">
                            Filter Products
                        </p>

                        {filterOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    setSelectedFilter(option);
                                    setFilterValue('');
                                    setFilterOpen(false);
                                }}
                                className={`w-full flex justify-between items-center text-left px-2 py-2 text-xs rounded hover:bg-orange-50 ${
                                    selectedFilter === option
                                        ? 'text-orange-600 bg-orange-50'
                                        : 'text-gray-600'
                                }`}
                            >
                                {option}

                                {selectedFilter === option && '✓'}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative min-w-[160px] max-w-[210px] flex-1">
                <input
                    type="text"
                    placeholder={`Filter by ${selectedFilter}...`}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-blue-500"
                />
            </div>

            <button
                onClick={() => setFilterValue(filterValue.trim())}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-xs"
            >
                <Search size={13} />
                Search
            </button>

            <div className="flex gap-2 ml-auto">
                <button
                    onClick={onAdd}
                    className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-xs"
                >
                    <Plus size={14} />
                    Add
                </button>

                <button
                    onClick={onRefresh}
                    disabled={loading}
                    className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-3 py-2 rounded-md text-xs"
                >
                    <RefreshCw
                        size={13}
                        className={loading ? 'animate-spin' : ''}
                    />
                    Refresh
                </button>
            </div>
        </div>
    );
};

export default ProductFilters;