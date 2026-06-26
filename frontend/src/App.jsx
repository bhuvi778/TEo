import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Heart,
  Home,
  LogOut,
  Mail,
  Menu,
  Minus,
  PackagePlus,
  MapPin,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  Truck,
  User,
  X,
} from 'lucide-react'
import { Toaster, toast } from 'sonner'
import clsx from 'clsx'

const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const seedProducts = [
  {
    id: 'astro-rover',
    name: 'Astro Rover Builder Kit',
    brand: 'OrbitPlay',
    category: 'STEM',
    age: '6-10',
    price: 2499,
    rating: 4.9,
    stock: 28,
    badge: 'Best seller',
    color: 'from-sky-200 via-cyan-100 to-amber-100',
    image:
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
    description:
      'A snap-fit rover kit with gears, wheels, challenge cards, and a build guide for curious makers.',
  },
  {
    id: 'cloud-castle',
    name: 'Cloud Castle Blocks',
    brand: 'TinyTrove',
    category: 'Building',
    age: '3-7',
    price: 1699,
    rating: 4.8,
    stock: 41,
    badge: 'New',
    color: 'from-rose-200 via-orange-100 to-lime-100',
    image:
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=80',
    description:
      'Soft-touch stacking blocks with bright forms, rounded edges, and open-ended castle prompts.',
  },
  {
    id: 'jungle-drum',
    name: 'Jungle Beat Drum Set',
    brand: 'MeloKid',
    category: 'Music',
    age: '4-9',
    price: 2199,
    rating: 4.7,
    stock: 18,
    badge: 'Hot',
    color: 'from-emerald-200 via-yellow-100 to-orange-100',
    image:
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
    description:
      'A compact rhythm set with soft mallets, jungle pattern cards, and volume-friendly pads.',
  },
  {
    id: 'puzzle-safari',
    name: 'Puzzle Safari Floor Map',
    brand: 'MapleMini',
    category: 'Puzzles',
    age: '5-8',
    price: 1299,
    rating: 4.6,
    stock: 36,
    badge: 'Learning',
    color: 'from-lime-200 via-teal-100 to-violet-100',
    image:
      'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&w=900&q=80',
    description:
      'A large illustrated jigsaw map with animals, habitats, memory coins, and explorer missions.',
  },
  {
    id: 'mini-market',
    name: 'Mini Market Pretend Cart',
    brand: 'RoleJoy',
    category: 'Pretend Play',
    age: '3-6',
    price: 3299,
    rating: 4.9,
    stock: 14,
    badge: 'Premium',
    color: 'from-fuchsia-200 via-pink-100 to-yellow-100',
    image:
      'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=80',
    description:
      'A role-play grocery cart with wooden food pieces, price tags, scanner, and checkout notes.',
  },
  {
    id: 'dino-lab',
    name: 'Dino Lab Excavation Set',
    brand: 'FossilFun',
    category: 'STEM',
    age: '7-12',
    price: 1899,
    rating: 4.8,
    stock: 25,
    badge: 'Gift pick',
    color: 'from-stone-200 via-amber-100 to-green-100',
    image:
      'https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=900&q=80',
    description:
      'Dig tools, fossil tiles, a mini field journal, and display stands for young paleontologists.',
  },
  {
    id: 'rainbow-racer',
    name: 'Rainbow Racer Track Set',
    brand: 'ZoomJoy',
    category: 'Building',
    age: '4-8',
    price: 2799,
    rating: 4.7,
    stock: 22,
    badge: 'Fast pick',
    color: 'from-red-200 via-yellow-100 to-sky-100',
    image:
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=900&q=80',
    description:
      'Flexible track pieces, two chunky racers, bridges, tunnels, and build cards for racing play.',
  },
  {
    id: 'story-puppet',
    name: 'Story Puppet Theatre',
    brand: 'RoleJoy',
    category: 'Pretend Play',
    age: '3-7',
    price: 2399,
    rating: 4.8,
    stock: 17,
    badge: 'Creative',
    color: 'from-purple-200 via-pink-100 to-yellow-100',
    image:
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=900&q=80',
    description:
      'Foldable puppet stage with character cards, scene prompts, and soft hand puppets.',
  },
  {
    id: 'melody-mat',
    name: 'Melody Step Piano Mat',
    brand: 'MeloKid',
    category: 'Music',
    age: '3-8',
    price: 1599,
    rating: 4.5,
    stock: 31,
    badge: 'Party',
    color: 'from-cyan-200 via-lime-100 to-rose-100',
    image:
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
    description:
      'A soft floor piano with instrument modes, rhythm patterns, and recording playback.',
  },
  {
    id: 'shape-solver',
    name: 'Shape Solver Puzzle Box',
    brand: 'MapleMini',
    category: 'Puzzles',
    age: '2-5',
    price: 899,
    rating: 4.6,
    stock: 44,
    badge: 'Toddler',
    color: 'from-orange-200 via-cream to-mint',
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80',
    description:
      'Chunky wooden shapes, color matching slots, and beginner logic cards for early learners.',
  },
  {
    id: 'magna-city',
    name: 'Magna City Tiles',
    brand: 'TinyTrove',
    category: 'Building',
    age: '5-11',
    price: 2999,
    rating: 4.9,
    stock: 19,
    badge: 'Magnetic',
    color: 'from-blue-200 via-violet-100 to-pink-100',
    image:
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80',
    description:
      'Magnetic tiles for towers, roads, windows, and city builds with engineering prompts.',
  },
  {
    id: 'robot-coder',
    name: 'Robot Coder Buddy',
    brand: 'OrbitPlay',
    category: 'STEM',
    age: '6-12',
    price: 3499,
    rating: 4.7,
    stock: 16,
    badge: 'Coding',
    color: 'from-slate-200 via-cyan-100 to-lime-100',
    image:
      'https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?auto=format&fit=crop&w=900&q=80',
    description:
      'Screen-free command cards, obstacle missions, lights, sounds, and beginner logic games.',
  },
  {
    id: 'chef-studio',
    name: 'Little Chef Studio',
    brand: 'RoleJoy',
    category: 'Pretend Play',
    age: '3-8',
    price: 2899,
    rating: 4.8,
    stock: 20,
    badge: 'Role play',
    color: 'from-amber-200 via-rose-100 to-mint',
    image:
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=900&q=80',
    description:
      'Mini cookware, menu cards, soft ingredients, and pretend order slips for cafe play.',
  },
  {
    id: 'rhythm-shakers',
    name: 'Rhythm Shakers Pack',
    brand: 'MeloKid',
    category: 'Music',
    age: '2-6',
    price: 799,
    rating: 4.4,
    stock: 52,
    badge: 'Starter',
    color: 'from-yellow-200 via-green-100 to-blue-100',
    image:
      'https://images.unsplash.com/photo-1514119412350-e174d90d280e?auto=format&fit=crop&w=900&q=80',
    description:
      'Maracas, tambourine, bells, and rhythm cards sized for tiny hands and family jam time.',
  },
  {
    id: 'logic-ladders',
    name: 'Logic Ladders Puzzle Race',
    brand: 'MapleMini',
    category: 'Puzzles',
    age: '6-10',
    price: 1499,
    rating: 4.7,
    stock: 27,
    badge: 'Brainy',
    color: 'from-teal-200 via-lime-100 to-yellow-100',
    image:
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=900&q=80',
    description:
      'Logic board challenges, ladder tokens, timed puzzles, and cooperative race modes.',
  },
]

