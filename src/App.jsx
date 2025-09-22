import './App.css'
import { useMemo, useState } from 'react'

const FILTERS = [
  'All',
  'Portrait',
  'Landscape',
  'Square',
  'Collage',
  'Couple',
  'Baby Birth',
  'Dual Border',
  'Creative Wall',
]

const PRODUCTS = [
  { id: 'p1', title: 'Portrait Acrylic Wall Photo', tags: ['Portrait'] },
  { id: 'p2', title: 'Portrait Acrylic Wall Photo Dual Border', tags: ['Portrait','Dual Border'] },
  { id: 'p3', title: 'Landscape Acrylic Wall Photo', tags: ['Landscape'] },
  { id: 'p4', title: 'Landscape Acrylic Wall Photo Dual Border Frame', tags: ['Landscape','Dual Border'] },
  { id: 'p5', title: 'Rounded Rect Portrait Acrylic Wall Photo', tags: ['Portrait'] },
  { id: 'p6', title: 'Acrylic Square Wall Photo Frame', tags: ['Square'] },
  { id: 'p7', title: 'Square Round Acrylic Wall Photo', tags: ['Square'] },
  { id: 'p8', title: 'Acrylic Square Wall Photo Dual Border Frame', tags: ['Square','Dual Border'] },
  { id: 'p9', title: 'Rounded Rect Landscape Acrylic Wall Photo', tags: ['Landscape'] },
  { id: 'p10', title: 'Circle Acrylic Wall Photo', tags: ['Creative Wall'] },
  { id: 'p11', title: 'Circle Dual Border Frame Wall Photo', tags: ['Creative Wall','Dual Border'] },
  { id: 'p12', title: 'Dual Border Frame Square Round Acrylic Wall Photo', tags: ['Square','Dual Border'] },
  { id: 'p13', title: 'Balloon Shape Acrylic Wall Photo', tags: ['Creative Wall'] },
  { id: 'p14', title: 'Balloon Shape Dual Border Frame Acrylic Wall Photo', tags: ['Creative Wall','Dual Border'] },
  { id: 'p15', title: 'Rounded Rect Portrait Acrylic Dual Border Wall Photo', tags: ['Portrait','Dual Border'] },
  { id: 'p16', title: 'Extra Rounded Shape Portrait Acrylic Wall Photo', tags: ['Portrait'] },
  { id: 'p17', title: 'Extra Rounded Shape Landscape Acrylic Wall Photo', tags: ['Landscape'] },
  { id: 'p18', title: 'Rounded Rect Landscape Acrylic Dual Border Wall Photo', tags: ['Landscape','Dual Border'] },
  { id: 'p19', title: 'Extra Rounded Shape Portrait Dual Border Frame Acrylic Wall Photo', tags: ['Portrait','Dual Border'] },
  { id: 'p20', title: 'Extra Rounded Shape Landscape Dual Border Frame Acrylic Wall Photo', tags: ['Landscape','Dual Border'] },
  { id: 'p21', title: 'Bean Shape Landscape Acrylic Wall Photo', tags: ['Landscape','Creative Wall'] },
  { id: 'p22', title: 'Bean Shape Portrait Acrylic Wall Photo', tags: ['Portrait','Creative Wall'] },
  { id: 'p23', title: 'Egg Shape Portrait Acrylic Wall Photo', tags: ['Portrait','Creative Wall'] },
  { id: 'p24', title: 'Bean Shape Portrait Dual Border Frame Acrylic Wall Photo', tags: ['Portrait','Creative Wall','Dual Border'] },
  { id: 'p25', title: 'Egg Shape Portrait Dual Border Frame Acrylic Wall Photo', tags: ['Portrait','Creative Wall','Dual Border'] },
  { id: 'p26', title: 'Bean Shape Landscape Dual Border Frame Acrylic Wall Photo', tags: ['Landscape','Creative Wall','Dual Border'] },
  { id: 'p27', title: 'Egg Shape Landscape Acrylic Wall Photo', tags: ['Landscape','Creative Wall'] },
  { id: 'p28', title: 'Egg Shape Landscape Dual Border Frame Acrylic Wall Photo', tags: ['Landscape','Creative Wall','Dual Border'] },
  { id: 'p29', title: '5 Pics Collage Premium Acrylic Wall Photo', tags: ['Collage'] },
  { id: 'p30', title: 'Creative Acrylic Wall Photo Art Combo Landscape', tags: ['Creative Wall','Landscape'] },
]

// Prefer PNG screenshots in public/photos/New Folder With Items due to browser HEIC limitations
const IMAGES = [
  '/photos/New%20Folder%20With%20Items/Screenshot%202023-09-28%20at%201.30.59%20PM.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202023-09-28%20at%201.31.09%20PM.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202023-09-28%20at%201.31.17%20PM.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202023-09-28%20at%201.44.07%20PM.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202023-09-28%20at%201.44.17%20PM.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202023-09-28%20at%201.44.39%20PM.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202023-09-29%20at%205.41.24%20PM.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202024-05-02%20at%2012.26.38%E2%80%AFPM.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-01-20%20at%2012.32.05.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-02-25%20at%2016.29.26.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-02-26%20at%2017.18.31.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-02-27%20at%2016.03.15.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-05-09%20at%2014.44.55.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-05-09%20at%2015.05.35.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-05-15%20at%2020.42.23.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-05-16%20at%2013.02.16.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-05-16%20at%2013.04.03.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-05-16%20at%2013.11.19.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-05-16%20at%2021.03.57.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-05-16%20at%2023.55.17.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-05-31%20at%2011.38.48.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-06-27%20at%2000.59.07.png',
  '/photos/New%20Folder%20With%20Items/Screenshot%202025-06-27%20at%2000.59.33.png',
]

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="spacer" />
        <div className="brand">OMGs</div>
        <div className="header-actions">
          <button className="btn ghost">Cart (0)</button>
          <button className="btn ghost">Login</button>
        </div>
      </div>
    </header>
  )
}

