
import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, User, Menu, Phone, ShieldCheck, Zap, ChevronRight, X, Instagram, Facebook, Trash2, Plus, Minus, ChevronDown, ChevronUp, Ticket, ShoppingCart as CartIcon, CheckCircle2, Lock, Truck, Headset, Globe, Eye } from 'lucide-react';
import { 
  mostSoldProducts, 
  bestPriceProducts, 
  robuxDirectos, 
  robuxUsd, 
  psnUsa, 
  xboxGrid, 
  riotGrid, 
  steamGrid, 
  itunesGrid, 
  nintendoGrid,
  products as allProducts
} from './data';
import { Product, CartItem, Category } from './types';

// --- Checkout Components ---

const CheckoutHeader = ({ step }: { step: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading bar filling up slowly
    const targetProgress = step === 1 ? 50 : 100;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="bg-white border-b border-gray-100 py-4 px-4 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center transform rotate-3">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-black text-gray-900 tracking-tighter uppercase italic">Chile</span>
            <span className="text-lg font-black text-blue-600 tracking-tighter uppercase italic -mt-1">Jugando</span>
          </div>
        </div>

        <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto justify-center">
          <div className="flex items-center flex-col md:flex-row gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-tighter ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Carrito</span>
          </div>
          <div className="w-16 md:w-32 h-1 bg-gray-100 rounded-full relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center flex-col md:flex-row gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-tighter ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Obtener mis códigos</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[#4caf50] text-[11px] font-bold">
          <Lock className="w-4 h-4" />
          <span>Estás en una página segura de Chilejugando</span>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ cart, onUpdateQuantity, onRemove, onBack }: any) => {
  const [paymentMethod, setPaymentMethod] = useState('webpay');
  const [showLogin, setShowLogin] = useState(true);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const total = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  const scrollToContact = () => {
    setShowLogin(false);
    setTimeout(() => {
      contactFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#f3f6f9] pb-20">
      <CheckoutHeader step={1} />
      
      <div className="max-w-[1100px] mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Summary (Goes first on mobile, then the forms) */}
        <div className="w-full lg:w-[400px] order-1 lg:order-2 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-black text-[#003d8d] mb-6">Estás comprando:</h3>
            <div className="space-y-6">
              {cart.map((item: any) => (
                <div key={item.id} className="flex gap-3 group relative">
                  <div className="relative w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{item.quantity}</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <h4 className="font-bold text-[11px] leading-tight text-gray-800 pr-4">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center border border-gray-100 rounded bg-white">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-0.5"><Minus className="w-2 h-2 text-gray-400" /></button>
                        <span className="w-5 text-center text-[10px] font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-0.5"><Plus className="w-2 h-2 text-gray-400" /></button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 mb-1"><X className="w-3.5 h-3.5" /></button>
                    {item.originalPrice && <span className="text-[10px] text-red-400 line-through font-bold">${item.originalPrice.toLocaleString('es-CL')}</span>}
                    <span className="text-xs font-black text-gray-900">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
              <button className="text-xs font-bold text-blue-600 hover:underline">¿Tienes un cupón? Haz clic aquí para introducir tu código</button>
              <div className="flex justify-between items-center text-sm font-bold text-gray-400">
                <span>Subtotal</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-black text-gray-900">
                <span>Total</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-[#4caf50] text-[10px] font-black uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            <span>Pago 100% seguro · Procesado con plataformas certificadas</span>
          </div>

          <div className="hidden lg:block space-y-3">
            <div className="bg-white p-5 rounded-xl border border-gray-100 flex gap-4">
              <div className="bg-blue-50 p-2 rounded-lg h-fit"><ShieldCheck className="w-5 h-5 text-blue-600" /></div>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Operamos con plataformas de pago certificadas. No almacenamos contraseñas ni información bancaria.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 flex gap-4">
              <div className="bg-blue-50 p-2 rounded-lg h-fit"><Truck className="w-5 h-5 text-blue-600" /></div>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Recibes tus códigos de forma automática, sin importar el día o la hora. Rápido, seguro y confiable.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 flex gap-4">
              <div className="bg-blue-50 p-2 rounded-lg h-fit"><Headset className="w-5 h-5 text-blue-600" /></div>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Nuestro equipo está disponible para ayudarte. Todas las compras están respaldadas por atención real y entregas verificadas.</p>
            </div>
          </div>
        </div>

        {/* Left: Login & Contact Info & Payment (Order 2 on mobile) */}
        <div className="flex-1 space-y-6 order-2 lg:order-1">
          
          {/* Login Section */}
          {showLogin && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-[#003d8d] mb-6 uppercase tracking-tight">Ingresa a tu cuenta</h2>
              <div className="p-6 border border-gray-200 rounded-lg space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-tight">Email *</label>
                  <input type="email" className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-tight">Contraseña *</label>
                  <input type="password" title="password" className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Recuérdame</span>
                  </label>
                  <button className="bg-[#1a2b4b] text-white text-[10px] font-bold px-6 py-2 rounded shadow hover:bg-black transition-colors uppercase">Iniciar Sesión</button>
                </div>
                <button className="text-[10px] font-bold text-blue-500 hover:underline uppercase tracking-tight">¿Has perdido tu contraseña?</button>
              </div>
              
              <div className="mt-8 text-center space-y-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">También puedes continuar con Redes Sociales o crear una Nueva Cuenta</p>
                <div className="flex justify-center gap-3">
                  <button className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center"><Facebook className="w-4 h-4 fill-current" /></button>
                  <button className="w-8 h-8 bg-white border border-gray-200 text-gray-600 rounded flex items-center justify-center font-bold">G</button>
                  <button className="w-8 h-8 bg-black text-white rounded flex items-center justify-center"><Zap className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-col gap-2 pt-4 items-center">
                  <button className="bg-[#1a2b4b] text-white font-black px-10 py-3 rounded text-xs uppercase tracking-wider hover:bg-black transition-all">Crear Una Cuenta</button>
                  <button 
                    onClick={scrollToContact}
                    className="text-[10px] font-black text-[#003d8d] underline uppercase tracking-widest mt-2 hover:text-blue-600"
                  >
                    O Comprar como invitado
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Contact Info Form */}
          <div ref={contactFormRef} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 scroll-mt-24">
            <h2 className="text-xl font-black text-[#003d8d] mb-8 uppercase tracking-tight">Datos del comprador</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-tight">Nombre *</label>
                <input type="text" placeholder="Tu nombre" className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-tight">Apellido *</label>
                <input type="text" placeholder="Tu apellido" className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-tight">Teléfono *</label>
                <div className="flex gap-2">
                  <div className="border border-gray-300 rounded-lg p-3 flex items-center gap-2 text-sm text-gray-500 min-w-[90px] bg-white">
                    <img src="https://flagcdn.com/w20/cl.png" className="w-4" alt="CL" /> +56 <ChevronDown className="w-3 h-3" />
                  </div>
                  <input type="tel" placeholder="9 1234 5678" className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-tight">Correo electrónico *</label>
                <input type="email" placeholder="ejemplo@correo.com" className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div className="md:col-span-2 relative">
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-tight">Crear una contraseña para la cuenta *</label>
                <input type="password" title="password" className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none pr-10" />
                <Eye className="absolute right-3 top-9 w-4 h-4 text-gray-400 cursor-pointer" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-tight">RUT *</label>
                <input type="text" placeholder="12.345.678-9" className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <h2 className="text-xl font-black text-[#003d8d] mt-12 mb-8 uppercase tracking-tight">Métodos de pago</h2>
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'webpay' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'webpay'} onChange={() => setPaymentMethod('webpay')} className="w-4 h-4 text-blue-600" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">Webpay Plus</span>
                    <img src="https://logodownload.org/wp-content/uploads/2021/03/webpay-logo.png" className="h-4" alt="Webpay" />
                  </div>
                </div>
              </label>
              {paymentMethod === 'webpay' && (
                <div className="p-4 bg-[#f8f9fa] rounded-xl text-[11px] text-gray-500 font-medium animate-in fade-in duration-300">
                  Paga con Visa, Mastercard, Magna, American, Diners y Redcompra. Recibe tu código automáticamente
                </div>
              )}
              <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'khipu' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'khipu'} onChange={() => setPaymentMethod('khipu')} className="w-4 h-4 text-blue-600" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">Paga desde tu banco</span>
                    <img src="https://static.khipu.com/img/logos/khipu-logo.png" className="h-4" alt="Khipu" />
                  </div>
                </div>
              </label>
              <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">Transferencia electrónica o depósito en efectivo</span>
                </div>
              </label>
            </div>

            <div className="mt-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 uppercase">
                  He leído y estoy de acuerdo con los <span className="text-red-400 underline">términos y condiciones</span> de la web *
                </span>
              </label>
            </div>

            <div className="mt-10">
              <button className="w-full bg-[#003d8d] text-white font-black py-4 rounded-xl shadow-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2 uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" />
                Realizar pedido
              </button>
              <div className="bg-gray-50 text-gray-400 text-[10px] font-bold py-3 text-center rounded-b-xl mt-0.5 uppercase tracking-widest">
                Envíos automáticos 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Category Circle Menu Component (Mobile Only) ---
const CategoryCircleMenu = ({ onCategoryClick }: any) => {
  const circles = [
    { name: 'Ofertas', icon: 'https://cdn-icons-png.flaticon.com/512/879/879767.png', category: 'home', emoji: '🔥', border: 'border-red-500' },
    { name: 'Roblox', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_player_icon_black.svg', category: Category.ROBLOX, border: 'border-red-600' },
    { name: 'PlayStation', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg', category: Category.PLAYSTATION, border: 'border-blue-700' },
    { name: 'Xbox', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg', category: Category.XBOX, border: 'border-green-600' },
    { name: 'Riot', icon: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Riot_Games_2022.svg', category: Category.RIOT_GAMES, border: 'border-red-500' },
    { name: 'Steam', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', category: Category.STEAM, border: 'border-black' },
  ];

  return (
    <div className="flex md:hidden overflow-x-auto hide-scrollbar gap-5 px-4 py-6 bg-[#f0f2f5]">
      {circles.map((c, i) => (
        <div key={i} className="flex flex-col items-center flex-shrink-0 cursor-pointer group" onClick={() => onCategoryClick(c.category)}>
          <div className={`w-14 h-14 rounded-full bg-white shadow-md border-2 ${c.border} flex items-center justify-center overflow-hidden mb-2 p-3 transition-transform active:scale-90`}>
             <img src={c.icon} alt={c.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-[11px] font-bold text-gray-800 whitespace-nowrap">
            {c.emoji && <span className="mr-1">{c.emoji}</span>}{c.name}
          </span>
        </div>
      ))}
    </div>
  );
};

// --- SubHero Banners (Mobile Only) ---
const SubHeroBanners = ({ onNavClick }: any) => (
  <div className="grid grid-cols-2 gap-3 px-4 mt-4 md:hidden">
    <div 
      onClick={() => onNavClick(Category.ROBLOX)}
      className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden shadow-lg cursor-pointer transition-transform active:scale-95"
    >
       <div className="z-10 text-white font-black text-lg italic tracking-tighter uppercase">Roblox</div>
       <div className="z-10 bg-white text-black text-[9px] font-black px-3 py-1 rounded-full w-fit mt-auto uppercase shadow-sm">Robux y USD</div>
       <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=200" className="absolute right-[-10%] bottom-0 h-4/5 opacity-40 transform scale-125" />
    </div>
    <div 
      onClick={() => onNavClick(Category.ITUNES)}
      className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden shadow-lg cursor-pointer transition-transform active:scale-95"
    >
       <div className="z-10 text-white font-black text-lg italic tracking-tighter uppercase flex items-center gap-1">
         <Facebook className="w-4 h-4 fill-current" /> iTunes
       </div>
       <div className="z-10 bg-white text-black text-[9px] font-black px-3 py-1 rounded-full w-fit mt-auto uppercase shadow-sm">Recarga en USD</div>
       <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=200" className="absolute right-[-10%] bottom-0 h-4/5 opacity-40 transform scale-125" />
    </div>
  </div>
);

// --- Component Definitions ---

const TopBanner = () => (
  <div className="bg-white border-b py-2 px-4 hidden md:flex justify-between items-center text-xs text-gray-600 font-medium">
    <div className="flex items-center gap-2">
      <ShieldCheck className="w-4 h-4 text-blue-600" />
      <span>Seguro y rápido - 100% Seguro y confiable</span>
    </div>
    <div className="flex items-center gap-2">
      <Zap className="w-4 h-4 text-blue-600" />
      <span>Entrega inmediata - Envíos digitales instantáneos</span>
    </div>
  </div>
);

const Navbar = ({ cartCount, onCartClick, onNavClick, currentCategory }: any) => (
  <nav className="sticky top-0 z-40 bg-white shadow-sm">
    <div className="max-w-[1200px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
      {/* Logo - Siempre a la izquierda */}
      <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => onNavClick('home')}>
        <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center transform rotate-3">
          <Zap className="text-white w-5 h-5 md:w-6 md:h-6 fill-current" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-lg md:text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Chile</span>
          <span className="text-lg md:text-2xl font-black text-blue-600 tracking-tighter uppercase italic -mt-1">Jugando</span>
        </div>
      </div>

      {/* Barra de búsqueda - Solo escritorio */}
      <div className="hidden md:flex flex-1 max-w-xl relative">
        <input 
          type="text" 
          placeholder="Encuentra tu Gift Card: Playstation, Steam, Nintendo & más" 
          className="w-full bg-gray-100 border-none rounded-full py-2.5 px-6 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
        />
        <button className="absolute right-0 top-0 h-full px-5 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors">
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Iconos - Se ven en PC y en móvil (con lupa añadida en móvil) */}
      <div className="flex items-center gap-4 md:gap-6">
        <button className="md:hidden p-1 text-gray-700 hover:text-blue-600 transition-colors">
          <Search className="w-6 h-6" />
        </button>
        <div className="hidden md:flex flex-col items-center cursor-pointer group">
          <User className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
          <span className="text-[10px] mt-1 font-semibold text-gray-500 uppercase tracking-tight">Mi Cuenta</span>
        </div>
        <button className="md:hidden p-1 text-gray-700">
           <User className="w-6 h-6" />
        </button>
        <div className="flex items-center cursor-pointer group relative" onClick={onCartClick}>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] hidden md:block mt-1 font-semibold text-gray-500 uppercase ml-2 tracking-tight">Carrito</span>
        </div>
      </div>
    </div>
    
    {/* Nav de categorías escritorio */}
    <div className="bg-blue-900 text-white overflow-x-auto hide-scrollbar hidden md:block">
      <div className="max-w-[1200px] mx-auto px-4 flex whitespace-nowrap">
        {Object.values(Category).map((cat) => (
          <button 
            key={cat} 
            onClick={() => onNavClick(cat)}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-blue-800 transition-colors flex items-center gap-1 border-b-4 ${currentCategory === cat ? 'border-orange-500 bg-blue-800' : 'border-transparent'}`}
          >
            {cat} <span className="opacity-50 text-[10px]">▼</span>
          </button>
        ))}
        <button className="px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-blue-800 transition-colors uppercase">Ver Más</button>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    {
      type: 'image',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200&h=500',
      title: '¡Ofertas de Verano en Gift Cards!',
      sub: 'Compra segura - Entrega inmediata por email 24/7',
      btnText: 'Comprar Ahora'
    },
    {
      type: 'custom-psn',
      title: 'PlayStation Gift Cards USA Chile – Recarga por Email',
      sub: 'Compatible con PS5, PS4 y PS Plus. Recibe tu código al correo en segundos.',
      btnText: 'Ver catálogo PSN'
    },
    {
      type: 'image',
      img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200&h=500',
      title: 'Lo mejor en Robux y Skins',
      sub: 'Precios directos de fábrica para ti',
      btnText: 'Comprar Ahora'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mt-4 md:mt-6 px-4">
      <div className="rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[21/9] aspect-[16/10] relative shadow-2xl">
        {slides.map((slide, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            {slide.type === 'custom-psn' ? (
              <div className="w-full h-full bg-blue-900 flex items-center relative overflow-hidden">
                <div className="relative z-10 px-8 md:px-16 text-white max-w-lg">
                  <h2 className="text-2xl md:text-5xl font-black mb-4 leading-tight uppercase italic tracking-tighter">{slide.title}</h2>
                  <p className="text-xs md:text-lg font-medium mb-6 opacity-90">{slide.sub}</p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-extrabold px-6 py-2 md:px-8 md:py-3 rounded-xl w-fit shadow-lg uppercase text-xs md:text-base">{slide.btnText}</button>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4 pr-12 opacity-40">
                  <div className="w-48 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform -rotate-6"></div>
                  <div className="w-48 h-64 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 transform -rotate-3"></div>
                  <div className="w-48 h-64 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 transform rotate-3"></div>
                </div>
              </div>
            ) : (
              <>
                <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-transparent to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
                  <h2 className="text-2xl md:text-5xl font-black mb-4 leading-tight max-w-md">{slide.title}</h2>
                  <p className="text-xs md:text-lg font-medium mb-6 opacity-90 max-sm:max-w-xs">{slide.sub}</p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-extrabold px-6 py-2 md:px-8 md:py-3 rounded-xl w-fit shadow-lg uppercase text-xs md:text-base">{slide.btnText}</button>
                </div>
              </>
            )}
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <div key={idx} className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} onClick={() => setCurrent(idx)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const HorizontalProductCard = ({ product, onAddToCart }: any) => {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-4 hover:shadow-md transition-shadow h-44 w-[340px] flex-shrink-0">
      <div className="relative w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden group">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        {discount && discount > 0 && (
          <div className="absolute top-1 left-1 bg-[#fbbd08] text-gray-800 text-[10px] font-black w-10 h-10 rounded-full flex items-center justify-center border-2 border-white">
            -{discount}%
          </div>
        )}
      </div>
      <div className="ml-4 flex-1 flex flex-col justify-between h-full py-1">
        <div>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight mb-1">{product.name}</h3>
          <span className="inline-block bg-gray-100 text-[#4caf50] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
            {product.category}
          </span>
        </div>
        <div className="flex flex-col">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through">${product.originalPrice.toLocaleString('es-CL')}</span>
          )}
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-gray-900 leading-none">${product.price.toLocaleString('es-CL')}</span>
            {product.isOutOfStock ? (
              <button className="bg-gray-200 text-gray-500 text-[10px] font-black px-4 py-2.5 rounded-lg cursor-not-allowed uppercase whitespace-nowrap ml-2">Agotado</button>
            ) : (
              <button onClick={() => onAddToCart(product)} className="bg-[#0056b3] text-white text-[10px] font-black px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors uppercase whitespace-nowrap ml-2">+ Al Carrito</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = ({ id, title, icon, products, onAddToCart, autoPlayDelay = 5000 }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 340;
  const gap = 16;
  const maxVisible = 3; 
  const maxIndex = Math.max(0, products.length - maxVisible);
  useEffect(() => {
    const timer = setInterval(() => { setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1)); }, autoPlayDelay);
    return () => clearInterval(timer);
  }, [maxIndex, autoPlayDelay]);
  return (
    <div id={id} className="max-w-[1200px] mx-auto px-4 mt-12 overflow-hidden scroll-mt-24">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-white shadow-sm rounded-full p-2">{icon}</div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">{title}</h2>
        </div>
      </div>
      <div className="relative group overflow-hidden">
        <div className="flex gap-4 transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * (cardWidth + gap)}px)` }}>
          {products.map((p: any) => <HorizontalProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {products.map((_, idx) => idx <= maxIndex && (
            <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-black w-4' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductSectionGrid = ({ title, icon, products, onAddToCart, accentColor = "text-red-600", onVerTodo }: any) => (
  <section className="max-w-[1200px] mx-auto px-4 mt-16">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
           <img src={icon} alt={title} className="w-full h-full object-cover" />
        </div>
        <h2 className={`text-2xl font-black ${accentColor} uppercase tracking-tighter italic`}>{title}</h2>
      </div>
      <button onClick={onVerTodo} className="text-gray-500 font-bold text-xs uppercase hover:underline">Ver todo</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.slice(0, 6).map((p: any) => <HorizontalProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
    </div>
  </section>
);

const CartDrawer = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, onAddToCart, onGoToStore, onCheckout }: any) => {
  const [couponOpen, setCouponOpen] = useState(false);
  const suggestions = allProducts
    .filter(p => !cartItems.some((item: any) => item.id === p.id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  const total = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={onClose} />
      <div className={`fixed right-0 top-0 h-full w-full max-w-[440px] bg-white z-[70] shadow-2xl transition-transform duration-300 transform flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-gray-900">Tu Carrito</h2>
            <span className="text-gray-400 font-medium text-xs">({cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0)} productos)</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-900" /></button>
        </div>

        <div className={`flex-1 overflow-y-auto ${cartItems.length === 0 ? 'bg-gray-50 flex items-center justify-center' : 'px-6 py-4 space-y-4'} hide-scrollbar`}>
          {cartItems.length === 0 ? (
            <div className="text-center p-8 flex flex-col items-center">
              <CartIcon className="w-16 h-16 text-gray-900 mb-6" />
              <p className="text-2xl font-bold text-gray-900 mb-8">Tu carrito está vacío</p>
              <button onClick={onGoToStore} className="bg-[#003d8d] text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-blue-900 transition-colors">¿Necesitas inspiración? Ir a la tienda</button>
            </div>
          ) : (
            <>
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl relative group">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0"><img src={item.image} className="w-full h-full object-cover" alt={item.name} /></div>
                  <div className="flex-1 flex flex-col justify-between">
                    <h4 className="font-bold text-xs leading-tight text-gray-800 pr-6 line-clamp-2">{item.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:bg-gray-50 text-gray-500"><Minus className="w-2.5 h-2.5" /></button>
                        <span className="w-6 text-center text-xs font-black text-gray-900 border-x border-gray-200">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:bg-gray-50 text-gray-500"><Plus className="w-2.5 h-2.5" /></button>
                      </div>
                      <span className="text-sm font-black text-gray-900">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="absolute top-4 right-4 p-1 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <div className="mt-8">
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h3 className="text-base font-black text-gray-900 mb-5">Te podría interesar</h3>
                  <div className="space-y-4">
                    {suggestions.map((p) => (
                      <div key={p.id} className="flex gap-4 items-center bg-transparent group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0"><img src={p.image} className="w-full h-full object-cover" alt={p.name} /></div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[12px] leading-tight text-gray-700 line-clamp-2">{p.name}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-black text-gray-900 text-sm">${p.price.toLocaleString('es-CL')}</span>
                            <button onClick={() => onAddToCart(p)} className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-tighter">Agregar</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 bg-white p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] space-y-4">
            <button onClick={() => setCouponOpen(!couponOpen)} className="flex items-center justify-between w-full text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors">
              <span>¿Tienes un cupón de descuento?</span>
              {couponOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {couponOpen && (
              <div className="mt-3 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <input type="text" placeholder="Código de cupón" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-blue-500" />
                <button className="bg-gray-800 text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase">Canjear</button>
              </div>
            )}
            <div className="flex justify-between items-center text-sm font-bold text-gray-800">
              <span>Subtotal</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>
            <div className="pt-2">
              <button onClick={onCheckout} className="w-full bg-[#003d8d] text-white font-black py-4 rounded-xl hover:bg-blue-900 transition-all shadow-xl flex items-center justify-center gap-2 uppercase text-sm">
                <ShoppingCart className="w-4 h-4" /> Finalizar compra
              </button>
              <button onClick={onClose} className="w-full text-center mt-3 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase">Continuar comprando</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// --- Category View Component ---

const CategoryView = ({ category, onAddToCart, onHomeClick }: any) => {
  const filteredProducts = allProducts.filter(p => 
    p.category.toLowerCase().includes(category.toLowerCase()) || 
    category.toLowerCase().includes(p.category.toLowerCase())
  );
  
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
        <button onClick={onHomeClick} className="hover:text-blue-600 transition-colors">Inicio</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900">{category}</span>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center transform rotate-3 shadow-xl shadow-blue-200">
            <Zap className="text-white w-7 h-7 fill-current" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">Catálogo {category}</h1>
            <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Envíos inmediatos 24/7 vía email</p>
          </div>
        </div>
        
        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
              </div>
            ))}
          </div>
          <div className="text-[10px] font-bold text-gray-500 uppercase leading-tight">
            Más de <span className="text-blue-600">5.000+</span> usuarios<br/>confían en nosotros
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-10 h-10 text-gray-300" />
           </div>
           <p className="text-xl font-bold text-gray-900 mb-2">No encontramos productos</p>
           <p className="text-gray-400 font-medium mb-8">No hay productos disponibles en la categoría {category} por el momento.</p>
           <button onClick={onHomeClick} className="bg-[#003d8d] text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-blue-900 transition-colors uppercase text-sm">Volver al catálogo principal</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <div key={p.id} className="flex justify-center md:justify-start">
               <HorizontalProductCard product={p} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'checkout' | Category>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const addToCart = (product: Product) => {
    if (product.isOutOfStock) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  if (view === 'checkout') {
    return <CheckoutPage cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] selection:bg-blue-100">
      <TopBanner />
      <Navbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onCartClick={() => setIsCartOpen(true)} onNavClick={setView} currentCategory={view} />
      
      {view === 'home' ? (
        <main className="pb-12 animate-in fade-in duration-700">
          <CategoryCircleMenu onCategoryClick={setView} />
          <Hero />
          <SubHeroBanners onNavClick={setView} />
          <ProductCarousel title="Los Más Vendidos" icon={<span className="text-2xl">🔥</span>} products={mostSoldProducts} onAddToCart={addToCart} />
          <ProductCarousel id="mejor-precio-gamer" title="Mejor Precio Gamer" icon={<div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-black text-xl">%</div>} products={bestPriceProducts} onAddToCart={addToCart} />
          <ProductSectionGrid title="Roblox - Robux Directos Chile | Global" icon="https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_player_icon_black.svg" products={robuxDirectos} onAddToCart={addToCart} onVerTodo={() => setView(Category.ROBLOX)} />
          <ProductSectionGrid title="Roblox USD Chile | Global" icon="https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_player_icon_black.svg" products={robuxUsd} onAddToCart={addToCart} onVerTodo={() => setView(Category.ROBLOX)} />
          <ProductSectionGrid title="PlayStation USA" icon="https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg" products={psnUsa} onAddToCart={addToCart} accentColor="text-[#003087]" onVerTodo={() => setView(Category.PLAYSTATION)} />
          <ProductSectionGrid title="Xbox Chile | USA" icon="https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg" products={xboxGrid} onAddToCart={addToCart} accentColor="text-[#107c10]" onVerTodo={() => setView(Category.XBOX)} />
          <ProductSectionGrid title="Riot Games Valorant & LOL Chile | LATAM" icon="https://upload.wikimedia.org/wikipedia/en/5/5b/Riot_Games_2022.svg" products={riotGrid} onAddToCart={addToCart} onVerTodo={() => setView(Category.RIOT_GAMES)} />
          <ProductSectionGrid title="Steam Wallet Chile | Global" icon="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" products={steamGrid} onAddToCart={addToCart} accentColor="text-black" onVerTodo={() => setView(Category.STEAM)} />
          <ProductSectionGrid title="Appstore iTunes USA" icon="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" products={itunesGrid} onAddToCart={addToCart} accentColor="text-gray-600" onVerTodo={() => setView(Category.ITUNES)} />
          <ProductSectionGrid title="Nintendo USA" icon="https://upload.wikimedia.org/wikipedia/commons/0/03/Nintendo_Switch_logo.svg" products={nintendoGrid} onAddToCart={addToCart} accentColor="text-red-700" onVerTodo={() => setView(Category.NINTENDO)} />
        </main>
      ) : (
        <CategoryView category={view} onAddToCart={addToCart} onHomeClick={() => setView('home')} />
      )}

      <div className="fixed bottom-6 left-6 z-30">
        <button className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group">
          <Phone className="w-6 h-6 fill-current" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold uppercase text-xs">WhatsApp</span>
        </button>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} onAddToCart={addToCart} onGoToStore={() => { setView('home'); setIsCartOpen(false); setTimeout(() => document.getElementById('mejor-precio-gamer')?.scrollIntoView({ behavior: 'smooth' }), 100); }} onCheckout={handleGoToCheckout} />

      <footer className="bg-[#003d8d] text-white pt-16 pb-8 mt-20">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div><h4 className="text-xl font-black mb-6 uppercase tracking-tighter">Información</h4><ul className="space-y-3 text-sm font-medium opacity-90"><li className="hover:translate-x-1 transition-transform cursor-pointer">Confianza y Devoluciones</li><li className="hover:translate-x-1 transition-transform cursor-pointer">Términos y condiciones</li><li className="hover:translate-x-1 transition-transform cursor-pointer">Política de privacidad</li></ul></div>
          <div><h4 className="text-xl font-black mb-6 uppercase tracking-tighter">Contacto</h4><ul className="space-y-4 text-sm font-medium opacity-90"><li><div className="font-bold">ventas@chilejugando.cl</div><div className="text-[10px] opacity-60">Consultas sobre ventas o compras</div></li><li><div className="font-bold">soporte@chilejugando.cl</div><div className="text-[10px] opacity-60">Ayuda y soporte para tus pedidos</div></li></ul></div>
          <div><h4 className="text-xl font-black mb-6 uppercase tracking-tighter">Encuéntranos</h4><div className="space-y-4"><div className="flex items-center justify-center md:justify-start gap-3 hover:translate-x-1 transition-transform cursor-pointer group"><Phone className="w-4 h-4" /> <span className="text-sm font-bold group-hover:underline">Escríbenos</span></div><div className="flex items-center justify-center md:justify-start gap-3 hover:translate-x-1 transition-transform cursor-pointer group"><Instagram className="w-4 h-4" /> <span className="text-sm font-bold group-hover:underline">Síguenos</span></div><div className="flex items-center justify-center md:justify-start gap-3 hover:translate-x-1 transition-transform cursor-pointer group"><Facebook className="w-4 h-4" /> <span className="text-sm font-bold group-hover:underline">Conócenos</span></div></div></div>
        </div>
        <div className="w-full bg-black text-white/50 text-[10px] font-bold py-4 mt-8 flex flex-col items-center text-center px-4 uppercase tracking-widest">© 2025 | Chilejugando.cl Todos los derechos reservados | Desarrollado con ❤️ para jugadores</div>
      </footer>
    </div>
  );
}