const categories = ['All', 'STEM', 'Building', 'Music', 'Puzzles', 'Pretend Play']
const brands = ['OrbitPlay', 'TinyTrove', 'MeloKid', 'MapleMini', 'RoleJoy', 'FossilFun']
const heroSlides = [
  {
    title: 'Build big, learn gently',
    text: 'STEM kits, magnetic builds, and problem-solving toys for curious kids.',
    image:
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1400&q=85',
    cta: 'Explore STEM',
    category: 'STEM',
  },
  {
    title: 'Weekend gifting made easy',
    text: 'Top-rated toys by age, price, stock, and play style in one playful store.',
    image:
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1400&q=85',
    cta: 'Shop gifts',
    category: 'Building',
  },
  {
    title: 'Pretend worlds, real smiles',
    text: 'Kitchen sets, puppet stages, carts, puzzles, and music toys for daily play.',
    image:
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1400&q=85',
    cta: 'Browse playsets',
    category: 'Pretend Play',
  },
]
const demoUsers = [
  { id: 'u-1', name: 'Aarav Sharma', email: 'aarav@example.com', role: 'customer' },
  { id: 'u-2', name: 'Admin TEOMax', email: 'admin@teomax.com', role: 'admin' },
]
const testimonials = [
  {
    name: 'Priya Mehra',
    city: 'Gurugram',
    rating: 5,
    title: 'Birthday gifting became effortless',
    quote:
      'The age filters helped me pick the right STEM kit quickly. Packaging felt premium and the product quality matched the photos.',
    product: 'Astro Rover Builder Kit',
  },
  {
    name: 'Rohan Kapoor',
    city: 'Noida',
    rating: 5,
    title: 'Clean checkout and fast delivery',
    quote:
      'I liked that the cart, delivery details, and payment flow were simple. The order arrived neatly packed for my niece.',
    product: 'Cloud Castle Blocks',
  },
  {
    name: 'Ananya Sen',
    city: 'Delhi',
    rating: 4,
    title: 'Good learning-first catalog',
    quote:
      'The toys are organized by play style, which feels much better than scrolling random products. The puzzle section is very useful.',
    product: 'Puzzle Safari Floor Map',
  },
  {
    name: 'Kabir Malhotra',
    city: 'Faridabad',
    rating: 5,
    title: 'Premium feel without confusion',
    quote:
      'The product pages show stock, age group, price, and related toys clearly. It feels like a focused kids store, not a generic marketplace.',
    product: 'Robot Coder Buddy',
  },
]
const trustMetrics = [
  ['4.8/5', 'average rating'],
  ['24h', 'dispatch promise'],
  ['15+', 'curated toys'],
  ['6', 'trusted brands'],
]

const AppContext = createContext(null)
const API_BASE = import.meta.env.VITE_API_URL || '/api'

function useStore() {
  return useContext(AppContext)
}

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'API request failed')
  return data
}

