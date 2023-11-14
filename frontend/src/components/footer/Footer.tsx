import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

interface FooterProps {
  authorName: string;
  portfolioUrl: string;
}

const Footer: React.FC<FooterProps> = ({ authorName, portfolioUrl }) => {
  return (
    <footer className="footer-container">
      <p className="footer-text">
        Built With love by  
        <span className="footer-author-name">
          <Link to={portfolioUrl} className="footer-link">
             {authorName} (Click to see my portfolio!)
          </Link>
        </span>
        💘
      </p>
    </footer>
  );
};

export default Footer;