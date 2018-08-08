import React from 'react'
import Main from "layouts/Main/Main";
import config from 'config/config';

export default () => {
  const s3 = config.assets.root + config.assets.site;
  return (
    <Main>
      <section class="Press">

        <header class="ui inverted vertical red masthead center aligned segment">
          <h1 class="ui header centered">Press</h1>
        </header>

        <article class="ui grid centered">

          <section class="ui grid eleven wide computer sixteen wide mobile column">
            <section class="ui segment centered">
              <h2>Brand Guidelines</h2>
              <p>We know that you love Kushy. That’s why we’ve made this easy to use guide that shows you our basic design elements and how to use them.</p>
              <a href="/" class="ui button">Download Style Guide</a>
            </section>

            <section class="ui grid centered">
              <div class="seven wide computer sixteen wide mobile column">
                <figure class="container center">
                  <img src={`${s3}Press/press-logos.png`} alt="Discover dispensaries, headshops, doctors, and more with Kushy" class="image" />
                </figure>
              </div>
              <div class="ui eight wide computer sixteen wide mobile column">
                <div class="ui segment">
                  <h2>Need logos? We got em.</h2>
                  <p>Looking for the Kushy logo or assets? We’ve got files for print (.EPS) and web (.SVG and .PNG). Make sure to check out brand guidelines - respect the red bro.</p>
                </div>
              </div>
            </section>

            <section class="ui segment centered">
              <h2>Did somebody say Kushy?</h2>
              <ul>
                <li><a href="/">OCWeekly</a></li>
              </ul>
            </section>

          </section>

        </article>
      </section>
    </Main>
  )
}
