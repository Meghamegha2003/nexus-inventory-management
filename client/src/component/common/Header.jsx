
import { useState } from 'react';
import {
    CalendarDays,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

const Header = ({
    type = 'master',
    parent = 'Master',
    page = 'Products'
}) => {
    const [warehouse, setWarehouse] = useState('All Warehouse');

    const [manager] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('manager') || '{}');
        } catch {
            return {};
        }
    });

    const managerName = manager?.name || 'User';
    const managerRole = manager?.role || 'Manager';

    return (
        <header className="h-[65px] bg-white border-b border-white flex items-center justify-between px-5 gap-3">

            <div>
                {type === 'dashboard' ? (
                    <h2 className="text-lg md:text-xl font-semibold text-[#302342]">
                        Inventory & Warehouse Management
                    </h2>
                ) : (
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 font-medium">
                            {parent}
                        </span>

                        <ChevronRight size={15} className="text-gray-400" />

                        <span className="text-[#302342] font-semibold">
                            {page}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">

                {type === 'dashboard' && (
                    <>
                        <select
                            value={warehouse}
                            onChange={(e) => setWarehouse(e.target.value)}
                            className="border border-[#D5D5D5] rounded-lg px-2 py-2 text-xs text-gray-500 outline-none bg-white"
                        >
                            <option>All Warehouse</option>
                            <option>Main Warehouse</option>
                            <option>Secondary Warehouse</option>
                        </select>

                        <button
                            type="button"
                            className="border border-[#D5D5D5] rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-gray-500 bg-white"
                        >
                            <CalendarDays size={14} />
                            Today
                            <ChevronDown size={13} />
                        </button>
                    </>
                )}

                <div className="hidden md:flex items-center gap-2">
                    <img
                        src={
                            manager?.profileImage ||
                            manager?.avatar ||
                            'https://i.pravatar.cc/100?img=12'
                        }
                        alt={managerName}
                        className="w-8 h-8 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-xs font-semibold text-gray-700">
                            {managerName}
                        </p>

                        <p className="text-[10px] text-gray-500 capitalize">
                            {managerRole}
                        </p>
                    </div>

                    <ChevronDown size={14} className="text-gray-500" />
                </div>

            </div>
        </header>
    );
};

export default Header;
