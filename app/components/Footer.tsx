import React from "react";
import Link from "next/link";

import Wrapper from "./uiElements/Wrapper";

import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <Wrapper>

        <nav className="footer__nav" aria-label="Footer aside navigation">
          <ul className="footer__list">
            <h3 className="footer__heading">Quick links</h3>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                about us
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                our services
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                our gallery
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                our team
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                book now
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                contact us
              </Link>
            </li>
          </ul>
          <ul className="footer__list">
            <h3 className="footer__heading">Policy</h3>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                conditions
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                privaces
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                cookie settings
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                outlines
              </Link>
            </li>
          </ul>
          <ul className="footer__list">
            <h3 className="footer__heading">Shop</h3>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                furnitures
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                properties
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                tables
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                desks
              </Link>
            </li>
          </ul>
          <ul className="footer__list">
            <h3 className="footer__heading">Follow us</h3>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                facebook
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                twitter
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                instagram
              </Link>
            </li>
            <li className="footer__list-item">
              <Link href="/" className="footer__link">
                youtube
              </Link>
            </li>
          </ul>
        </nav>

      </Wrapper>
    </footer>
  );
};

export default Footer;
