import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import SandTransition from './SandTransition';

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-black selection:text-white relative font-sans overflow-hidden">
      {/* Navigation (Sticky) */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-serif font-bold text-xl">
              C
            </div>
            <div className="font-sans font-medium text-lg tracking-widest uppercase">
              Campus Life
            </div>
          </Link>
          <div className="hidden md:flex space-x-8 font-sans text-sm tracking-widest text-text-secondary">
            <Link to="/" className={`hover:text-black transition-colors duration-300 ${location.pathname === '/' ? 'text-black font-medium' : ''}`}>首頁</Link>
            <Link to="/year/1" className={`hover:text-black transition-colors duration-300 ${location.pathname === '/year/1' ? 'text-black font-medium' : ''}`}>大一</Link>
            <Link to="/year/2" className={`hover:text-black transition-colors duration-300 ${location.pathname === '/year/2' ? 'text-black font-medium' : ''}`}>大二</Link>
            <Link to="/year/3" className={`hover:text-black transition-colors duration-300 ${location.pathname === '/year/3' ? 'text-black font-medium' : ''}`}>大三</Link>
            <Link to="/year/4" className={`hover:text-black transition-colors duration-300 ${location.pathname === '/year/4' ? 'text-black font-medium' : ''}`}>大四</Link>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        <SandTransition key={location.pathname} pathKey={location.pathname}>
          <main>
            {outlet}
          </main>

          {/* Footer */}
          <footer id="contact" className="py-16 bg-white border-t border-gray-100 text-center relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-serif font-bold text-2xl mb-8">
                C
              </div>
              <div className="flex space-x-8 mb-12 font-sans text-sm tracking-widest text-text-secondary">
                <a href="#" className="hover:text-black transition-colors">INSTAGRAM</a>
                <a href="#" className="hover:text-black transition-colors">FACEBOOK</a>
                <a href="#" className="hover:text-black transition-colors">EMAIL</a>
              </div>
              <p className="font-sans text-xs tracking-widest text-gray-400">
                &copy; {new Date().getFullYear()} CAMPUS LIFE. ALL RIGHTS RESERVED.
              </p>
            </div>
          </footer>
        </SandTransition>
      </AnimatePresence>
    </div>
  );
}
