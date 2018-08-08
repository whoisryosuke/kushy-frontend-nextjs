import React from 'react'
import config from "config/config";

export default () => {
  const s3 = config.assets.root + config.assets.site;
  return (
    <footer className="SiteFooter ui red inverted segment cta pt2"> 
        <nav className="ui grid centered aligned">
            <aside className="six wide computer sixteen wide mobile column">
                <img src={`${s3}Brand/kushy-logotype-white@0.5x.png`} className="Logo" alt="Kushy" />
                <p>Discover local dispensaries, headshops, glass artists, lawyers, and more with our comprehensive database of cannabis companies.</p>
                <p>Designed in Los Angeles, CA<br />
                    <span style={{ fontSize: 'small', color: '#CCC', fontStyle: 'italic' }}>Currently in beta</span>
                </p>
            </aside>

            <aside className="three wide computer sixteen wide mobile column">
                <h4 className="ui header text white">About</h4>
                <div className="ui list link inverted">
                    <a className="item" href="/about">About Us</a>
                    <a className="item" href="/contact">Contact Us</a>
                    <a className="item" href="/press">Press</a>
                    <a className="item" href="/content-guidelines">Content Guidelines</a>
                    <a className="item" href="/terms">Terms of Service</a>
                    <a className="item" href="/privacy">Privacy Policy</a>
                </div>
            </aside>

            <aside className="three wide computer sixteen wide mobile column">
                <h4 className="ui header text white">Discover</h4>
                <div className="ui list link inverted">
                    <a className="item" href="http://blog.kushy.net/">Kushy Blog</a>
                    <a className="item" href="/">Local Businesses</a>
                    <a className="item" href="/how-it-works">How it Works</a>
                    <a className="item" href="/">Support</a>
                    <a className="item" href="/">RSS</a>
                    <a className="item" href="/developers">Developers</a>
                </div>
            </aside>

            <aside className="three wide computer sixteen wide mobile column">
                <h4 className="ui header text white">Business Owners</h4>
                <div className="ui list link inverted">
                    <a className="item" href="/add-your-listing">Add Your Listing</a>
                    <a className="item" href="/advertise">Advertise with Us</a>
                    <a className="item" href="/business">Business Tour</a>
                    <a className="item" href="/">Business Support</a>
                    <a className="item" href="/">Business Dashboard</a>
                </div>
            </aside>
        </nav>
    </footer>
  )
}