
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

// --- COMPONENTES DEL CHECKOUT ---

const CheckoutHeader = ({ step, onBack }: { step: number; onBack: () => void }) => {
  return (
    <div className="bg-white border-b border-gray-100 py-4 px-4 sticky top-0 z-50">
      <style>
        {`
          @keyframes buyingProcess {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-buying {
            animation: buyingProcess 2s infinite linear;
          }
        `}
      </style>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo con Link al Home */}
        <div 
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={onBack}
        >
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center transform rotate-3">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-black text-gray-900 tracking-tighter uppercase italic">Chile</span>
            <span className="text-lg font-black text-blue-600 tracking-tighter uppercase italic -mt-1">Jugando</span>
          </div>
        </div>

        {/* Barra de Progreso Dinámica */}
        <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto justify-center">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <span className={`text-[10px] font-black uppercase tracking-tighter ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Carrito</span>
          </div>
          
          <div className="flex-1 md:w-48 h-1.5 bg-gray-100 rounded-full relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-blue-500 rounded-full w-full">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-buying"></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <span className={`text-[10px] font-black uppercase tracking-tighter ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Códigos</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[#4caf50] text-[10px] font-bold uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5" />
          <span>Pago 100% Seguro</span>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ cart, onUpdateQuantity, onRemove, onBack }: any) => {
  const [paymentMethod, setPaymentMethod] = useState('webpay');
  const [showLogin, setShowLogin] = useState(true);
  const dataFormRef = useRef<HTMLDivElement>(null);
  const total = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  const handleGuestMode = () => {
    setShowLogin(false);
    setTimeout(() => {
      dataFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const OrderSummary = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-black text-[#003d8d] mb-6 uppercase tracking-tight italic">Tu Compra:</h3>
      <div className="space-y-5">
        {cart.map((item: any) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              <span className="absolute -top-1 -right-1 bg-gray-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{item.quantity}</span>
            </div>
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h4 className="font-bold text-[11px] leading-tight text-gray-800 line-clamp-2">{item.name}</h4>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center border border-gray-100 rounded bg-white">
                  <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-0.5"><Minus className="w-2.5 h-2.5 text-gray-400" /></button>
                  <span className="w-5 text-center text-[10px] font-bold">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-0.5"><Plus className="w-2.5 h-2.5 text-gray-400" /></button>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="text-right flex flex-col justify-center">
              <span className="text-sm font-black text-gray-900">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase">
          <span>Subtotal</span>
          <span>${total.toLocaleString('es-CL')}</span>
        </div>
        <div className="flex justify-between items-center text-2xl font-black text-[#003d8d]">
          <span>Total</span>
          <span>${total.toLocaleString('es-CL')}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f6f9] pb-20">
      <CheckoutHeader step={1} onBack={onBack} />
      
      <div className="max-w-[1100px] mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* RESUMEN: Primero en Móvil */}
        <div className="w-full lg:w-[380px] order-1 lg:order-2 space-y-4">
          <OrderSummary />
          <div className="bg-white p-5 rounded-xl border border-gray-100 flex gap-4">
            <div className="bg-blue-50 p-2 rounded-lg h-fit"><ShieldCheck className="w-5 h-5 text-blue-600" /></div>
            <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase">Entrega inmediata vía Email las 24 horas del día.</p>
          </div>
        </div>

        {/* FORMULARIOS: Segundo en Móvil */}
        <div className="flex-1 space-y-6 order-2 lg:order-1">
          
          {/* Login Prompteado */}
          {showLogin && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-black text-[#003d8d] mb-6 uppercase tracking-tighter">¿Ya tienes cuenta?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input type="email" placeholder="Email" className="border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
                <input type="password" placeholder="Contraseña" className="border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <button className="w-full md:w-auto bg-[#1a2b4b] text-white font-black px-10 py-3 rounded-lg text-xs uppercase tracking-widest hover:bg-black transition-all">Ingresar</button>
                <button 
                  onClick={handleGuestMode}
                  className="w-full md:w-auto text-[#003d8d] font-black text-xs uppercase underline hover:text-blue-600"
                >
                  Continuar como invitado
                </button>
              </div>
            </div>
          )}

          {/* Formulario de Datos con RUT */}
          <div ref={dataFormRef} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 scroll-mt-24">
            <h2 className="text-xl font-black text-[#003d8d] mb-8 uppercase tracking-tighter italic">Información del Comprador:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Nombre *</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Apellido *</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">WhatsApp / Teléfono *</label>
                <div className="flex gap-2">
                  <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-2 text-sm text-gray-500 bg-gray-50/50">
                    <img src="https://flagcdn.com/w20/cl.png" className="w-4" alt="CL" /> +56
                  </div>
                  <input type="tel" placeholder="9 1234 5678" className="flex-1 border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Email de Entrega *</label>
                <input type="email" placeholder="ejemplo@correo.com" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">RUT (Requerido para validación) *</label>
                <input type="text" placeholder="12.345.678-9" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" />
              </div>
            </div>

            <h2 className="text-xl font-black text-[#003d8d] mt-12 mb-8 uppercase tracking-tighter italic">Método de Pago:</h2>
            <div className="grid grid-cols-1 gap-3">
              <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'webpay' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-100 hover:border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={paymentMethod === 'webpay'} onChange={() => setPaymentMethod('webpay')} className="w-4 h-4 text-blue-600" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">Webpay Plus (Tarjetas)</span>
                    <img src="https://logodownload.org/wp-content/uploads/2021/03/webpay-logo.png" className="h-4" alt="Webpay" />
                  </div>
                </div>
              </label>
            </div>

            <div className="mt-10">
              <button className="w-full bg-[#003d8d] text-white font-black py-4 rounded-xl shadow-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest">
                <CheckCircle2 className="w-5 h-5" />
                Pagar y Recibir Códigos
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                <Lock className="w-3 h-3" /> Transacción encriptada y protegida
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES DE LA HOME (ALTO IMPACTO) ---

const Navbar = ({ cartCount, onCartClick, onNavClick, currentCategory }: any) => (
  <nav className="sticky top-0 z-40 bg-white shadow-sm">
    <div className="max-w-[1200px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavClick('home')}>
        <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center transform rotate-3">
          <Zap className="text-white w-5 h-5 md:w-6 md:h-6 fill-current" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-lg md:text-2xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">Chile</span>
          <span className="text-lg md:text-2xl font-black text-blue-600 tracking-tighter uppercase italic -mt-1 leading-none">Jugando</span>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-xl relative mx-8">
        <input type="text" placeholder="Encuentra Gift Cards, Steam, PSN y más..." className="w-full bg-gray-100 border-none rounded-full py-3 px-6 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" />
        <button className="absolute right-0 top-0 h-full px-5 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors">
          <Search className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <button className="md:hidden text-gray-700 p-1"><Search className="w-6 h-6" /></button>
        <div className="hidden md:flex flex-col items-center cursor-pointer group">
          <User className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
          <span className="text-[10px] mt-1 font-bold text-gray-400 uppercase tracking-tight">Cuenta</span>
        </div>
        <div className="flex items-center cursor-pointer group relative" onClick={onCartClick}>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white">{cartCount}</span>}
          </div>
          <span className="text-[10px] hidden md:block mt-1 font-bold text-gray-400 uppercase ml-2 tracking-tight">Carrito</span>
        </div>
      </div>
    </div>
    
    {/* Nav Escritorio */}
    <div className="bg-blue-900 text-white overflow-x-auto hide-scrollbar hidden md:block">
      <div className="max-w-[1200px] mx-auto px-4 flex whitespace-nowrap">
        {Object.values(Category).map((cat) => (
          <button 
            key={cat} 
            onClick={() => onNavClick(cat)}
            className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-blue-800 transition-colors flex items-center gap-2 border-b-4 ${currentCategory === cat ? 'border-orange-500 bg-blue-800' : 'border-transparent'}`}
          >
            {cat} <span className="opacity-30 text-[9px]">▼</span>
          </button>
        ))}
      </div>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto mt-4 md:mt-6 px-4">
      <div className="rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/8] relative shadow-2xl bg-blue-900">
        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&h=500&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white max-w-2xl">
          <div className="bg-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-full w-fit mb-4 animate-pulse">Oferta de Hoy</div>
          <h2 className="text-3xl md:text-6xl font-black mb-4 leading-none uppercase italic tracking-tighter">Gift Cards Gamer al mejor precio</h2>
          <p className="text-xs md:text-xl mb-8 opacity-90 font-medium">Recarga saldo en segundos. Envíos automáticos 24/7 vía email en todo Chile.</p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black px-8 py-3 rounded-xl shadow-xl uppercase text-sm w-fit transition-transform hover:scale-105 active:scale-95">Explorar Catálogo</button>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = ({ title, icon, products, onAddToCart }: any) => (
  <div className="max-w-[1200px] mx-auto px-4 mt-12 overflow-hidden">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-white shadow-sm rounded-full p-2">{icon}</div>
      <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">{title}</h2>
    </div>
    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-6">
      {products.map((p: any) => (
        <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center p-4 hover:shadow-lg transition-all h-40 w-[320px] md:w-[350px] flex-shrink-0 group">
          <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
          <div className="ml-4 flex-1 flex flex-col justify-between h-full py-1">
            <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight">{p.name}</h3>
            <div>
              <p className="text-lg font-black text-gray-900 leading-none mb-1">${p.price.toLocaleString('es-CL')}</p>
              <button onClick={() => onAddToCart(p)} className="w-full bg-blue-600 text-white text-[10px] font-black py-2 rounded-lg hover:bg-blue-700 uppercase tracking-tighter">+ Carrito</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CartDrawer = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, onCheckout }: any) => {
  const total = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-black uppercase italic">Tu Carrito</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4">
              <ShoppingCart className="w-16 h-16 opacity-20" />
              <p className="uppercase text-xs font-black tracking-widest">Carrito Vacío</p>
            </div>
          ) : (
            cartItems.map((item: any) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <img src={item.image} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-gray-900 line-clamp-2 leading-tight">{item.name}</h4>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-white border border-gray-100 rounded-lg">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 px-2 hover:text-blue-600"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 px-2 hover:text-blue-600"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-sm text-gray-900">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                      <button onClick={() => onRemove(item.id)} className="block text-[9px] font-bold text-red-300 hover:text-red-500 uppercase mt-1">Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-white shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-black uppercase text-xs tracking-tighter">Subtotal</span>
              <span className="text-2xl font-black text-blue-900">${total.toLocaleString('es-CL')}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5" /> Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [view, setView] = useState<'home' | 'checkout' | Category>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...p, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, d: number) => setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i));
  const remove = (id: string) => setCart(prev => prev.filter(i => i.id !== id));

  if (view === 'checkout') {
    return <CheckoutPage cart={cart} onUpdateQuantity={updateQty} onRemove={remove} onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#f3f6f9] selection:bg-blue-200">
      <Navbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onCartClick={() => setIsCartOpen(true)} onNavClick={setView} currentCategory={view} />
      
      {view === 'home' ? (
        <main className="pb-20 animate-in fade-in duration-1000">
          <Hero />
          
          {/* Categorías Mobile */}
          <div className="flex md:hidden overflow-x-auto hide-scrollbar gap-4 px-4 py-8">
            {Object.values(Category).map((c, i) => (
              <div key={i} onClick={() => setView(c)} className="flex flex-col items-center flex-shrink-0 cursor-pointer active:scale-90 transition-transform">
                <div className="w-14 h-14 rounded-full bg-white shadow-md border-2 border-gray-100 flex items-center justify-center p-3 mb-2">
                   <Zap className="w-full h-full text-blue-600" />
                </div>
                <span className="text-[10px] font-black uppercase text-gray-800 tracking-tighter">{c}</span>
              </div>
            ))}
          </div>

          <ProductCarousel title="Los Más Vendidos" icon={<span className="text-2xl">🔥</span>} products={mostSoldProducts} onAddToCart={addToCart} />
          
          <div className="max-w-[1200px] mx-auto px-4 mt-12">
            <div className="bg-gradient-to-r from-[#1a2b4b] to-blue-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
              <div className="z-10 text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-black mb-4 uppercase italic">Únete a la comunidad Gamer</h3>
                <p className="opacity-70 text-sm md:text-lg mb-6 max-w-md">Miles de jugadores en Chile ya confían en nosotros para sus recargas diarias.</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg"><CheckCircle2 className="w-4 h-4 text-green-400" /> <span className="text-xs font-bold uppercase">Pagos Seguros</span></div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg"><Zap className="w-4 h-4 text-yellow-400" /> <span className="text-xs font-bold uppercase">Carga Inmediata</span></div>
                </div>
              </div>
              <div className="hidden lg:block absolute right-[-5%] top-[-20%] opacity-20 transform rotate-12"><Zap className="w-64 h-64" /></div>
            </div>
          </div>

          <ProductCarousel title="Roblox - Lo mejor para ti" icon={<Zap className="w-5 h-5 text-red-600" />} products={robuxUsd} onAddToCart={addToCart} />
        </main>
      ) : (
        <div className="max-w-[1200px] mx-auto px-4 py-12 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-8 uppercase tracking-widest">
            <button onClick={() => setView('home')} className="hover:text-blue-600">Tienda</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900">{view}</span>
          </div>
          <h1 className="text-4xl font-black uppercase italic italic text-gray-900 mb-12">Catálogo {view}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.filter(p => p.category.toLowerCase().includes(view.toString().toLowerCase())).map(p => (
              <div key={p.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 group hover:shadow-2xl transition-all">
                <img src={p.image} className="w-full h-48 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform" />
                <h3 className="font-bold text-gray-800 mb-2 leading-tight h-10 line-clamp-2">{p.name}</h3>
                <p className="text-2xl font-black text-blue-600 mb-6">${p.price.toLocaleString('es-CL')}</p>
                <button onClick={() => addToCart(p)} className="w-full bg-[#1a2b4b] text-white font-black py-4 rounded-2xl uppercase text-xs tracking-widest hover:bg-black transition-colors">Añadir al Carrito</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp Floating */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center">
          <Phone className="w-6 h-6 fill-current" />
        </button>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onRemove={remove} onUpdateQuantity={updateQty} onCheckout={() => { setIsCartOpen(false); setView('checkout'); }} />

      <footer className="bg-[#1a2b4b] text-white pt-20 pb-10">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-2 mb-6">
                <Zap className="text-blue-500 w-8 h-8 fill-current" />
                <span className="text-2xl font-black uppercase italic italic tracking-tighter">Chilejugando</span>
             </div>
             <p className="text-sm opacity-50 max-w-xs">La tienda líder en Chile para recargas de juegos y Gift Cards digitales con envío automático.</p>
          </div>
          <div className="space-y-4">
             <h4 className="font-black uppercase italic tracking-widest text-sm mb-6">Soporte</h4>
             <p className="text-xs opacity-70 hover:opacity-100 cursor-pointer">Términos y Condiciones</p>
             <p className="text-xs opacity-70 hover:opacity-100 cursor-pointer">Políticas de Devolución</p>
             <p className="text-xs opacity-70 hover:opacity-100 cursor-pointer">Preguntas Frecuentes</p>
          </div>
          <div className="space-y-6">
             <h4 className="font-black uppercase italic tracking-widest text-sm mb-6">Síguenos</h4>
             <div className="flex justify-center md:justify-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-900 transition-all cursor-pointer"><Instagram className="w-5 h-5" /></div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-900 transition-all cursor-pointer"><Facebook className="w-5 h-5" /></div>
             </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-16 pt-8 text-center px-4">
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">© 2025 Chilejugando.cl · Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}
