import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';

const Footer = () => {
  return (
    <footer className="glass-dark border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GiCricketBat className="w-8 h-8 text-neon-green" />
              <span className="text-white font-bold text-xl">Cricket Scheduler</span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional tournament scheduling with Backtracking & Graph Coloring algorithms.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-neon-green transition-colors">Home</a></li>
              <li><a href="/teams" className="hover:text-neon-green transition-colors">Teams</a></li>
              <li><a href="/schedule" className="hover:text-neon-green transition-colors">Schedule</a></li>
              <li><a href="/points-table" className="hover:text-neon-green transition-colors">Points Table</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Cricket Tournament Scheduler. Built with React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