function Filters({ active, onChange }) {
  return (
    <div className="filters container">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={`chip ${active === f ? 'chip-active' : ''}`}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  )
}

function ProductCard({ title, image }) {
  const [arClass, setArClass] = useState('ar-landscape')
  return (
    <div className="card product-card">
      <div className={`product-thumb ${arClass}`}>
        {image ? (
          <img
            src={image}
            alt={title}
            onLoad={(e) => {
              const img = e.currentTarget
              const ratio = img.naturalWidth / img.naturalHeight
              if (ratio > 1.15) setArClass('ar-landscape')
              else if (ratio < 0.9) setArClass('ar-portrait')
              else setArClass('ar-square')
            }}
            onError={() => setArClass('')}
          />
        ) : null}
      </div>
      <div className="product-content">
        <h3 className="product-title">{title}</h3>
        <button className="btn secondary">Customise</button>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-columns">
        <div className="footer-col">
          <h4 className="footer-title">NEED HELP?</h4>
          <div className="footer-rule" />
          <div className="whats">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.52 3.48A11.78 11.78 0 0 0 12.05 0C5.71 0 .57 5.14.57 11.47c0 2.02.53 3.98 1.54 5.71L0 24l6.98-2.1a11.44 11.44 0 0 0 5.07 1.19h.01c6.34 0 11.47-5.14 11.47-11.47 0-3.06-1.19-5.93-3.01-7.94ZM12.06 21.2h-.01a9.7 9.7 0 0 1-4.95-1.36l-.35-.21-4.14 1.24 1.25-4.04-.23-.37a9.68 9.68 0 0 1-1.49-5.12c0-5.35 4.35-9.7 9.71-9.7 2.59 0 5.03 1.01 6.86 2.85a9.63 9.63 0 0 1 2.84 6.85c0 5.35-4.35 9.7-9.7 9.7Zm5.33-7.25c-.29-.15-1.73-.85-2-.94-.27-.1-.47-.15-.67.15-.19.29-.77.94-.94 1.13-.17.19-.35.22-.64.07-.29-.15-1.22-.45-2.33-1.45-.86-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.35.43-.52.14-.17.19-.29.29-.49.1-.19.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51l-.57-.01c-.19 0-.5.07-.76.37-.26.29-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.11.55-.08 1.73-.71 1.98-1.4.24-.69.24-1.29.17-1.4-.07-.11-.26-.18-.55-.33Z"/>
            </svg>
          </div>
          <div className="contact-lines">
            <div>Email: support@omgs.in</div>
            <div>9653941887</div>
          </div>
          <div className="store-badges">
            <div className="badge">Google Play</div>
            <div className="badge">App Store</div>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">QUICK LINKS</h4>
          <div className="footer-rule" />
          <ul className="links lined">
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund or Return Policy</a></li>
            <li><a href="#">Track Your Order</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">WE PRINT AND SHIP FROM ❤️ INDIA</h4>
          <div className="footer-rule" />
          <div className="subhead">DUAL PROCESSING FACILITIES</div>
          <div className="address-group">
            <div>1/57, Kanakpura RIICO Industrial Area,</div>
            <div>Sirsi Road, Jaipur, 302034 Rajasthan</div>
          </div>
          <div className="address-group">
            <div>Shed NO. C-1 ANNEX,</div>
            <div>KSSIDC Industrial Area,</div>
            <div>Yelahanka, (Opp. Rail Wheel Factory)</div>
            <div>Bengaluru-560064. KARNATAKA</div>
          </div>
          <div className="footer-logo">OMGS</div>
        </div>
      </div>

      <div className="footer-copy">
        <div className="container copy-inner">Copyright 2016-2025 © <strong>OMGS.in</strong></div>
      </div>
    </footer>
  )
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleProducts = useMemo(() => {
    if (activeFilter === 'All') return PRODUCTS
    return PRODUCTS.filter(p => p.tags.includes(activeFilter))
  }, [activeFilter])

  return (
    <div className="page">
      <Header />
      <section className="hero">
        <div className="container">
          <h1 className="page-title">Acrylic Wall Photo</h1>
          <p className="subtitle">Framed Acrylic Wall Photo</p>
        </div>
      </section>

      <div className="container breadcrumb">Home /</div>

      <section className="filters-section">
        <Filters active={activeFilter} onChange={setActiveFilter} />
      </section>

      <section className="products-section">
        <div className="container grid">
          {visibleProducts.map((p, i) => (
            <ProductCard key={p.id} title={p.title} image={IMAGES[i % IMAGES.length]} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
