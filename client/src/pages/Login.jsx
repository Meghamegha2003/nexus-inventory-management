
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { assets } from '../assets/assets.js';
import { loginManager } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (!credentials.email.trim()) {
            toast.error('Email is required', {
                description: 'Please enter your registered email address.',
            });
            return;
        }

        if (!credentials.password.trim()) {
            toast.error('Password is required', {
                description: 'Please enter your password.',
            });
            return;
        }

        try {
            setLoading(true);

            const response = await loginManager({
                email: credentials.email.trim(),
                password: credentials.password,
            });

            const result = response?.data ?? response;
            const token = result?.token ?? result?.data?.token;
            const manager = result?.manager ?? result?.data?.manager;

            if (!token) {
                throw new Error('Authentication token not received');
            }

            localStorage.setItem('token', token);

            if (manager) {
                localStorage.setItem('manager', JSON.stringify(manager));
            }

            toast.success('Login successful!', {
                description: 'Welcome back to Nexus.',
            });

            navigate('/dashboard');

        } catch (err) {
            const status = err.response?.status;
            const message = err.response?.data?.message;

            if (status === 401) {
                toast.error('Invalid credentials', {
                    description: message || 'Incorrect email or password. Please try again.',
                });
            } else if (status === 404) {
                toast.error('Account not found', {
                    description: message || 'No account found with this email address.',
                });
            } else if (status === 400) {
                toast.error('Invalid request', {
                    description: message || 'Please check your login details.',
                });
            } else if (!err.response) {
                toast.error('Connection failed', {
                    description: 'Unable to connect to the server. Please try again.',
                });
            } else {
                toast.error('Login failed', {
                    description: message || 'Something went wrong. Please try again later.',
                });
            }

            console.error('Login error:', err);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen w-full bg-center bg-no-repeat flex items-center justify-center p-6"
            style={{
                backgroundImage: `url(${assets.background})`,
                backgroundSize: '100% 100%',
            }}
        >
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                <div className="w-full flex flex-col items-start text-white">

                    <img
                        src={assets.nexus_logo}
                        alt="Nexus"
                        className="w-50 object-contain mt-[100px] scale-125 origin-left"
                    />

                    <div className="mt-12 max-w-lg">
                        <h1 className="font-['Roboto'] text-[49px] font-medium leading-[48px] tracking-[-0.03em] text-black">
                            Smarter Inventory. Better Business.
                        </h1>

                        <p className="mt-4 w-[697px] h-[27px] font-['Roboto'] text-[23px] font-normal leading-[24px] tracking-normal text-[#FF6700]">
                            Effortless inventory management for smarter business operations.
                        </p>
                    </div>

                    <img
                        src={assets.products}
                        alt="Nexus Inventory Products"
                        className="w-full max-w-lg mt-10 object-contain"
                    />

                </div>

                <div className="w-full flex items-center justify-center">
                    <div className="w-full max-w-md rounded-2xl bg-[linear-gradient(155.22deg,rgba(228,110,144,0.13)_1.81%,rgba(84,62,137,0.4)_45.34%)] backdrop-blur-md border border-white p-8 md:p-10 shadow-2xl">

                        <img
                            src={assets.logo}
                            alt="FAPSS"
                            className="h-14 mx-auto mb-4 object-contain brightness-0 invert"
                        />

                        <h2 className="text-3xl font-bold text-white text-center">
                            Welcome Back
                        </h2>

                        <p className="mt-1 mb-6 text-sm text-white/90 text-center">
                            Enter your email and password to login
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div className="relative">
                                <UserRound
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
                                    disabled={loading}
                                    className="w-full rounded-xl border-2 border-white bg-white/20 pl-12 pr-4 py-3 text-white placeholder:text-white/70 outline-none transition focus:bg-white/30 disabled:opacity-60"
                                />
                            </div>

                            <div className="relative flex items-center rounded-xl border-2 border-white bg-white/20 focus-within:bg-white/30">
                                <LockKeyhole
                                    size={20}
                                    className="ml-4 shrink-0 text-white"
                                />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                    disabled={loading}
                                    className="w-full bg-transparent px-3 py-3 text-white placeholder:text-white/70 outline-none disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                    className="px-4 text-white hover:opacity-70 disabled:opacity-50"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center rounded-xl border-2 border-white bg-white py-3.5 font-bold tracking-wide text-[#543E89] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? 'LOGGING IN...' : 'LOGIN'}
                            </button>

                        </form>

                        <div className="mt-6 text-left">
                            <p className="text-sm font-semibold text-white">
                                Need Help?
                            </p>

                            <p className="mt-1 text-sm text-white">
                                support@fapss.com
                            </p>
                        </div>

                        <p className="mt-6 border-t border-white pt-5 text-center text-xs text-white/80">
                            © 2026 FAPSS. All rights reserved.
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
