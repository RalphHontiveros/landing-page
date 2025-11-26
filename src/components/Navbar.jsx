import { useEffect, useState } from 'react';

// Reusable NavLink component with palette-aware focus/hover styles
const NavLink = ({ href, children, isMobile, onClick }) => {
  const baseClasses = 'relative font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 dark:focus:ring-offset-slate-900';

  if (isMobile) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={
          baseClasses +
          ' text-lg py-2 px-3 rounded-lg text-slate-200 hover:text-white block'
        }
        style={{ backgroundColor: 'transparent' }}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={
        baseClasses +
        ' text-sm px-2 py-1 text-slate-300 hover:text-[color:var(--accent)] group'
      }
    >
      {children}
      <span
        className="absolute left-0 right-0 bottom-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
        style={{ backgroundColor: 'var(--accent)' }}
      />
    </a>
  );
};

export default function Navbar({ dark, toggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 5);
    }
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [menuOpen]);

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow bg-white/5 dark:bg-black/40 backdrop-blur-lg border-b border-slate-800 ${
        scrolled ? 'shadow-xl shadow-black/30' : ''
      }`}
      style={{ position: 'sticky' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo area */}
        <div className="flex items-center gap-3">
          <a href="#home" className="flex items-center gap-2 group" aria-label="Go to homepage">
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg group-hover:scale-[1.02] transition-transform duration-200 ease-out"
              style={{
                background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
                boxShadow: '0 8px 18px rgba(97,0,148,0.35)'
              }}
            >
              LP
            </span>
            <span className="font-extrabold text-xl tracking-tighter text-slate-100 group-hover:text-[color:var(--accent)] transition-colors duration-200">
              LandingPage
            </span>
          </a>
        </div>

        {/* Desktop nav and CTA */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {/* Primary CTA Button using design tokens */}
            <a
              href="#cta"
              className="px-4 py-2 text-sm font-semibold rounded-full text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                boxShadow: '0 10px 24px rgba(97,0,148,0.35)'
              }}
            >
              Get Started
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-yellow-400">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 7.5a.75.75 0 01.53.22L9.34 9.1a.75.75 0 01-1.06 1.06L6.97 8.78a.75.75 0 01.53-1.28zM3 12a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM12 18a.75.75 0 01-.75-.75v-2.5a.75.75 0 011.5 0v2.5a.75.75 0 01-.75.75zM16.47 7.5a.75.75 0 010 1.06l-1.41 1.41a.75.75 0 11-1.06-1.06l1.41-1.41a.75.75 0 011.06 0zM21 12a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h2.5a.75.75 0 01.75.75zM12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-slate-300">
                  <path d="M21.75 12.82a.75.75 0 00-.51-.18A9.75 9.75 0 0110.89 3.01a.75.75 0 00-.77.16A11.25 11.25 0 0021.75 12.82z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile: Toggle and Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-yellow-400">
                <path d="M12 2.25a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 7.5a.75.75 0 01.53.22L9.34 9.1a.75.75 0 01-1.06 1.06L6.97 8.78a.75.75 0 01.53-1.28zM3 12a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM12 18a.75.75 0 01-.75-.75v-2.5a.75.75 0 011.5 0v2.5a.75.75 0 01-.75.75zM16.47 7.5a.75.75 0 010 1.06l-1.41 1.41a.75.75 0 11-1.06-1.06l1.41-1.41a.75.75 0 011.06 0zM21 12a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h2.5a.75.75 0 01.75.75zM12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-slate-300">
                <path d="M21.75 12.82a.75.75 0 00-.51-.18A9.75 9.75 0 0110.89 3.01a.75.75 0 00-.77.16A11.25 11.25 0 0021.75 12.82z"/>
              </svg>
            )}
          </button>

          <button
            className="flex items-center justify-center p-2 rounded-full text-slate-300 hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(m => !m)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" className="transition-all duration-300 ease-in-out"/>
              ) : (
                <g className="transition-all duration-300 ease-in-out">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </g>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <nav
              className="absolute right-4 top-4 w-11/12 max-w-xs rounded-2xl bg-black/70 border border-slate-800 shadow-2xl flex flex-col gap-2 p-4 pt-6 animate-slide-in-right transform origin-top-right"
              onClick={e => e.stopPropagation()}
              role="menu"
            >
              <NavLink href="#features" isMobile onClick={handleNavClick}>Features</NavLink>
              <NavLink href="#about" isMobile onClick={handleNavClick}>About</NavLink>
              <NavLink href="#testimonials" isMobile onClick={handleNavClick}>Testimonials</NavLink>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <a
                  href="#cta"
                  onClick={handleNavClick}
                  className="w-full text-center px-4 py-3 font-semibold rounded-lg text-white transition-colors block"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    boxShadow: '0 8px 20px rgba(97,0,148,0.35)'
                  }}
                >
                  Get Started Free
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Local styles for mobile menu animation */}
      <style>{`
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(100%) scale(0.95); }
          100% { opacity: 1; transform: translateX(0%) scale(1); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
      `}</style>
    </header>
  );
}
