import { Package, Download, Upload } from 'lucide-react';

const ProductActions = ({ onExport, onImport, fileRef }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <span className="bg-orange-500 p-1.5 rounded-md text-white">
                    <Package size={16} />
                </span>
                Products
            </h1>

            <div className="flex gap-2">
                <button
                    onClick={onExport}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-xs"
                >
                    <Download size={13} />
                    Export
                </button>

                <button
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-xs"
                >
                    <Upload size={13} />
                    Import
                </button>

                <input
                    ref={fileRef}
                    type="file"
                    accept=".csv"
                    onChange={onImport}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default ProductActions;