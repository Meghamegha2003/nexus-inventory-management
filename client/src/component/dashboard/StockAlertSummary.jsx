
import {
    AlertTriangle,
    TrendingUp,
    ShoppingBag,
    Boxes
} from 'lucide-react';

const StockAlertSummary = () => {

    const alerts = [
        {
            name: 'Out of Stocks',
            value: 22,
            icon: AlertTriangle,
            color: 'text-red-500'
        },
        {
            name: 'Low Stock Items',
            value: 34,
            icon: TrendingUp,
            color: 'text-blue-500'
        },
        {
            name: 'Over Stock Items',
            value: 56,
            icon: ShoppingBag,
            color: 'text-yellow-500'
        },
        {
            name: 'Stocks (90+ Days)',
            value: 90,
            icon: Boxes,
            color: 'text-gray-600'
        },
    ];

    return (
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">

            <div className="bg-[#302342] text-white px-3 py-2">
                <h3 className="text-xs font-medium">
                    Stock Alert Summary
                </h3>
            </div>

            <div className="p-3 space-y-3">

                {alerts.map((alert) => {
                    const Icon = alert.icon;

                    return (
                        <div
                            key={alert.name}
                            className="flex justify-between items-center text-[10px]"
                        >
                            <span className="flex gap-2 items-center text-gray-600">
                                <Icon size={13} className={alert.color} />
                                {alert.name}
                            </span>

                            <span className={alert.color}>
                                {alert.value}
                            </span>
                        </div>
                    );
                })}

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 text-[11px]">
                    View All Alerts
                </button>

            </div>
        </section>
    );
};

export default StockAlertSummary;
