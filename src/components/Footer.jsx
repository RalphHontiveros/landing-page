import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo & Copyright */}
        <div className="flex items-center gap-3">
          {/* Logo with Gradient and Glow */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-extrabold text-lg"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              boxShadow: '0 0 10px rgba(99,102,241,0.5)',
            }}
          >
            LP
          </div>
          <div className="text-base text-slate-300">
            © {year} Landing Platform. All rights reserved.
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:text-base">
          {[
            { href: '#about', label: 'About Us' },
            { href: '#features', label: 'Features' },
            { href: '#contact', label: 'Contact' },
            { href: '#', label: 'Privacy Policy' },
          ].map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-slate-400 hover:text-white transition duration-200 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  );
}
