import React from 'react'
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";

export default ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main class="App ui container">
        <div class="ui grid pt2">
          <aside class="Developers__sidebar five wide computer sixteen wide mobile column">
            <nav class="ui vertical menu">

              <section class="item">
                <h3 class="header">Start here</h3>
                <section class="menu">
                  <a href="/developers/getting-started" class="item">Quick start guide</a>
                  <a href="#" class="item">Example apps</a>
                </section>
              </section>

              <section class="item">
                <h3 class="header">APIs</h3>
                <section class="menu">
                  <a href="http://docs.api.kushy.net/#strains" class="item">
                    Strains
                          </a>
                  <a href="http://docs.api.kushy.net/#products" class="item">
                    Products
                          </a>
                  <a href="http://docs.api.kushy.net/#brands" class="item">
                    Brands
                          </a>
                  <a href="http://docs.api.kushy.net/#strains" class="item">
                    Shops
                          </a>
                </section>
              </section>

              <section class="item">
                <h3 class="header">Kushy App Directory</h3>
                <section class="menu">
                  <a href="#" class="item">
                    Submission checklist
                          </a>
                  <a href="#" class="item">
                    Submission guidelines
                          </a>
                  <a href="#" class="item">
                    App suggestions
                          </a>
                  <a href="#" class="item">
                    App Directory
                          </a>
                  <a href="#" class="item">
                    Developer policies
                          </a>
                </section>
              </section>

              <section class="item">
                <h3 class="header">Authentication</h3>
                <section class="menu">
                  <a href="#" class="item">
                    Using OAuth 2.0
                          </a>
                  <a href="#" class="item">
                    Permissions system
                          </a>
                  <a href="#" class="item">
                    Scopes
                          </a>
                  <a href="#" class="item">
                    Token types
                          </a>
                  <a href="#" class="item">
                    Security recommendations
                          </a>
                  <a href="#" class="item">
                    Kushy Button
                          </a>
                  <a href="#" class="item">
                    Sign in with Kushy
                          </a>
                </section>
              </section>

              <section class="item">
                <h3 class="header">Need help?</h3>
                <section class="menu">
                  <a href="https://kushy.net/support/api" class="item">
                    API Support
                          </a>
                  <a href="https://twitter.com/KushyApi" class="item">
                    @KushyAPI
                          </a>
                </section>
              </section>


              <section class="item">
                <h3 class="header">Community</h3>
                <section class="menu">
                  <a href="http://kushy.net/developers/faq/" class="item">
                    FAQ
                          </a>
                  <a href="http://blog.kushy.net/developers/" class="item">
                    Engineering Blog
                          </a>
                  <a href="http://trello/" class="item">
                    Platform Roadmap
                          </a>
                  <a href="http://trello/" class="item">
                    Ideaboard
                          </a>
                  <a href="http://kushy.net/terms/api/" class="item">
                    API Terms of Service
                          </a>
                </section>
              </section>

            </nav>
          </aside>

          <section class="App eleven wide computer sixteen wide mobile column">

              <section class="Developers ui container centered">



              { children }

              </section>
          </section>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  )
}
