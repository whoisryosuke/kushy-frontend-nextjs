import React from 'react'
import Main from "layouts/Main/Main";
import config from 'config/config';

export default () => {
  const s3 = config.assets.root + config.assets.site;
  return (
    <Main>
      <section class="Advertise ContentArea">

        <header class="ui container hero center aligned basic segment">
          <div class="hero__half hero__content">
            <h1 class="ui header">Getting cannabis has never been easier</h1>
            <p class="secondary">In just a few simple steps, you can find and preorder cannabis products from verified <a href="http://kushy.net/shops/category/Recreational Dispensary">dispensaries</a>.</p>
          </div>
        </header>

        <article class="ui container">

          <section class="ui basic segment Timeline--vertical">
            <div class="ui grid">
              <aside class="Timeline_icon three wide computer sixteen wide mobile column">
                <span>
                  <img src={`${s3}Icons/icon-smoker.svg`} alt="This could be you, but you playin." />
                </span>
              </aside>
              <section class="thirteen wide computer sixteen wide mobile column">
                <h2>Sign up</h2>
                <p>Create your account here and begin your journey</p>
              </section>
            </div>
            <div class="ui grid">
              <div class="Timeline_icon three wide computer sixteen wide mobile column">
                <span>
                  <img src={`${s3}Icons/icon-leaf.svg`} alt="This could be you, but you playin." />
                </span>
              </div>
              <div class="thirteen wide computer sixteen wide mobile column">
                <h2>Discover local weed businesses</h2>
                <p>From dispensaries to headshops to glass artists, we’ve got every ganja-related  business across the globe.</p>
              </div>
            </div>
            <div class="ui grid">
              <div class="Timeline_icon three wide computer sixteen wide mobile column">
                <span>
                  <img src={`${s3}Icons/icon-rx.svg`} alt="This could be you, but you playin." />
                </span>
              </div>
              <div class="thirteen wide computer sixteen wide mobile column">
                <h2>Get Verified</h2>
                <p>If you’re a medical marijuana patient looking to shop for cannabis products, head over to your verification page and upload a valid I.D. and doctor’s recommendation.</p>
              </div>
            </div>
            <div class="ui grid">
              <div class="Timeline_icon three wide computer sixteen wide mobile column">
                <span>
                  <img src={`${s3}Icons/icon-delivery.svg`} alt="This could be you, but you playin." />
                </span>
              </div>
              <div class="thirteen wide computer sixteen wide mobile column">
                <h2>Pre-Order Your Cannabis</h2>
                <p>Browse dank buds, edibles, concentrates, and more from hundreds of local verified dispensaries and delivery services.</p>
              </div>
            </div>

          </section>

          <section class="ui info message grid">
            <section class="ten wide column">
              <p><strong>Still have question? We’ve got answers.</strong>
                <br />
                Browse our support section to find answers to many common questions.</p>
            </section>

            <section class="six wide column">
              <a href="/" class="ui button blue fluid">Check our support section</a>
            </section>
          </section>


        </article>
      </section>
    </Main>
  )
}
