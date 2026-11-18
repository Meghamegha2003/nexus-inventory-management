
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
    LayoutDashboard,
    Crown,
    ShoppingCart,
    Package,
    ClipboardList,
    Settings,
    LogOut,
    ChevronDown,
    Menu,
    X
} from 'lucide-react';

import { assets } from '../../assets/assets.js';

const menuItems = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Masters',
        icon: Crown,
        children: [
            { name: 'Product', path: '/products' },
            { name: 'Product Category' },
            { name: 'Suppliers' },
            { name: 'Brand' },
            { name: 'Storage Location' },
            { name: 'Units' }
        ]
    },
    { name: 'Purchasing', icon: ShoppingCart },
    { name: 'Inventory', icon: Package },
    { name: 'Reports', icon: ClipboardList },
    { name: 'Administration', icon: Settings }
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isDashboard = location.pathname === '/dashboard';

    const [openMenu, setOpenMenu] = useState(false);

    const [expandedMenus, setExpandedMenus] = useState({
        Masters: location.pathname.startsWith('/products')
    });

    const toggleMenu = (name) => {
        setExpandedMenus(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleNavigation = (path) => {
        if (!path) return;

        navigate(path);
        setOpenMenu(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('manager');
        navigate('/login');
    };

    return (
        <>
            <aside
                className={`
                    fixed lg:sticky
                    top-0 left-0
                    z-50
                    w-[220px] h-screen
                    shrink-0 overflow-hidden
                    bg-[#302342] text-white
                    flex flex-col
                    transition-transform duration-300
                    ${openMenu ? 'translate-x-0' : '-translate-x-full'}
                    lg:!translate-x-0
                `}
            >
                <div className="flex-1 min-h-0 overflow-hidden">

                    <div className="h-[75px] shrink-0 flex items-center justify-center border-b border-white/10">
                        <img
                            src={assets.logo}
                            alt="FAPSS Logo"
                            className="w-32 h-auto object-contain brightness-0 invert"
                        />
                    </div>

                    <nav className="px-3 py-5 space-y-2">

                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const hasChildren = Array.isArray(item.children);

                            const isActive = item.name === 'Masters'
                                ? item.children?.some(
                                    child => child.path &&
                                        location.pathname.startsWith(child.path)
                                )
                                : location.pathname === item.path;

                            const isExpanded = expandedMenus[item.name];

                            return (
                                <div key={item.name}>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (item.name === 'Masters') {
                                                toggleMenu(item.name);
                                                navigate('/products');
                                                setOpenMenu(false);
                                            } else if (item.path) {
                                                handleNavigation(item.path);
                                            }
                                        }}
                                        className={`
                                            w-full flex items-center justify-between
                                            px-3 py-2.5 rounded-lg text-sm transition
                                            ${isActive
                                                ? 'bg-[#ff6900] text-white'
                                                : 'text-white/85 hover:bg-white/10'
                                            }
                                        `}
                                    >
                                        <span className="flex items-center gap-3">
                                            <Icon size={17} />
                                            {item.name}
                                        </span>

                                        {hasChildren && (
                                            <ChevronDown
                                                size={14}
                                                className={`transition-transform ${
                                                    isExpanded ? 'rotate-180' : ''
                                                }`}
                                            />
                                        )}
                                    </button>

                                    {hasChildren &&
                                        isExpanded &&
                                        item.children.length > 0 && (

                                            <div className="ml-4 mt-2 space-y-1 border-l border-white/20 pl-2">

                                                {item.children.map((child) => {
                                                    const childActive =
                                                        child.path &&
                                                        location.pathname === child.path;

                                                    return (
                                                        <button
                                                            key={child.name}
                                                            type="button"
                                                            disabled={!child.path}
                                                            onClick={() =>
                                                                handleNavigation(child.path)
                                                            }
                                                            className={`
                                                                w-full text-left px-2 py-2
                                                                rounded-md text-xs transition
                                                                ${childActive
                                                                    ? 'bg-[#49315f] border border-orange-500 text-white'
                                                                    : child.path
                                                                        ? 'text-white/70 hover:bg-white/10'
                                                                        : 'text-white/40 cursor-not-allowed'
                                                                }
                                                            `}
                                                        >
                                                            {child.name}
                                                        </button>
                                                    );
                                                })}

                                            </div>
                                        )}
                                </div>
                            );
                        })}

                    </nav>
                </div>

                {isDashboard ? (
                    <div
                        className="w-full h-[340px] shrink-0 flex items-end p-5 bg-cover bg-center relative opacity-90"
                        style={{
                            backgroundImage: `
                                linear-gradient(
                                    to bottom,
                                    #302342 0%,
                                    rgba(48,35,66,0.65) 15%,
                                    transparent 40%,
                                    transparent 65%,
                                    rgba(30,20,40,0.65) 85%,
                                    #1e1428 100%
                                ),
                                url(${assets.park_sidebar})
                            `
                        }}
                    >
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-orange-400 text-sm hover:text-orange-300 transition"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="h-[65px] shrink-0 w-full flex items-center px-5">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-orange-400 text-sm hover:text-orange-300 transition"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                )}

            </aside>

            <button
                onClick={() => setOpenMenu(prev => !prev)}
                className="fixed bottom-4 left-4 z-[60] lg:hidden bg-[#302342] text-white p-3 rounded-full shadow-lg"
                aria-label="Toggle sidebar"
            >
                {openMenu ? <X size={18} /> : <Menu size={18} />}
            </button>

            {openMenu && (
                <button
                    onClick={() => setOpenMenu(false)}
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    aria-label="Close sidebar"
                />
            )}
        </>
    );
};

export default Sidebar;
