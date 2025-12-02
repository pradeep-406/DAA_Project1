import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-dark mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center space-x-2">
              <GiCricketBat className="w-6 h-6 text-neon-green" />
              <span className="text-lg font-bold text-white">Cricket Tournament</span>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Professional tournament management made easy
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center space-y-3">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <a href="/" className="hover:text-neon-green transition-colors">Home</a>
              <a href="/add-teams" className="hover:text-neon-green transition-colors">Teams</a>
              <a href="/schedule" className="hover:text-neon-green transition-colors">Schedule</a>
              <a href="/points-table" className="hover:text-neon-green transition-colors">Points</a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <h3 className="text-white font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Cricket Tournament Manager. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Built with React, Tailwind CSS & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
