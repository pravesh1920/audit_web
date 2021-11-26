 // Header.js
 import React, {Fragment} from 'react';

 export default function Footer() {
         return (
     <Fragment>  
       
     <footer className="footer">
         <div className="container">
             <div className="row">
                 <div className="col-12">
                     <div className="footer__content">
                         <a href="/" className="footer__logo">
                             <img src="img/footer-logo.svg" alt="" />
                         </a>
                         <span className="footer__copyright">© 2020 NokelsTV Create by <a href="/" target="_blank">Itinformatix</a>
                         </span>
                         <nav className="footer__nav">
                             <a href="/aboutus">About Us</a>
                             <a href="/contacts">Contacts</a>
                             <a href="/privacypolicy">Privacy Policy</a>
                             <a href="/TermsCondition">Terms and conditions</a>
                             <a href="/faq">FAQ</a>
                         </nav>
                         <button className="footer__back" type="button">
                             <i className="icon ion-ios-arrow-round-up"></i>
                         </button>
                     </div>
                 </div>
             </div>
         </div>
      </footer>
     
      </Fragment>
         )
 }