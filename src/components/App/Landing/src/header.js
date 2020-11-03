import React, {Component} from 'react'
import { Link } from 'react-router-dom';

class Header extends Component {
    render(){
        return(
            <div>
                <header className="br_header header-default header-transparent light-logo--version haeder-fixed-width headroom--sticky header-mega-menu clearfix">
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                        <div className="header__wrapper mr--0">
                            {/* Header Left */}
                            <div className="header-left flex-20">
                            <div className="logo">
                                <a href="index.html">
                                <img src="img/logo/brook-white.png" alt="Brook Images" />
                                </a>
                            </div>
                            </div>
                            {/* Mainmenu Wrap */}
                            <div className="header-flex-right flex-80">
                            <div className="mainmenu-wrapper have-not-flex d-none d-lg-block">
                                <nav className="page_nav">
                                    <ul className="mainmenu">
                                        <li className="lavel-1 with--drop"><Link to={'/'}><span>HOME</span></Link></li>
                                        <li className="lavel-1 with--drop"><Link to={'/payouts'}><span>PAYOUTS</span></Link></li>
                                        <li className="lavel-1 with--drop"><Link to={'/faq'}><span>FAQ</span></Link></li>
                                        <li className="lavel-1 with--drop"><Link to={'/contact'}><span>CONTACT US</span></Link></li>
                                    </ul>
                                </nav>
                            </div>
                            {/* Header Right */}
                            <div className="header-right have-not-flex d-sm-flex pl--35 pr_md--40 pr_sm--40">
                                {/* Start Social Icon */}
                                <ul className="social-icon icon-size-medium text-center tooltip-layout d-none d-sm-flex">
                                <li className="facebook"><a href="!#" className="link hint--bounce hint--top hint--white" aria-label="Facebook"><i className="fab fa-user" /></a></li>
                                </ul>
                                {/* End Social Icon */}
                                {/* Start Hamberger */}
                                <div className="manu-hamber popup-mobile-click d-lg-none light-version d-block d-xl-none pl_md--20 pl_sm--20">
                                <div>
                                    <i />
                                </div>
                                </div>
                                {/* End Hamberger */}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </header>
                {/*// Header */}

                {/* Start Popup Menu */}
                <div className="popup-mobile-manu popup-mobile-visiable">
                    <div className="inner">
                        <div className="mobileheader">
                            <div className="logo">
                            <a href="index.html">
                                <img src="img/logo/brook-black.png" alt="Multipurpose" />
                            </a>
                            </div>
                            <a className="mobile-close" href="!#" />
                        </div>
                        <div className="menu-content">
                            <ul className="menulist object-custom-menu">
                                <li className="has-mega-menu"><a href="!#"><span>HOME</span></a></li>
                                <li className="has-mega-menu"><a href="!#"><span>PAYOUTS</span></a></li>
                                <li className="has-mega-menu"><a href="!#"><span>FAQ</span></a></li>
                                <li className="has-mega-menu"><a href="!#"><span>CONTACT US</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;