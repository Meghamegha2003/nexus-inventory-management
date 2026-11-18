import { useState, useRef, useEffect } from 'react';

import Sidebar from '../component/common/Sidebar';
import Header from '../component/common/Header';

import AddProductModal from '../component/products/AddProductModal';
import ProductActions from '../component/products/ProductActions';
import ProductFilters from '../component/products/ProductFilters';
import ProductTable from '../component/products/ProductTable';

import api from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Product Name');
    const [filterValue, setFilterValue] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [saving, setSaving] = useState(false);

    const fileRef = useRef(null);

    // GET PRODUCTS
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await api.get('/master/product');
            const data = response.data;

            const productList = Array.isArray(data)
                ? data
                : data.products || data.product || data.data || [];

            setProducts(Array.isArray(productList) ? productList : []);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                'Unable to load products'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // FILTER PRODUCTS
    const filterKey = {
        'Product ID': 'id',
        'Product Name': 'name',
        'Description': 'description',
        'Category': 'category',
        'Price': 'price',
        'Quantity': 'quantity'
    }[selectedFilter];

    const filteredProducts = products.filter((product) => {

        const searchMatch = [
            product.id,
            product._id,
            product.name,
            product.description,
            product.category,
            product.price,
            product.quantity
        ]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase());

        const filterMatch = !filterValue ||
            String(
                selectedFilter === 'Product ID'
                    ? product.id || product._id || ''
                    : product[filterKey] ?? ''
            )
                .toLowerCase()
                .includes(filterValue.toLowerCase());

        return searchMatch && filterMatch;
    });

    // REFRESH
    const handleRefresh = () => {
        setSearch('');
        setFilterValue('');
        setSelectedFilter('Product Name');
        setFilterOpen(false);

        fetchProducts();
    };

    // EXPORT CSV
    const handleExport = () => {
        if (filteredProducts.length === 0) {
            alert('No products available to export');
            return;
        }

        const headers = [
            'Product ID',
            'Product Name',
            'Description',
            'Price',
            'Quantity',
            'Category'
        ];

        const rows = filteredProducts.map((product) => [
            product.id || product._id,
            product.name,
            product.description,
            product.price,
            product.quantity,
            product.category
        ]);

        const csv = [
            headers,
            ...rows
        ].map(row =>
            row.map(value =>
                `"${String(value ?? '').replace(/"/g, '""')}"`
            ).join(',')
        ).join('\n');

        const blob = new Blob(
            ['\uFEFF' + csv],
            { type: 'text/csv;charset=utf-8;' }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'products.csv';
        link.click();

        URL.revokeObjectURL(url);
    };

    // IMPORT CSV
    const handleImport = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            if (!file.name.toLowerCase().endsWith('.csv')) {
                alert('Please select a CSV file');
                return;
            }

            const text = await file.text();
            const lines = text.split(/\r?\n/).filter(Boolean);

            if (lines.length < 2) {
                alert('No product data found in the file');
                return;
            }

            const parseCSVLine = (line) => {
                const values = [];
                let value = '';
                let insideQuotes = false;

                for (let i = 0; i < line.length; i++) {
                    const char = line[i];

                    if (
                        char === '"' &&
                        line[i + 1] === '"' &&
                        insideQuotes
                    ) {
                        value += '"';
                        i++;
                    } else if (char === '"') {
                        insideQuotes = !insideQuotes;
                    } else if (char === ',' && !insideQuotes) {
                        values.push(value.trim());
                        value = '';
                    } else {
                        value += char;
                    }
                }

                values.push(value.trim());
                return values;
            };

            const headers = parseCSVLine(lines[0]).map(header =>
                header.toLowerCase().replace(/\s+/g, ' ').trim()
            );

            const importedProducts = lines.slice(1).map(line => {
                const values = parseCSVLine(line);
                const row = {};

                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });

                return {
                    name: row['product name'] || row.name || '',
                    description: row.description || '',
                    price: Number(row.price || 0),
                    quantity: Number(row.quantity || 0),
                    category: row.category || ''
                };
            }).filter(product => product.name);

            for (const product of importedProducts) {
                await api.post('/master/product', product);
            }

            await fetchProducts();

            alert('Products imported successfully');

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                'Failed to import products'
            );
        } finally {
            event.target.value = '';
        }
    };

    const handleAddProduct = async (product) => {
        try {
            setSaving(true);

            const productData = {
                name: product.productName.trim(),
                description: product.description || '',
                price: Number(product.price),
                quantity: Number(product.minimumStock || 0),
                category: product.category
            };

            await api.post('/master/product', productData);

            setShowAddModal(false);

            await fetchProducts();

            alert('Product added successfully');

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                'Failed to add product'
            );
        } finally {
            setSaving(false);
        }
    };

    const handleActiveChange = async (id, active) => {
    setProducts((prevProducts) =>
        prevProducts.map((product) =>
            String(product.id || product._id) === String(id)
                ? { ...product, active }
                : product
        )
    );
};

    return (
        <div className="h-screen w-full bg-[#F5F5F6] flex overflow-hidden">

            <Sidebar />

            <main className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden bg-[#F5F5F6]">
                <Header
                    type="master"
                    parent="Master"
                    page="Products"
                />


                <div className="p-4">

                    <ProductActions
                        onExport={handleExport}
                        onImport={handleImport}
                        fileRef={fileRef}
                    />

                    <ProductFilters
                        search={search}
                        setSearch={setSearch}
                        filterOpen={filterOpen}
                        setFilterOpen={setFilterOpen}
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        onAdd={() => setShowAddModal(true)}
                        onRefresh={handleRefresh}
                        loading={loading}
                    />

                    <ProductTable
                        products={products}
                        filteredProducts={filteredProducts}
                        loading={loading}
                        error={error}
                        selectedFilter={selectedFilter}
                        onRetry={fetchProducts}
                        onActiveChange={handleActiveChange}
                    />

                </div>
            </main>
            {showAddModal && (
                <div className="fixed inset-0 z-[9999]">
                    <AddProductModal
                        onClose={() => setShowAddModal(false)}
                        onSave={handleAddProduct}
                        saving={saving}
                    />
                </div>
            )}
        </div>
    );
};

export default Products;