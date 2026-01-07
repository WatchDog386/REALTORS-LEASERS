import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    MapPin, 
    BedDouble, 
    Bath, 
    X,
    Star, 
    Search,
    ShoppingCart,
    Menu,
    ChevronRight,
    ChevronDown,
    CheckCircle2,
    Calendar,
    Truck,
    Share2,
    Printer,
    Camera,
    Info,
    ArrowRight
} from "lucide-react";

// --- 1. GLOBAL STYLES & THEME ---
const THEME = {
    orange: "#F96302",
    orangeHover: "#d85502",
    blue: "#154279",
    text: "#333333",
    grayBorder: "#e5e7eb",
    bgLight: "#f9fafb"
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Roboto:wght@300;400;500;700;900&display=swap');
    
    body { font-family: 'Roboto', sans-serif; color: ${THEME.text}; }
    .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
    
    .custom-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
    .custom-scroll::-webkit-scrollbar-track { background: #f1f1f1; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb:hover { background: ${THEME.orange}; }

    .hd-checkbox { accent-color: ${THEME.orange}; width: 18px; height: 18px; cursor: pointer; }
  `}</style>
);

// --- 2. DATA ---
const LISTINGS = [
    {
        id: "100522",
        title: "2-Bedroom Modern Apartment - Kilimani Premium Suite",
        sku: "KIL-2B-04",
        price: 65000,
        rating: 4.8,
        reviews: 42,
        location: "Kilimani",
        beds: 2,
        baths: 2,
        status: "In Stock", 
        deliveryDate: "Tomorrow",
        gallery: [
            { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800", label: "Living Area" },
            { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800", label: "Master Bedroom" },
            { url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800", label: "Kitchen" },
            { url: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=800", label: "Bathroom" }
        ]
    },
    {
        id: "882192",
        title: "Executive Studio - Westlands Highrise",
        sku: "WST-ST-99",
        price: 35000,
        rating: 4.5,
        reviews: 128,
        location: "Westlands",
        beds: 1,
        baths: 1,
        status: "Limited Qty",
        deliveryDate: "Today",
        gallery: [
            { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800", label: "Main Room" },
            { url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800", label: "Living Space" },
            { url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800", label: "View" }
        ]
    },
    {
        id: "772110",
        title: "Standard Bedsitter - Roysambu",
        sku: "ROY-BS-22",
        price: 12500,
        rating: 4.2,
        reviews: 310,
        location: "Roysambu",
        beds: 0,
        baths: 1,
        status: "In Stock",
        deliveryDate: "Next Week",
        gallery: [
            { url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=800", label: "Room View" },
            { url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800", label: "Kitchenette" }
        ]
    },
    {
        id: "992110",
        title: "Luxury 4-Bed Villa - Karen",
        sku: "KAR-VL-01",
        price: 150000,
        rating: 5.0,
        reviews: 12,
        location: "Karen",
        beds: 4,
        baths: 4,
        status: "Special Order",
        deliveryDate: "Sat, Nov 12",
        gallery: [
            { url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800", label: "Exterior" },
            { url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800", label: "Pool" }
        ]
    }
];

// --- 3. SUB-COMPONENTS ---

const Header = ({ cartCount }: { cartCount: number }) => (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="bg-[#154279] text-white text-[11px] font-bold py-1 px-4 flex justify-between items-center">
            <div className="flex gap-4">
                <span className="cursor-pointer hover:underline">Store Finder</span>
                <span className="cursor-pointer hover:underline">Truck & Tool Rental</span>
                <span className="cursor-pointer hover:underline">For the Pro</span>
                <span className="cursor-pointer hover:underline">Gift Cards</span>
            </div>
            <div className="flex gap-4">
                <span className="cursor-pointer hover:underline">Credit Services</span>
                <span className="cursor-pointer hover:underline">Track Order</span>
                <span className="cursor-pointer hover:underline">Help</span>
            </div>
        </div>

        <div className="py-4 px-4 flex items-center gap-4 lg:gap-8 max-w-[1440px] mx-auto">
            <div className="text-3xl font-condensed font-black text-[#F96302] leading-none border-2 border-[#F96302] p-1 flex-shrink-0 cursor-pointer">
                AYDEN<span className="text-lg block text-[#154279]">RENTALS</span>
            </div>

            <div className="hidden lg:flex flex-col text-[#333] leading-tight cursor-pointer">
                <span className="text-[10px] uppercase font-bold text-gray-500">You're Shopping</span>
                <div className="text-sm font-bold flex items-center gap-1">
                    Nairobi West <ChevronDown size={14} />
                </div>
                <span className="text-[10px] text-green-700 font-bold">OPEN until 10 PM</span>
            </div>

            <div className="flex-grow relative">
                <input 
                    type="text" 
                    placeholder="What can we help you find today?" 
                    className="w-full border border-[#154279] rounded-sm py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#F96302]"
                />
                <button className="absolute right-0 top-0 h-full bg-[#F96302] text-white px-3 hover:bg-[#d85502]">
                    <Search size={20} />
                </button>
            </div>

            <div className="flex items-center gap-6 text-[#154279]">
                <div className="hidden md:flex flex-col items-center cursor-pointer group">
                    <span className="text-sm font-bold group-hover:text-[#F96302]">Account</span>
                    <span className="text-[10px] font-bold uppercase group-hover:text-[#F96302]">Sign In</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer group relative">
                    <ShoppingCart size={28} className="group-hover:text-[#F96302]" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#F96302] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                    <span className="hidden md:block text-sm font-bold group-hover:text-[#F96302] mt-1">Cart</span>
                </div>
            </div>
        </div>

        <div className="border-t border-b border-gray-200 py-2 px-4 bg-white hidden lg:block">
            <div className="max-w-[1440px] mx-auto flex gap-6 text-sm text-[#333] font-bold">
                <span className="cursor-pointer hover:text-[#F96302]">All Departments</span>
                <span className="cursor-pointer hover:text-[#F96302]">Home Decor</span>
                <span className="cursor-pointer hover:text-[#F96302]">Furniture</span>
                <span className="cursor-pointer hover:text-[#F96302]">Kitchenware</span>
                <span className="cursor-pointer hover:text-[#F96302]">DIY Projects</span>
                <span className="cursor-pointer hover:text-[#F96302] text-[#F96302]">Specials & Offers</span>
            </div>
        </div>
    </header>
);

const SidebarFilter = () => (
    <div className="hidden md:block w-64 pr-6 flex-shrink-0">
        <h3 className="font-condensed font-bold text-lg mb-4 uppercase">Refine By</h3>
        
        <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-center mb-2 cursor-pointer font-bold text-sm">
                <span>Price</span>
                <ChevronDown size={14} />
            </div>
            <div className="space-y-2 text-sm">
                {["Under KES 20k", "KES 20k - 50k", "KES 50k - 100k", "KES 100k+"].map(range => (
                    <label key={range} className="flex items-center gap-2 hover:text-[#F96302]">
                        <input type="checkbox" className="hd-checkbox" /> {range}
                    </label>
                ))}
            </div>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-center mb-2 cursor-pointer font-bold text-sm">
                <span>Neighborhood</span>
                <ChevronDown size={14} />
            </div>
            <div className="space-y-2 text-sm">
                {["Kilimani", "Westlands", "Roysambu", "Karen", "Lavington"].map(loc => (
                    <label key={loc} className="flex items-center gap-2 hover:text-[#F96302]">
                        <input type="checkbox" className="hd-checkbox" /> {loc}
                    </label>
                ))}
            </div>
        </div>

        <div className="bg-gray-100 p-4 text-center border border-gray-200">
            <h4 className="font-condensed font-bold text-[#F96302] text-xl mb-1">PRO XTRA</h4>
            <p className="text-xs mb-3">Join to earn perks on every shilling spent.</p>
            <button className="text-xs font-bold border border-[#333] px-3 py-1 uppercase hover:bg-[#333] hover:text-white transition-colors">Join Now</button>
        </div>
    </div>
);

const PropertyModal = ({ item, onClose, onAddToCart }: { item: any, onClose: () => void, onAddToCart: () => void }) => {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 font-roboto"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="bg-white w-full max-w-6xl h-full md:h-[90vh] md:rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            >
                <button onClick={onClose} className="absolute top-2 right-2 z-20 p-2 bg-white/80 rounded-full hover:bg-gray-200 transition-colors">
                    <X className="w-6 h-6 text-gray-600" />
                </button>

                <div className="md:w-7/12 p-4 md:p-6 bg-white overflow-y-auto custom-scroll">
                    <div className="text-[10px] text-gray-500 mb-4 uppercase tracking-wide flex items-center gap-1">
                        Rentals <ChevronRight size={10}/> {item.location} <ChevronRight size={10}/> <span className="text-[#333] font-bold">{item.sku}</span>
                    </div>

                    <div className="relative aspect-video bg-gray-100 border border-gray-200 mb-4">
                        <img src={item.gallery[activeImage].url} alt={item.gallery[activeImage].label} className="w-full h-full object-cover"/>
                        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold shadow-sm">
                            {item.gallery[activeImage].label}
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto custom-scroll pb-4">
                        {item.gallery.map((img:any, idx:number) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`flex-shrink-0 w-20 h-20 border-2 ${activeImage === idx ? 'border-[#F96302]' : 'border-gray-200'} p-0.5`}
                            >
                                <img src={img.url} alt="thumb" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="font-condensed font-bold text-xl mb-4">Product Overview</h3>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            Premium living in the heart of {item.location}. High-end finishes and 24/7 security.
                        </p>
                    </div>
                </div>

                <div className="md:w-5/12 p-6 bg-gray-50 md:border-l border-gray-200 flex flex-col overflow-y-auto custom-scroll">
                    <h1 className="text-2xl font-condensed font-bold text-[#333] leading-tight mb-2">{item.title}</h1>
                    <div className="mb-6 bg-white p-4 border border-gray-200 shadow-sm">
                        <span className="text-4xl font-condensed font-bold tracking-tight text-[#333]">{item.price.toLocaleString()}</span>
                        <span className="text-sm font-bold">/mo</span>
                    </div>
                    <button 
                        onClick={() => { onAddToCart(); onClose(); }}
                        className="w-full bg-[#F96302] hover:bg-[#d85502] text-white py-3 text-sm font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- 4. MAIN LAYOUT (HERO REMOVED) ---
export default function HomeDepotRentals() {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = () => {
        setCartCount(prev => prev + 1);
    };

    return (
        <>
        <GlobalStyles />
        <div className="bg-white min-h-screen pb-20">
            <Header cartCount={cartCount} />

            <div className="max-w-[1440px] mx-auto p-4 flex gap-6 pt-8">
                {/* Sidebar */}
                <SidebarFilter />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Compact Filter/Sort Strip */}
                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                        <span className="text-sm font-bold uppercase text-gray-500 tracking-wider">
                            Showing {LISTINGS.length} Results
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-500 uppercase">Sort:</span>
                            <select className="border border-gray-300 text-sm py-1 px-2 font-bold text-[#333] rounded-sm">
                                <option>Top Sellers</option>
                                <option>Price Low to High</option>
                                <option>Price High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {LISTINGS.map((item) => (
                            <div 
                                key={item.id} 
                                className="group border border-gray-200 hover:border-[#F96302] hover:shadow-lg transition-all bg-white flex flex-col relative"
                            >
                                <div className="absolute top-2 left-2 z-20">
                                    <label className="flex items-center gap-1 bg-white/90 px-1 py-0.5 cursor-pointer shadow-sm">
                                        <input type="checkbox" className="hd-checkbox" />
                                        <span className="text-[10px] font-bold uppercase text-gray-600">Compare</span>
                                    </label>
                                </div>

                                <div 
                                    className="relative aspect-[4/3] bg-gray-100 cursor-pointer overflow-hidden"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <img src={item.gallery[0].url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-200 border-t-2 border-[#F96302]">
                                        <span className="text-xs font-bold uppercase text-[#333]">Quick View</span>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 flex items-center gap-1 rounded-sm group-hover:opacity-0 transition-opacity">
                                        <Camera size={10} /> {item.gallery.length}
                                    </div>
                                </div>

                                <div className="p-3 flex flex-col flex-grow">
                                    <h3 
                                        className="text-sm font-bold text-[#154279] hover:underline cursor-pointer leading-tight mb-2"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        {item.title}
                                    </h3>
                                    
                                    <div className="flex items-center gap-1 mb-3">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={10} fill={i < Math.floor(item.rating) ? "#F96302" : "#e5e7eb"} stroke="none" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-gray-500">({item.reviews})</span>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="mb-3">
                                            <span className="text-[10px] font-bold align-top">KES</span>
                                            <span className="text-xl font-condensed font-bold text-[#333]">{item.price.toLocaleString()}</span>
                                            <span className="text-[10px] text-gray-500 font-bold ml-1">/mo</span>
                                        </div>

                                        <button 
                                            className="w-full bg-[#F96302] text-white text-[11px] font-bold uppercase py-2.5 rounded-[2px] hover:bg-[#d85502] transition-colors"
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selectedItem && (
                    <PropertyModal 
                        item={selectedItem} 
                        onClose={() => setSelectedItem(null)} 
                        onAddToCart={handleAddToCart}
                    />
                )}
            </AnimatePresence>
        </div>
        </>
    );
}