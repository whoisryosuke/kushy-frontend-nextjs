import React from 'react'
import Main from "layouts/Main/Main";
import config from 'config/config';

export default () => {
  const s3 = config.assets.root + config.assets.site;
  const background = `url(${s3}Services/kushy-imac.png) center no-repeat`
  return (
    <Main>
      <section class="Advertise ContentArea">

        <header class="ui inverted vertical red masthead center aligned segment">
          <h1 class="ui header">Advertise with Kushy</h1>
        </header>

        <article class="ui grid centered pt3">

          <section class="twelve wide column ui grid">
            <div class="left floated six wide computer sixteen wide mobile column" style={{minHeight:'356px', background: background, backgroundSize: 'contain'}}>

            </div>
            <div class="right floated ui segment seven wide computer sixteen wide mobile column">
              <h2>Get local with your ads</h2>
              <p>With the Kushy platform, we’ve been able to create the greatest solution for local businesses looking to reach out to their customer base in their city, county, or state.</p>
              <p>Contact us today to see how you can promote your business to local cannabis consumers!</p>
              <a href="/contact" class="ui button">Contact Us</a>
            </div>
          </section>


        </article>
      </section>
    </Main>
  )
}