function AppProvider({ children }) {
  const [products, setProducts] = useState(() => readStorage('teomax-products', seedProducts))
  const [cart, setCart] = useState(() => readStorage('teomax-cart', []))
  const [favorites, setFavorites] = useState(() => readStorage('teomax-favorites', []))
  const [orders, setOrders] = useState(() => readStorage('teomax-orders', []))
  const [users, setUsers] = useState(() => readStorage('teomax-users', demoUsers))
  const [currentUser, setCurrentUser] = useState(() => readStorage('teomax-user', null))
  const [token, setToken] = useState(() => readStorage('teomax-token', null))
  const [query, setQuery] = useState('')

  useEffect(() => {
    let active = true
    apiRequest('/products')
      .then((data) => {
        if (!active || !data.products?.length) return
        persist(setProducts, 'teomax-products', data.products)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!token || !currentUser) return
    let active = true
    apiRequest('/orders', { token })
      .then((data) => {
        if (active) persist(setOrders, 'teomax-orders', data.orders || [])
      })
      .catch(() => {})

    if (currentUser.role === 'admin') {
      apiRequest('/admin/users', { token })
        .then((data) => {
          if (active) persist(setUsers, 'teomax-users', data.users || demoUsers)
        })
        .catch(() => {})
    }

    return () => {
      active = false
    }
  }, [token, currentUser])

  function persist(setter, key, value) {
    setter(value)
    writeStorage(key, value)
  }

  function addToCart(product, quantity = 1) {
    const next = cart.some((item) => item.id === product.id)
      ? cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      : [...cart, { ...product, quantity }]
    persist(setCart, 'teomax-cart', next)
    toast.success(`${product.name} added to cart`)
  }

  function updateQuantity(id, quantity) {
    const next = cart
      .map((item) => (item.id === id ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0)
    persist(setCart, 'teomax-cart', next)
  }

  function removeFromCart(id) {
    persist(
      setCart,
      'teomax-cart',
      cart.filter((item) => item.id !== id),
    )
  }

  function toggleFavorite(product) {
    const exists = favorites.includes(product.id)
    const next = exists ? favorites.filter((id) => id !== product.id) : [...favorites, product.id]
    persist(setFavorites, 'teomax-favorites', next)
    toast(exists ? 'Removed from favorites' : 'Saved to favorites')
  }

  async function login(email, password) {
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      persist(setCurrentUser, 'teomax-user', data.user)
      persist(setToken, 'teomax-token', data.token)
      toast.success(`Welcome ${data.user.name}`)
      return data.user
    } catch {
      if (email.toLowerCase() === 'admin@teomax.com' && password.length < 6) {
        toast.error('Admin password should be at least 6 characters')
        return null
      }
    }

    const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
    const role = existing?.role ?? (email.toLowerCase().includes('admin') ? 'admin' : 'customer')
    if (role === 'admin' && password && password.length < 6) {
      toast.error('Admin password should be at least 6 characters')
      return null
    }
    const user =
      existing ??
      {
        id: crypto.randomUUID(),
        name: email.split('@')[0].replace(/[._-]/g, ' ') || 'TEOMax shopper',
        email,
        role,
      }
    const nextUsers = existing ? users : [...users, user]
    persist(setUsers, 'teomax-users', nextUsers)
    persist(setCurrentUser, 'teomax-user', user)
    persist(setToken, 'teomax-token', null)
    toast.success(`Welcome ${user.name}`)
    return user
  }

  function logout() {
    persist(setCurrentUser, 'teomax-user', null)
    persist(setToken, 'teomax-token', null)
    toast('Logged out')
  }

  async function placeOrder(details) {
    if (!cart.length) {
      toast.error('Your cart is empty')
      return null
    }
    const order = {
      id: `TMX-${Date.now().toString().slice(-6)}`,
      user: currentUser ?? { name: details.name, email: details.email, role: 'guest' },
      items: cart,
      details,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Processing',
      createdAt: new Date().toISOString(),
    }
    try {
      const data = await apiRequest('/orders', { method: 'POST', body: order })
      persist(setOrders, 'teomax-orders', [data.order || order, ...orders])
    } catch {
      persist(setOrders, 'teomax-orders', [order, ...orders])
    }
    persist(setCart, 'teomax-cart', [])
    toast.success('Order placed successfully')
    return order
  }

  async function saveProduct(product) {
    const next = products.some((item) => item.id === product.id)
      ? products.map((item) => (item.id === product.id ? product : item))
      : [product, ...products]
    persist(setProducts, 'teomax-products', next)
    let synced = false
    if (token) {
      try {
        const data = await apiRequest('/products', { method: 'POST', body: product, token })
        persist(
          setProducts,
          'teomax-products',
          next.map((item) => (item.id === product.id ? data.product : item)),
        )
        synced = true
      } catch (error) {
        toast.error(`${error.message}. Saved locally for this browser.`)
      }
    }
    toast.success(synced ? 'Product catalog synced' : 'Product catalog updated locally')
  }

  async function deleteProduct(id) {
    persist(
      setProducts,
      'teomax-products',
      products.filter((item) => item.id !== id),
    )
    if (token) {
      try {
        await apiRequest(`/products/${id}`, { method: 'DELETE', token })
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    products,
    cart,
    favorites,
    orders,
    users,
    currentUser,
    query,
    setQuery,
    cartTotal,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleFavorite,
    login,
    logout,
    placeOrder,
    saveProduct,
    deleteProduct,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function Header() {
  const [open, setOpen] = useState(false)
  const { cartCount, favorites, currentUser, query, setQuery, logout } = useStore()
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/shop', label: 'Shop', icon: ShoppingBag },
    { to: '/brands', label: 'Brands', icon: Sparkles },
  ]
  const accountPath = currentUser?.role === 'admin' ? '/admin' : '/account'

  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="mx-auto flex max-w-7xl items-center gap-3 rounded-full border border-border/70 bg-white/75 px-3 py-3 shadow-soft backdrop-blur-md lg:px-4">
        <Link to="/" className="flex items-center gap-3 rounded-md focus-ring">
          <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
            <Sparkles size={20} />
          </span>
          <span className="min-w-max font-heading text-2xl font-black tracking-tight text-foreground">
            TEOMax
          </span>
        </Link>

        <div className="hidden flex-1 items-center rounded-full border border-border bg-white/55 px-4 py-3 lg:flex">
          <Search size={18} className="text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search toys, brands, categories"
            className="w-full bg-transparent px-3 text-sm font-bold text-foreground outline-none"
          />
          <SlidersHorizontal size={18} className="text-muted-foreground" />
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <IconLink key={item.to} {...item} />
          ))}
        </nav>

        <Link className="nav-icon relative" to="/favorites" aria-label="Favorites">
          <Heart size={18} />
          {favorites.length > 0 && <Badge>{favorites.length}</Badge>}
        </Link>
        <Link className="nav-icon relative" to="/cart" aria-label="Cart">
          <ShoppingBag size={18} />
          {cartCount > 0 && <Badge>{cartCount}</Badge>}
        </Link>
        {currentUser ? (
          <>
            <Link className="nav-icon" to={accountPath} aria-label={currentUser.role === 'admin' ? 'Admin dashboard' : 'Account'}>
              {currentUser.role === 'admin' ? <ShieldCheck size={18} /> : <User size={18} />}
            </Link>
            <button className="nav-icon" type="button" onClick={logout} aria-label="Logout">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link className="btn-primary desktop-login-cta min-h-10 px-5" to="/account">
            Login
          </Link>
        )}
        <button className="nav-icon mobile-menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label="Open menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-border bg-white/90 p-3 shadow-float backdrop-blur-md md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-black text-accent-foreground"
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            ))}
            {currentUser ? (
              <>
                <Link
                  to={accountPath}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-black text-accent-foreground"
                >
                  {currentUser.role === 'admin' ? <ShieldCheck size={17} /> : <User size={17} />}
                  {currentUser.role === 'admin' ? 'Admin panel' : 'Account'}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-left text-sm font-black text-accent-foreground"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-black text-primary-foreground"
              >
                <User size={17} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

function IconLink({ to, label, icon: Icon }) {
  return (
    <Link className="nav-pill" to={to}>
      <Icon size={17} />
      {label}
    </Link>
  )
}

function Badge({ children }) {
  return (
    <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-coral px-1 text-xs font-black text-white">
      {children}
    </span>
  )
}

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 420], [0, -24])
  const slide = heroSlides[activeSlide]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [])

  function moveSlide(direction) {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length)
  }

  return (
    <>
      <section className="organic-hero">
        <OrganicBlob className="-left-24 top-12 h-72 w-72 bg-primary/20" />
        <OrganicBlob className="bottom-16 right-0 h-80 w-80 bg-secondary/20 blur-[70px]" variant="two" />
        <motion.div
          style={{ y: heroY }}
          className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-18 pt-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pt-24"
        >
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/55 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-primary shadow-soft backdrop-blur">
              <Sparkles size={15} />
              Handpicked {slide.category} collection
            </p>
            <h1 className="font-heading text-balance text-4xl font-black leading-[0.98] tracking-tight text-foreground md:text-6xl xl:text-7xl">
              Toys with a softer kind of wonder.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-muted-foreground">
              {slide.text} Curated gifts, learning kits, puzzles, and pretend play pieces with
              cart, favorites, checkout, and admin control ready to go.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn-primary" to={`/shop?category=${encodeURIComponent(slide.category)}`}>
                <ShoppingBag size={18} />
                {slide.cta}
              </Link>
              <Link className="btn-secondary" to="/shop">
                View all toys
              </Link>
            </div>
            <div className="mt-7 grid max-w-lg grid-cols-3 gap-3">
              {[
                ['15', 'curated products'],
                ['5', 'play categories'],
                ['24h', 'dispatch'],
              ].map(([value, label]) => (
                <div key={label} className="hero-stat">
                  <span>{value}</span>
                  <small>{label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="hero-image-frame">
              <motion.img
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="size-full object-cover"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.6rem] border border-white/40 bg-white/78 p-4 shadow-float backdrop-blur-md">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-secondary">
                  {slide.category}
                </p>
                <h2 className="mt-1 font-heading text-2xl font-black text-foreground">
                  {slide.title}
                </h2>
                <p className="mt-2 text-xs font-bold leading-5 text-muted-foreground">
                  {slide.text}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <button className="slider-btn" type="button" onClick={() => moveSlide(-1)}>
                <ArrowLeft size={17} />
              </button>
              <div className="flex gap-2 px-2">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={clsx('slider-dot', activeSlide === index && 'is-active')}
                    aria-label={`Go to ${item.title}`}
                  />
                ))}
              </div>
              <button className="slider-btn" type="button" onClick={() => moveSlide(1)}>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <CategoryStrip />
      <FeaturedSection />
      <TrustShowcase />
      <CategoryShowcase />
      <CategoryProductRows />
      <TestimonialsSection />
      <PromiseBand />
    </>
  )
}

function OrganicBlob({ className, variant = 'one' }) {
  return <div className={clsx('organic-blob', `organic-blob-${variant}`, className)} />
}

