import React, {Component} from 'react'

class Footer extends Component {
    render(){
        return(
            <footer id="bk-footer-area" className="page-footer bg_color--3 pl--150 pr--150 pl_lp--40 pr_lp--40 pl_lg--30 pr_lg--30 pl_md--30 pr_md--30 pl_sm--20 pr_sm--20 pl_mobile--20 pr_mobile--20">
            <div className="bk-footer-inner pt--150 pb--100 pt_sm--80 pb_sm--40 pt_md--80 pb_md--40">
            <div className="row">
                <div className="col-lg-6 col-xl-6">
                <div className="bk-footer-widget">
                    <h2 className="heading heading-h2 text-white line-height-1-39">Start working
                    on a <br /> new project?</h2>
                </div>
                </div>
                <div className="col-lg-6 col-xl-5 offset-xl-1">
                <div className="bk-footer-widget menu--contact mt_md--30 mt_sm--30">
                    <h4 className="heading heading-h4 text-white line-height-1-2">Contact us</h4>
                    <div className="bkseparator--35" />
                    <div className="footer-address">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-6 col-12">
                        <p className="bk_pra text-white line-height-1-63">2005 Stokes Isle Apt. 896,
                            <br /> Venaville 10010, USA</p>
                        <div className="social-share social--transparent text-white mt--45">
                            <a href="!#"><i className="fab fa-facebook" /></a>
                            <a href="!#"><i className="fab fa-twitter" /></a>
                            <a href="!#"><i className="fab fa-instagram" /></a>
                            <a href="!#"><i className="fab fa-dribbble" /></a>
                            <a href="!#"><i className="fab fa-pinterest" /></a>
                        </div>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-6 col-12 mt_mobile--30">
                        <p className="bk_pra text-white line-height-1-63 bk-hover"><a className="text-white" href="!#">info@yourdomain.com</a></p>
                        <p className="bk_pra text-white line-height-1-63 bk-hover"><a className="text-white" href="!#">(+68)
                            120034509</a></p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="copyright ptb--50">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="copyright-left text-md-left text-center">
                    <ul className="bk-copyright-menu d-flex bk-hover justify-content-center justify-content-md-start flex-wrap flex-sm-nowrap">
                    <li><a href="!#">Our blog</a></li>
                    <li><a href="!#">Latest projects</a></li>
                    <li><a href="!#">Contact us</a></li>
                    </ul>
                </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="copyright-right text-md-right text-center">
                    <p className="text-white">© 2019 Brook. All Rights Reserved.</p>
                </div>
                </div>
            </div>
            </div>
        </footer>
        )
    }
}

export default Footer;