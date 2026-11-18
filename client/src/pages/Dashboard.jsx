
import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from '../component/common/Sidebar.jsx';
import Header from '../component/common/Header.jsx';
import StatCard from '../component/dashboard/StatCard.jsx';
import ActivityCard from '../component/dashboard/ActivityCard.jsx';
import InventoryChart from '../component/dashboard/InventoryChart.jsx';
import StockAlertSummary from '../component/dashboard/StockAlertSummary.jsx';
import LowStockTable from '../component/dashboard/LowStockTable.jsx';
import RecentTransactions from '../component/dashboard/RecentTransactions.jsx';
import WarehouseStock from '../component/dashboard/WarehouseStock.jsx';

import { assets } from '../assets/assets.js';

import {
    Boxes,
    Tag,
    TrendingUp,
    AlertTriangle,
    CalendarDays,
    ShoppingBag,
    Receipt,
    Truck,
    Settings2,
    FileText,
    Users
} from 'lucide-react';

const activityStats = [
    {
        title: 'Purchase Orders',
        value: '12',
        subtitle: 'Pending',
        icon: ShoppingBag
    },
    {
        title: 'Goods Receipt',
        value: '34',
        subtitle: 'Today',
        icon: Receipt
    },
    {
        title: 'Stock Transfer',
        value: '45',
        subtitle: 'Pending',
        icon: Truck
    },
    {
        title: 'Stock Adjustment',
        value: '9',
        subtitle: 'Today',
        icon: Settings2
    },
    {
        title: 'Stock Issue',
        value: '31',
        subtitle: 'Today',
        icon: FileText
    },
    {
        title: 'Supplier',
        value: '9',
        subtitle: 'Active',
        icon: Users
    }
];

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/master/product',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                const productData = response.data.data;
                setProducts(Array.isArray(productData) ? productData : []);
            } catch (error) {
                console.error('Product fetching error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const totalProducts = products.length;

    const inventoryValue = products.reduce(
        (total, product) =>
            total +
            Number(product.price || 0) *
            Number(product.quantity || 0),
        0
    );

    const lowStockProducts = products.filter(
        product =>
            Number(product.quantity) > 0 &&
            Number(product.quantity) < Number(product.minimumStock)
    );

    const outOfStockProducts = products.filter(
        product => Number(product.quantity) === 0
    );

    const inventoryStats = [
        {
            title: "Today's Products",
            value: loading ? '...' : totalProducts,
            subtitle: 'Active Items',
            icon: Boxes,
            color: 'bg-violet-500'
        },
        {
            title: 'Inventory Value',
            value: loading ? '...' : `JD ${inventoryValue.toFixed(2)}`,
            subtitle: 'Total Stock Value',
            icon: Tag,
            color: 'bg-blue-500'
        },
        {
            title: 'Low Stock Items',
            value: loading ? '...' : lowStockProducts.length,
            subtitle: 'Below Minimum',
            icon: TrendingUp,
            color: 'bg-green-500'
        },
        {
            title: 'Out of Stocks',
            value: loading ? '...' : outOfStockProducts.length,
            subtitle: 'Items',
            icon: AlertTriangle,
            color: 'bg-orange-500'
        },
        {
            title: 'Non-Moving Items',
            value: '—',
            subtitle: 'Requires stock history',
            icon: CalendarDays,
            color: 'bg-pink-500'
        }
    ];

    return (
        <div className="h-screen w-full bg-[#F5F5F6] flex overflow-hidden">
            <Sidebar />

            <main className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden bg-[#F5F5F6]">

                <Header type="dashboard" />

                <div
                    className="relative w-full h-[85px] overflow-hidden"
                    style={{
                        backgroundColor: '#F5F5F6',
                        backgroundImage: `url(${assets.park_header})`,
                        backgroundSize: 'auto 380%',
                        backgroundPosition: 'right 49%',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F5F6]/20 to-[#F5F5F6]/95 pointer-events-none" />

                    <div className="relative z-10 h-full px-6 flex flex-col justify-center">
                        <h1 className="text-lg font-semibold text-[#302342]">
                            Welcome Back, Super Admin
                        </h1>

                        <p className="text-xs text-gray-600 mt-1">
                            Here is what's happening in your amusement park today.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 px-4 md:px-6 -mt-2 pb-6 space-y-3">

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                        {inventoryStats.map(item => (
                            <StatCard key={item.title} item={item} />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                        {activityStats.map(item => (
                            <ActivityCard key={item.title} item={item} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        <InventoryChart products={products} />
                        <StockAlertSummary />
                        <LowStockTable products={products} />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-3">
                        <RecentTransactions />
                        <WarehouseStock />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