function CategoryStrip() {
  return (
    <section className="border-y border-border/70 bg-white/45 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 lg:px-6">
        {categories.slice(1).map((category) => (
          <Link
            key={category}
            to={`/shop?category=${encodeURIComponent(category)}`}
            className="min-w-max rounded-full border border-border bg-white/60 px-4 py-2.5 text-xs font-black uppercase tracking-[0.08em] text-primary shadow-soft transition hover:scale-105 hover:border-secondary hover:bg-white"
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  )
}

function FeaturedSection() {
  const { products } = useStore()
  return (
    <section className="section-wrap">
      <SectionTitle
        kicker="Trending now"
        title="Popular toys parents keep adding to cart"
        action="/shop"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(0, 6).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}

function TrustShowcase() {
  const featuredBenefits = [
    ['Curated by age', 'Filters are built around real gifting decisions.'],
    ['Clear stock view', 'Every product card shows availability up front.'],
    ['Role-ready platform', 'Customer shopping and admin operations stay separate.'],
  ]

  return (
    <section className="section-wrap pt-0">
      <div className="grid gap-6 rounded-lg border border-border bg-white p-4 shadow-soft lg:grid-cols-[1.05fr_0.95fr] lg:p-6">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase text-coral">Why parents choose TEOMax</p>
          <h2 className="mt-2 max-w-2xl font-heading text-3xl font-black leading-tight text-ink">
            A premium toy store experience with fewer distractions and better decisions.
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-ink/62">
            The catalog is arranged around age, play style, brand, rating, stock, and price so a
            shopper can move from discovery to checkout without guessing.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {featuredBenefits.map(([title, body]) => (
              <div key={title} className="rounded-md border border-border bg-cream p-4">
                <CheckCircle2 className="text-primary" size={21} />
                <h3 className="mt-4 text-sm font-black text-ink">{title}</h3>
                <p className="mt-2 text-xs font-bold leading-5 text-ink/58">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {trustMetrics.map(([value, label]) => (
              <div key={label} className="metric">
                <span>{value}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-80 overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=85"
            alt="Curated toys display"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/18 bg-white/88 p-4 backdrop-blur-md">
            <p className="text-xs font-black uppercase text-coral">Gift-ready collections</p>
            <h3 className="mt-1 font-heading text-2xl font-black text-ink">STEM, puzzles, music, and pretend play</h3>
            <Link className="btn-primary mt-4" to="/shop">
              Explore catalog <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryShowcase() {
  return (
    <section className="section-wrap">
      <SectionTitle kicker="Shop by mood" title="Categories built for different kinds of play" />
      <div className="grid gap-3 md:grid-cols-5">
        {categories.slice(1).map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.05 }}
            className={clsx(
              'group min-h-40 border border-border/70 p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:rotate-1 hover:border-primary/30 hover:shadow-float',
              [
                'rounded-[3rem_1.5rem_2rem_1.5rem] bg-white/70',
                'rounded-[1.5rem_3rem_1.5rem_2rem] bg-accent/50',
                'rounded-[2rem_1.5rem_3rem_1.5rem] bg-white/70',
                'rounded-[1.5rem_2rem_1.5rem_3rem] bg-muted/70',
                'rounded-[2.75rem_1.5rem_2rem_2rem] bg-white/70',
              ][index],
            )}
          >
            <Boxes className="mb-7 text-coral" size={24} />
            <h3 className="font-heading text-lg font-black text-foreground">{category}</h3>
            <p className="mt-2 text-xs leading-5 text-ink/62">
              Age-wise toys with ratings, stock, and fast checkout.
            </p>
            <Link to={`/shop?category=${encodeURIComponent(category)}`} className="mt-4 inline-flex items-center gap-1 text-xs font-black text-ink">
              Explore <ChevronRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function CategoryProductRows() {
  const { products } = useStore()

  return (
    <section className="section-wrap pt-0">
      <SectionTitle kicker="Category picks" title="Fresh toys from every department" action="/shop" />
      <div className="space-y-6">
        {categories.slice(1).map((category) => {
          const items = products.filter((product) => product.category === category).slice(0, 4)
          if (!items.length) return null

          return (
            <div
              key={category}
              className="border-t border-black/10 pt-5"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase text-coral">Shop {category}</p>
                  <h3 className="mt-1 font-heading text-xl font-black text-ink">{category} favorites</h3>
                </div>
                <Link
                  to={`/shop?category=${encodeURIComponent(category)}`}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-black text-ink"
                >
                  View all <ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((product, index) => (
                  <CategoryProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function CategoryProductCard({ product, index }) {
  const { addToCart, toggleFavorite, favorites } = useStore()
  const isFavorite = favorites.includes(product.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.04 }}
      className="product-mini"
    >
      <Link to={`/product/${product.id}`} className="block rounded-md focus-ring">
        <ProductVisual product={product} />
      </Link>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to={`/product/${product.id}`} className="truncate text-xs font-black text-ink hover:text-primary">
            {product.name}
          </Link>
          <p className="mt-1 text-xs font-bold text-ink/55">{product.brand}</p>
        </div>
        <button
          className={clsx('grid size-9 shrink-0 place-items-center rounded-md', isFavorite ? 'bg-coral text-white' : 'bg-stone text-ink')}
          type="button"
          onClick={() => toggleFavorite(product)}
          aria-label="Save favorite"
        >
          <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-sm font-black text-ink">{INR.format(product.price)}</p>
        <button className="btn-primary min-h-9 px-3 text-xs" type="button" onClick={() => addToCart(product)}>
          Add
        </button>
      </div>
    </motion.article>
  )
}

function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  function move(direction) {
    setActive((index) => (index + direction + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-wrap">
      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-black uppercase text-coral">Customer testimonials</p>
          <h2 className="mt-2 font-heading text-3xl font-black leading-tight text-ink">
            Real shopping confidence from real family use cases.
          </h2>
          <p className="mt-4 text-sm font-bold leading-7 text-ink/62">
            Parents come back when the store feels clear, trustworthy, and easy to buy from. These
            stories bring that confidence closer to the product shelf.
          </p>
          <div className="mt-5 flex gap-2">
            <button className="slider-btn" type="button" onClick={() => move(-1)} aria-label="Previous testimonial">
              <ArrowLeft size={17} />
            </button>
            <button className="slider-btn" type="button" onClick={() => move(1)} aria-label="Next testimonial">
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-white p-4 shadow-soft">
          <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-lg bg-primary p-5 text-primary-foreground">
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: current.rating }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>
              <h3 className="mt-5 font-heading text-3xl font-black leading-tight">{current.title}</h3>
              <p className="mt-4 text-sm font-bold leading-7 text-primary-foreground/78">
                "{current.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-white text-primary font-black">
                  {current.name.split(' ').map((part) => part[0]).join('')}
                </span>
                <div>
                  <p className="font-black">{current.name}</p>
                  <p className="text-xs font-bold text-primary-foreground/65">{current.city}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(index)}
                  className={clsx(
                    'rounded-md border p-4 text-left transition',
                    active === index
                      ? 'border-primary bg-cream shadow-soft'
                      : 'border-border bg-white hover:border-primary/35 hover:bg-cream',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-black text-ink">{item.product}</p>
                    <span className="flex items-center gap-1 rounded-full bg-stone px-2 py-1 text-xs font-black text-ink/70">
                      <Star size={13} fill="currentColor" /> {item.rating}.0
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-ink/58">{item.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PromiseBand() {
  const points = [
    ['Curated catalog', 'Age-wise products, brand filters, ratings, and searchable inventory.'],
    ['Complete checkout', 'Address capture, payment mode selection, order creation, and cart reset.'],
    ['Admin control', 'Add products, remove items, view users, and inspect order history.'],
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-6">
      <div className="relative overflow-hidden rounded-[2.4rem] bg-primary p-5 text-primary-foreground shadow-float md:grid-cols-3">
        <OrganicBlob className="-right-16 -top-16 h-48 w-48 bg-secondary/30" variant="two" />
        <div className="relative grid gap-4 md:grid-cols-3">
        {points.map(([title, body]) => (
          <div key={title} className="rounded-[1.7rem] border border-white/15 bg-white/8 p-4 backdrop-blur">
            <CheckCircle2 className="mb-4 text-accent" />
            <h3 className="font-heading text-lg font-black">{title}</h3>
            <p className="mt-2 text-xs font-bold leading-5 text-primary-foreground/75">{body}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ kicker, title, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-black uppercase text-coral">{kicker}</p>
        <h2 className="mt-2 max-w-2xl font-heading text-2xl font-black leading-tight text-ink md:text-3xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link className="btn-secondary self-start sm:self-auto" to={action}>
          View all <ChevronRight size={17} />
        </Link>
      )}
    </div>
  )
}

function ShopPage() {
  const { products, query, setQuery } = useStore()
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : 'All')
  const [sort, setSort] = useState('featured')
  const [age, setAge] = useState('All')
  const [brand, setBrand] = useState('All')

  const filtered = useMemo(() => {
    let items = products.filter((product) => {
      const matchesQuery = `${product.name} ${product.brand} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesCategory = category === 'All' || product.category === category
      const matchesAge = age === 'All' || product.age === age
      const matchesBrand = brand === 'All' || product.brand === brand
      return matchesQuery && matchesCategory && matchesAge && matchesBrand
    })
    if (sort === 'price-low') items = [...items].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') items = [...items].sort((a, b) => b.price - a.price)
    if (sort === 'rating') items = [...items].sort((a, b) => b.rating - a.rating)
    return items
  }, [products, query, category, sort, age, brand])

  const ages = ['All', ...new Set(products.map((product) => product.age))]
  const brandOptions = ['All', ...brands]
  const activeFilters = [
    query && `Search: ${query}`,
    category !== 'All' && category,
    brand !== 'All' && brand,
    age !== 'All' && `Age ${age}`,
  ].filter(Boolean)

  function resetFilters() {
    setQuery('')
    setCategory('All')
    setBrand('All')
    setAge('All')
    setSort('featured')
  }

  return (
    <section className="section-wrap">
      <SectionTitle kicker="Toy store" title="Browse the complete TEOMax catalog" />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border border-border bg-white/88 p-4 shadow-soft lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="text-xs font-black uppercase text-coral">Filters</p>
              <h3 className="mt-1 text-lg font-black text-ink">Refine products</h3>
            </div>
            <SlidersHorizontal size={20} className="text-primary" />
          </div>

          <label className="mt-4 block">
            <span className="field-label">Search</span>
            <span className="flex items-center rounded-md border border-border bg-cream px-3">
              <Search size={17} className="text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Toy, brand, category"
                className="min-h-11 w-full bg-transparent px-2 text-sm font-bold text-ink outline-none"
              />
            </span>
          </label>

          <div className="mt-5 space-y-5">
            <Segmented label="Category" value={category} onChange={setCategory} options={categories} />
            <Segmented label="Brand" value={brand} onChange={setBrand} options={brandOptions} />
            <Segmented label="Age group" value={age} onChange={setAge} options={ages} />
          </div>

          <button className="btn-ghost mt-5 w-full justify-center rounded-md" type="button" onClick={resetFilters}>
            Reset filters
          </button>
        </aside>

        <div className="min-w-0">
          <div className="mb-4 flex flex-col gap-3 rounded-lg border border-border bg-white/88 p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-ink">{filtered.length} products found</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeFilters.length ? (
                  activeFilters.map((filter) => (
                    <span key={filter} className="rounded-full bg-stone px-3 py-1 text-xs font-black text-ink/70">
                      {filter}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full bg-stone px-3 py-1 text-xs font-black text-ink/70">
                    All products
                  </span>
                )}
              </div>
            </div>
            <label className="flex min-w-52 flex-col gap-2 text-sm font-black text-ink">
              Sort
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-11 rounded-md border border-border bg-cream px-3 text-sm font-bold outline-none"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top rated</option>
                <option value="price-low">Price low to high</option>
                <option value="price-high">Price high to low</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          {!filtered.length && (
            <EmptyState
              title="No toys matched"
              body="Try a different search, category, brand, or age filter."
              icon={Search}
            />
          )}
        </div>
      </div>
    </section>
  )
}

function Segmented({ label, value, onChange, options }) {
  return (
    <div>
      <p className="mb-2 text-sm font-black text-ink">{label}</p>
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={clsx(
              'flex min-h-10 items-center justify-between rounded-md border px-3 py-2 text-left text-sm font-black transition',
              value === option
                ? 'border-primary bg-primary text-primary-foreground shadow-soft'
                : 'border-border bg-cream text-ink/70 hover:border-primary/40 hover:bg-white',
            )}
          >
            {option}
            {value === option && <CheckCircle2 size={15} />}
          </button>
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product, index = 0 }) {
  const { favorites, addToCart, toggleFavorite } = useStore()
  const navigate = useNavigate()
  const isFavorite = favorites.includes(product.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: Math.min(index * 0.04, 0.2) }}
      className="product-card"
    >
      <Link to={`/product/${product.id}`} className="block rounded-md focus-ring">
        <ProductVisual product={product} />
      </Link>
      <div className="p-3">
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-coral">{product.brand}</p>
            <Link to={`/product/${product.id}`} className="mt-1 block text-lg font-black leading-tight text-ink hover:text-primary">
              {product.name}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(product)}
            className={clsx('card-action shrink-0', isFavorite && 'bg-coral text-white')}
            aria-label="Toggle favorite"
          >
            <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <p className="mt-2 min-h-10 text-xs leading-5 text-ink/65">{product.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-black text-ink/70">
          <span className="chip">
            <Star size={14} fill="currentColor" /> {product.rating}
          </span>
          <span className="chip">{product.category}</span>
          <span className="chip">Age {product.age}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xl font-black text-ink">{INR.format(product.price)}</p>
          <div className="flex gap-2">
            <button className="card-action" type="button" onClick={() => addToCart(product)}>
              <ShoppingBag size={18} />
            </button>
            <button
              className="btn-primary px-4"
              type="button"
              onClick={() => {
                addToCart(product)
                navigate('/checkout')
              }}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ProductVisual({ product, tall = false }) {
  const [broken, setBroken] = useState(false)
  return (
    <div
      className={clsx(
        'product-visual relative overflow-hidden bg-gradient-to-br',
        product.color,
        tall ? 'aspect-[4/4.6]' : 'aspect-[4/3]',
      )}
    >
      {!broken && (
        <img
          src={product.image}
          alt={product.name}
          onError={() => setBroken(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <div className="absolute inset-x-3 bottom-3 z-10 rounded-[1.4rem] border border-white/50 bg-white/88 p-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-ink shadow-soft">
            {product.badge}
          </span>
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground">
            Stock {product.stock}
          </span>
        </div>
      </div>
    </div>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const { products, favorites, addToCart, toggleFavorite } = useStore()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === id)

  if (!product) {
    return (
      <section className="section-wrap">
        <EmptyState title="Product not found" body="The product may have been moved or removed." icon={Search} />
      </section>
    )
  }

  const isFavorite = favorites.includes(product.id)
  const relatedByCategory = products.filter(
    (item) => item.id !== product.id && item.category === product.category,
  )
  const relatedByBrand = products.filter(
    (item) =>
      item.id !== product.id &&
      item.brand === product.brand &&
      !relatedByCategory.some((related) => related.id === item.id),
  )
  const fallback = products.filter(
    (item) =>
      item.id !== product.id &&
      !relatedByCategory.some((related) => related.id === item.id) &&
      !relatedByBrand.some((related) => related.id === item.id),
  )
  const related = [...relatedByCategory, ...relatedByBrand, ...fallback].slice(0, 10)

  return (
    <section className="section-wrap">
      <Link to="/shop" className="mb-5 inline-flex items-center gap-2 text-sm font-black text-primary">
        <ArrowLeft size={17} />
        Back to shop
      </Link>

      <div className="grid gap-7 rounded-lg border border-border bg-white p-4 shadow-soft lg:grid-cols-[0.95fr_1.05fr] lg:p-6">
        <div className="min-w-0">
          <ProductVisual product={product} tall />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-stone px-3 py-1 text-xs font-black uppercase text-ink/70">
              {product.category}
            </span>
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground">
              {product.badge}
            </span>
          </div>

          <p className="mt-5 text-sm font-black uppercase text-coral">{product.brand}</p>
          <h1 className="mt-2 font-heading text-3xl font-black leading-tight text-ink md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-ink/65">
            {product.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-black text-ink/70">
            <span className="chip">
              <Star size={14} fill="currentColor" /> {product.rating} rating
            </span>
            <span className="chip">Age {product.age}</span>
            <span className="chip">Stock {product.stock}</span>
          </div>

          <div className="mt-7 rounded-lg border border-border bg-cream p-4">
            <p className="text-3xl font-black text-ink">{INR.format(product.price)}</p>
            <p className="mt-2 text-sm font-bold text-ink/60">
              Includes standard quality check, safe packaging, and fast dispatch.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="btn-primary" type="button" onClick={() => addToCart(product)}>
                <ShoppingBag size={18} />
                Add to cart
              </button>
              <button
                className="btn-secondary"
                type="button"
                onClick={() => {
                  addToCart(product)
                  navigate('/checkout')
                }}
              >
                Buy now
              </button>
              <button
                className={clsx('btn-ghost', isFavorite && 'bg-coral text-white')}
                type="button"
                onClick={() => toggleFavorite(product)}
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                Save
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoRow icon={Truck} title="Dispatch" body="Packed within 24 hours." />
            <InfoRow icon={ShieldCheck} title="Secure" body="Checked before shipping." />
            <InfoRow icon={CreditCard} title="Payment" body="UPI, card, or COD." />
          </div>
        </div>
      </div>

      <ProductReviewSummary product={product} />
      <RelatedProductSlider products={related} />
    </section>
  )
}

function ProductReviewSummary({ product }) {
  const productTestimonials = testimonials.filter(
    (item) => item.product === product.name || item.product.includes(product.name.split(' ')[0]),
  )
  const reviews = productTestimonials.length ? productTestimonials : testimonials.slice(0, 2)

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-lg border border-border bg-primary p-5 text-primary-foreground shadow-soft">
        <p className="text-sm font-black uppercase text-accent">Buyer confidence</p>
        <h2 className="mt-2 font-heading text-3xl font-black">{product.rating}/5 product rating</h2>
        <p className="mt-3 text-sm font-bold leading-7 text-primary-foreground/72">
          Reviews, stock visibility, and clear product attributes help shoppers decide faster.
        </p>
        <div className="mt-5 grid gap-2">
          {['Verified catalog data', 'Age and category clarity', 'Fast checkout path'].map((item) => (
            <span key={item} className="inline-flex items-center gap-2 text-sm font-black text-primary-foreground/82">
              <CheckCircle2 size={17} className="text-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {reviews.map((item) => (
          <div key={item.name} className="rounded-lg border border-border bg-white p-5 shadow-soft">
            <div className="flex items-center gap-1 text-coral">
              {Array.from({ length: item.rating }).map((_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>
            <h3 className="mt-4 text-lg font-black text-ink">{item.title}</h3>
            <p className="mt-2 text-sm font-bold leading-7 text-ink/62">"{item.quote}"</p>
            <p className="mt-4 text-xs font-black uppercase text-primary">
              {item.name} - {item.city}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function RelatedProductSlider({ products }) {
  const sliderRef = useRef(null)

  if (!products.length) return null

  function scroll(direction) {
    sliderRef.current?.scrollBy({
      left: direction * 340,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase text-coral">Related products</p>
          <h2 className="mt-1 font-heading text-2xl font-black text-ink">More toys like this</h2>
        </div>
        <div className="flex gap-2">
          <button className="slider-btn" type="button" onClick={() => scroll(-1)} aria-label="Scroll left">
            <ArrowLeft size={17} />
          </button>
          <button className="slider-btn" type="button" onClick={() => scroll(1)} aria-label="Scroll right">
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
      <div
        ref={sliderRef}
        className="flex snap-x gap-4 overflow-x-auto pb-3"
      >
        {products.map((product, index) => (
          <div key={product.id} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}

function CartPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useStore()

  if (!cart.length) {
    return (
      <section className="section-wrap">
        <EmptyState title="Your cart is waiting" body="Add a few toys and checkout from here." icon={ShoppingBag} />
      </section>
    )
  }

  return (
    <section className="section-wrap">
      <SectionTitle kicker="Cart" title="Review toys before checkout" />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="grid gap-4 rounded-2xl border border-black/10 bg-white p-3 shadow-soft sm:grid-cols-[160px_1fr]">
              <ProductVisual product={item} />
              <div className="flex flex-col justify-between gap-4 p-1">
                <div>
                  <p className="text-sm font-black uppercase text-coral">{item.brand}</p>
                  <h3 className="text-2xl font-black text-ink">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{item.description}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-black text-ink">{INR.format(item.price * item.quantity)}</p>
                  <div className="flex items-center gap-2">
                    <button className="btn-icon" type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span className="grid h-11 min-w-12 place-items-center rounded-xl bg-cream px-3 font-black text-ink">
                      {item.quantity}
                    </span>
                    <button className="btn-icon" type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                    <button className="btn-icon bg-coral text-white" type="button" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <OrderSummary total={cartTotal} />
      </div>
    </section>
  )
}

function OrderSummary({ total }) {
  const delivery = total > 2500 ? 0 : 99
  const giftWrap = 149
  return (
    <aside className="h-fit rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
      <h3 className="text-2xl font-black text-ink">Order summary</h3>
      <div className="mt-5 space-y-3 text-sm font-bold text-ink/65">
        <Line label="Subtotal" value={INR.format(total)} />
        <Line label="Delivery" value={delivery ? INR.format(delivery) : 'Free'} />
        <Line label="Gift wrap" value={INR.format(giftWrap)} />
      </div>
      <div className="mt-5 border-t border-black/10 pt-5">
        <Line big label="Total" value={INR.format(total + delivery + giftWrap)} />
      </div>
      <Link className="btn-primary mt-6 w-full justify-center" to="/checkout">
        Checkout <ChevronRight size={18} />
      </Link>
    </aside>
  )
}

function Line({ label, value, big }) {
  return (
    <div className={clsx('flex items-center justify-between', big && 'text-xl font-black text-ink')}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function CheckoutPage() {
  const { cart, placeOrder, currentUser } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: currentUser?.name ?? '',
    email: currentUser?.email ?? '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    payment: 'UPI',
  })

  function update(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  async function submit(event) {
    event.preventDefault()
    const order = await placeOrder(form)
    if (order) navigate('/account')
  }

  if (!cart.length) return <Navigate to="/cart" replace />

  return (
    <section className="section-wrap">
      <SectionTitle kicker="Checkout" title="Delivery address and payment" />
      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['name', 'Full name'],
              ['email', 'Email'],
              ['phone', 'Phone'],
              ['city', 'City'],
              ['pincode', 'Pincode'],
            ].map(([field, label]) => (
              <Input
                key={field}
                label={label}
                value={form[field]}
                onChange={(value) => update(field, value)}
                required
              />
            ))}
            <label className="md:col-span-2">
              <span className="field-label">Address</span>
              <textarea
                required
                value={form.address}
                onChange={(event) => update('address', event.target.value)}
                className="field min-h-28 resize-none"
                placeholder="House no, area, landmark"
              />
            </label>
          </div>
          <div className="mt-6">
            <p className="field-label">Payment mode</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {['UPI', 'Card', 'Cash on Delivery'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => update('payment', mode)}
                  className={clsx(
                    'rounded-xl border px-4 py-3 text-sm font-black transition',
                    form.payment === mode
                      ? 'border-ink bg-ink text-white'
                      : 'border-black/10 bg-cream text-ink',
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <OrderSummary total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} />
          <button className="btn-primary mt-3 w-full justify-center" type="submit">
            Place order
          </button>
        </div>
      </form>
    </section>
  )
}

function Input({ label, value, onChange, required = false, type = 'text' }) {
  return (
    <label>
      <span className="field-label">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field"
      />
    </label>
  )
}

function FavoritesPage() {
  const { products, favorites } = useStore()
  const items = products.filter((product) => favorites.includes(product.id))
  return (
    <section className="section-wrap">
      <SectionTitle kicker="Favorites" title="Saved toys for later" />
      {items.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState title="No favorites yet" body="Tap the heart on products you like." icon={Heart} />
      )}
    </section>
  )
}

function AccountPage() {
  const { currentUser, orders } = useStore()
  const [activeTab, setActiveTab] = useState('overview')
  const userOrders = currentUser
    ? orders.filter((order) => order.user.email === currentUser.email)
    : orders

  if (!currentUser) return <AuthPage />
  if (currentUser.role === 'admin') return <Navigate to="/admin" replace />

  const accountItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'support', label: 'Support', icon: Truck },
  ]

  return (
    <WorkspaceShell
      kicker="Customer panel"
      title={`Hello, ${currentUser.name}`}
      user={currentUser}
      items={accountItems}
      active={activeTab}
      onChange={setActiveTab}
    >
      {activeTab === 'overview' && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <ProfileTile icon={User} title={currentUser.email} body={`Role: ${currentUser.role}`} />
            <ProfileTile icon={ShoppingBag} title={`${userOrders.length} orders`} body="Your order history" />
            <ProfileTile icon={Truck} title="24 hour dispatch" body="Standard delivery timeline" />
          </div>
          <WorkspacePanel title="Recent orders">
            <OrderList orders={userOrders.slice(0, 4)} />
          </WorkspacePanel>
        </>
      )}

      {activeTab === 'orders' && (
        <WorkspacePanel title="Orders">
          <OrderList orders={userOrders} />
        </WorkspacePanel>
      )}

      {activeTab === 'profile' && (
        <div className="grid gap-4 md:grid-cols-2">
          <ProfileTile icon={User} title={currentUser.name} body="Account holder" />
          <ProfileTile icon={Mail} title={currentUser.email} body="Primary email" />
          <ProfileTile icon={ShieldCheck} title={currentUser.role} body="Access role" />
          <ProfileTile icon={MapPin} title="Delhi NCR" body="Default service region" />
        </div>
      )}

      {activeTab === 'support' && (
        <WorkspacePanel title="Support">
          <div className="grid gap-3 md:grid-cols-2">
            <InfoRow icon={Truck} title="Shipping" body="Orders above Rs. 2,500 qualify for free delivery." />
            <InfoRow icon={Phone} title="Call support" body="+91 98765 43210" />
            <InfoRow icon={Mail} title="Email" body="hello@teomax.com" />
            <InfoRow icon={CreditCard} title="Payments" body="UPI, card, and cash on delivery supported." />
          </div>
        </WorkspacePanel>
      )}
    </WorkspaceShell>
  )
}

function WorkspaceShell({ kicker, title, user, items, active, onChange, children }) {
  return (
    <section className="section-wrap">
      <div className="grid overflow-hidden rounded-lg border border-border bg-white shadow-soft lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-border bg-primary p-4 text-primary-foreground lg:border-b-0 lg:border-r">
          <Link to="/" className="inline-flex items-center gap-2 rounded-md focus-ring">
            <span className="grid size-10 place-items-center rounded-md bg-white/12">
              <Sparkles size={18} />
            </span>
            <span className="font-heading text-xl font-black">TEOMax</span>
          </Link>

          <div className="mt-7">
            <p className="text-xs font-black uppercase text-primary-foreground/55">{kicker}</p>
            <h2 className="mt-2 text-2xl font-black leading-tight">{title}</h2>
            <p className="mt-2 text-sm font-bold text-primary-foreground/65">{user.email}</p>
            <span className="mt-4 inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-black capitalize">
              {user.role}
            </span>
          </div>

          <nav className="mt-7 grid gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                className={clsx(
                  'flex min-h-11 items-center gap-3 rounded-md px-3 text-left text-sm font-black transition',
                  active === item.id
                    ? 'bg-white text-primary shadow-soft'
                    : 'text-primary-foreground/72 hover:bg-white/10 hover:text-white',
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 grid gap-2 border-t border-white/12 pt-5">
            <Link className="text-sm font-black text-primary-foreground/72 hover:text-white" to="/shop">
              Shop catalog
            </Link>
            <Link className="text-sm font-black text-primary-foreground/72 hover:text-white" to="/cart">
              View cart
            </Link>
          </div>
        </aside>

        <div className="min-w-0 bg-cream p-4 sm:p-6">
          {children}
        </div>
      </div>
    </section>
  )
}

function WorkspacePanel({ title, children }) {
  return (
    <section className="mt-5">
      <h3 className="text-xl font-black text-ink">{title}</h3>
      {children}
    </section>
  )
}

function InfoRow({ icon: Icon, title, body }) {
  return (
    <div className="flex gap-3 rounded-md border border-border bg-cream p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white text-primary shadow-soft">
        <Icon size={18} />
      </span>
      <div>
        <h4 className="font-black text-ink">{title}</h4>
        <p className="mt-1 text-sm font-bold leading-6 text-ink/60">{body}</p>
      </div>
    </div>
  )
}

function AuthPage() {
  const { login } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('aarav@example.com')
  const [password, setPassword] = useState('demo123')

  async function submit(event) {
    event.preventDefault()
    const user = await login(email, password)
    if (user) navigate(user.role === 'admin' ? '/admin' : '/account')
  }

  return (
    <section className="section-wrap">
      <div className="mx-auto grid max-w-4xl overflow-hidden rounded-lg border border-border bg-white shadow-float lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-primary p-6 text-primary-foreground">
          <span className="grid size-12 place-items-center rounded-md bg-white/12">
            <ShieldCheck size={24} />
          </span>
          <h2 className="mt-8 font-heading text-3xl font-black">One login for every role</h2>
          <p className="mt-3 text-sm font-bold leading-6 text-primary-foreground/75">
            Sign in once and TEOMax opens the right workspace for your account.
          </p>
          <div className="mt-8 space-y-3 text-sm font-bold text-primary-foreground/78">
            <p>Customer: aarav@example.com / demo123</p>
            <p>Admin: admin@teomax.com / any 6+ character password</p>
          </div>
        </div>
        <div className="p-5 sm:p-7">
          <SectionTitle kicker="Login" title="Continue to TEOMax" />
        <form onSubmit={submit} className="space-y-4">
          <Input label="Email" value={email} onChange={setEmail} type="email" required />
          <Input label="Password" value={password} onChange={setPassword} type="password" required />
          <button className="btn-primary w-full justify-center" type="submit">
            Login
          </button>
        </form>
        <p className="mt-4 rounded-md bg-stone p-3 text-sm font-bold leading-6 text-ink/70">
          Role based access is applied automatically after login.
        </p>
        </div>
      </div>
    </section>
  )
}

function BrandsPage() {
  const { products } = useStore()
  return (
    <section className="section-wrap">
      <SectionTitle kicker="Brands" title="Curated partners across every play style" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => {
          const count = products.filter((product) => product.brand === brand).length
          return (
            <div key={brand} className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
              <Sparkles className="mb-8 text-coral" size={30} />
              <h3 className="text-2xl font-black text-ink">{brand}</h3>
              <p className="mt-2 text-sm font-bold text-ink/60">{count} products in catalog</p>
              <Link to="/shop" className="mt-6 inline-flex items-center gap-1 text-sm font-black text-ink">
                Shop brand <ChevronRight size={16} />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function AdminPage() {
  const { currentUser, products, orders, users, saveProduct, deleteProduct } = useStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [form, setForm] = useState({
    id: '',
    name: '',
    brand: 'TEOMax',
    category: 'STEM',
    age: '4-8',
    price: '999',
    rating: '4.5',
    stock: '10',
    badge: 'New',
    color: 'from-sky-200 via-mint to-sun',
    image: '',
    description: '',
  })

  if (!currentUser) return <AuthPage />
  if (currentUser.role !== 'admin') {
    return (
      <section className="section-wrap">
        <EmptyState title="Admin access required" body="Login with an admin account to manage TEOMax." icon={ShieldCheck} />
      </section>
    )
  }

  function update(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  function submit(event) {
    event.preventDefault()
    saveProduct({
      ...form,
      id:
        form.id ||
        form.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      price: Number(form.price),
      rating: Number(form.rating),
      stock: Number(form.stock),
      image: form.image || seedProducts[0].image,
    })
    setForm((previous) => ({ ...previous, id: '', name: '', description: '', image: '' }))
  }

  const adminItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: PackagePlus },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: User },
  ]
  const revenue = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <WorkspaceShell
      kicker="Admin panel"
      title="Operations workspace"
      user={currentUser}
      items={adminItems}
      active={activeTab}
      onChange={setActiveTab}
    >
      {activeTab === 'overview' && (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <ProfileTile icon={PackagePlus} title={`${products.length} products`} body="Catalog inventory" />
            <ProfileTile icon={ShoppingBag} title={`${orders.length} orders`} body="Checkout records" />
            <ProfileTile icon={User} title={`${users.length} users`} body="Registered accounts" />
            <ProfileTile icon={BarChart3} title={INR.format(revenue)} body="Lifetime sales" />
          </div>
          <WorkspacePanel title="Recent orders">
            <OrderList orders={orders.slice(0, 5)} />
          </WorkspacePanel>
        </>
      )}

      {activeTab === 'products' && (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form onSubmit={submit} className="rounded-lg border border-border bg-white p-5 shadow-soft">
            <h3 className="text-xl font-black text-ink">Add or update product</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Input label="Product id" value={form.id} onChange={(value) => update('id', value)} />
              <Input label="Name" value={form.name} onChange={(value) => update('name', value)} required />
              <Input label="Brand" value={form.brand} onChange={(value) => update('brand', value)} required />
              <Input label="Category" value={form.category} onChange={(value) => update('category', value)} required />
              <Input label="Age" value={form.age} onChange={(value) => update('age', value)} required />
              <Input label="Price" value={form.price} onChange={(value) => update('price', value)} required />
              <Input label="Rating" value={form.rating} onChange={(value) => update('rating', value)} required />
              <Input label="Stock" value={form.stock} onChange={(value) => update('stock', value)} required />
              <Input label="Badge" value={form.badge} onChange={(value) => update('badge', value)} />
              <Input label="Image URL" value={form.image} onChange={(value) => update('image', value)} />
              <label className="md:col-span-2">
                <span className="field-label">Description</span>
                <textarea
                  required
                  value={form.description}
                  onChange={(event) => update('description', event.target.value)}
                  className="field min-h-24 resize-none rounded-lg"
                />
              </label>
            </div>
            <button className="btn-primary mt-5 w-full justify-center" type="submit">
              Save product
            </button>
          </form>

          <div className="rounded-lg border border-border bg-white p-5 shadow-soft">
            <h3 className="text-xl font-black text-ink">Catalog</h3>
            <div className="mt-4 max-h-[620px] space-y-3 overflow-auto pr-1">
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-3 rounded-md border border-border bg-cream p-3">
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-md">
                    <ProductVisual product={product} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-black text-ink">{product.name}</p>
                    <p className="text-sm font-bold text-ink/55">
                      {product.brand} - {INR.format(product.price)} - Stock {product.stock}
                    </p>
                  </div>
                  <button className="btn-icon bg-coral text-white" type="button" onClick={() => deleteProduct(product.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <WorkspacePanel title="Orders">
          <OrderList orders={orders} />
        </WorkspacePanel>
      )}

      {activeTab === 'users' && (
        <div className="grid gap-3">
          {users.map((user) => (
            <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-white p-4 shadow-soft">
              <div className="min-w-0">
                <p className="truncate font-black text-ink">{user.name}</p>
                <p className="text-sm font-bold text-ink/55">{user.email}</p>
              </div>
              <span className="rounded-full bg-stone px-3 py-1 text-xs font-black capitalize text-ink/70">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </WorkspaceShell>
  )
}

function ProfileTile({ icon: Icon, title, body }) {
  return (
    <div className="rounded-lg border border-border bg-white p-5 shadow-soft">
      <Icon className="mb-6 text-coral" size={26} />
      <h3 className="break-words text-xl font-black text-ink">{title}</h3>
      <p className="mt-2 text-sm font-bold leading-6 text-ink/60">{body}</p>
    </div>
  )
}

function OrderList({ orders }) {
  if (!orders.length) {
    return <p className="mt-4 rounded-xl bg-cream p-4 text-sm font-bold text-ink/60">No orders yet.</p>
  }
  return (
    <div className="mt-4 space-y-3">
      {orders.map((order) => (
        <div key={order.id} className="rounded-xl bg-cream p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-black text-ink">{order.id}</p>
            <span className="rounded-full bg-mint px-3 py-1 text-xs font-black text-ink">
              {order.status}
            </span>
          </div>
          <p className="mt-2 text-sm font-bold text-ink/60">
            {order.user.name} - {order.items.length} items - {INR.format(order.total)}
          </p>
          <p className="mt-1 text-xs font-bold text-ink/45">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ title, body, icon: Icon }) {
  return (
    <div className="rounded-lg border border-border bg-white p-10 text-center shadow-soft">
      <Icon className="mx-auto text-coral" size={42} />
      <h2 className="mt-5 text-3xl font-black text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-6 text-ink/60">{body}</p>
      <Link className="btn-primary mt-6" to="/shop">
        Go to shop
      </Link>
    </div>
  )
}

function Footer() {
  const { currentUser } = useStore()
  const accountLink = currentUser
    ? [currentUser.role === 'admin' ? 'Dashboard' : 'Account', currentUser.role === 'admin' ? '/admin' : '/account']
    : ['Login', '/account']
  const links = [
    ['Shop', '/shop'],
    ['Brands', '/brands'],
    ['Favorites', '/favorites'],
    ['Cart', '/cart'],
    accountLink,
  ]
  const support = [
    ['Shipping', '/shop'],
    ['Returns', '/account'],
    ['Gift cards', '/shop'],
    ['Bulk orders', '/admin'],
  ]

  return (
    <footer className="relative overflow-hidden border-t border-border bg-primary text-primary-foreground">
      <OrganicBlob className="-left-20 top-12 h-72 w-72 bg-secondary/25" />
      <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr] lg:px-6">
        <div>
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid size-11 place-items-center rounded-full bg-accent text-primary">
              <Sparkles size={21} />
            </span>
            <span className="font-heading text-2xl font-black">TEOMax</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm font-bold leading-7 text-primary-foreground/72">
            Premium toys, playful learning kits, fast checkout, and an admin-ready e-commerce
            backend for managing a modern toy store.
          </p>
          <div className="mt-5 grid gap-3 text-sm font-bold text-primary-foreground/78">
            <span className="inline-flex items-center gap-2">
              <MapPin size={17} className="text-sun" /> Delhi NCR, India
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone size={17} className="text-sun" /> +91 98765 43210
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={17} className="text-sun" /> hello@teomax.com
            </span>
          </div>
        </div>

        <FooterColumn title="Explore" links={links} />
        <FooterColumn title="Support" links={support} />

        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
          <p className="font-heading text-xl font-black">Get playful deals first</p>
          <p className="mt-2 text-sm font-bold leading-6 text-primary-foreground/70">
            New arrivals, birthday picks, and weekend offers in your inbox.
          </p>
          <form
            className="mt-4 flex overflow-hidden rounded-full border border-white/15 bg-white"
            onSubmit={(event) => {
              event.preventDefault()
              toast.success('Subscribed to TEOMax updates')
            }}
          >
            <input
              type="email"
              required
              placeholder="Email address"
              className="min-w-0 flex-1 px-4 text-sm font-bold text-ink outline-none"
            />
            <button className="bg-secondary px-5 text-sm font-black text-secondary-foreground" type="submit">
              Join
            </button>
          </form>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              [Truck, 'Fast ship'],
              [ShieldCheck, 'Secure'],
              [CreditCard, 'Payments'],
            ].map(([Icon, label]) => (
              <div key={label} className="rounded-[1.4rem] bg-white/8 p-3 text-center">
                <Icon className="mx-auto text-accent" size={20} />
                <p className="mt-2 text-xs font-black text-white/75">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs font-bold text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>TEOMax Toys - React, Tailwind, Node, Mongo-ready e-commerce demo</p>
          <p>Built for cart, checkout, favorites, account, and admin workflows.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase text-accent">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map(([label, to]) => (
          <Link key={label} to={to} className="text-sm font-bold text-primary-foreground/72 transition hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

function AppShell() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
