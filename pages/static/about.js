import React from 'react'
import Main from "layouts/Main/Main";
import config from 'config/config';

export default () => {
  const s3 = config.assets.root + config.assets.site;
  return (
    <Main>
        <article class="AboutUs">

            <header class="ui container hero center aligned basic segment">
                <div class="hero__half hero__content">
                    <h1 class="ui header">We connect people with cannabis</h1>
                    <p class="secondary">Kushy is a platform that connects cannabis consumers with verified products, brands, and retailers. Launched in 2018, Kushy is devoted to connecting people with the apps, services, and resources they need to simplify their cannabis experience.</p>
                </div>
            </header>

            <figure class="ui hero--image">
                <img src={`${s3}BusinessTour/timeline.png`} alt="" />
            </figure>

            <section class="Stats pt3 pb3 ui four column stackable grid center aligned">
                <aside class="column">
                    <h3>2,000</h3>
                    <p>Shops</p>
                </aside>
                <aside class="column">
                    <h3>1,000</h3>
                    <p>Brands</p>
                </aside>
                <aside class="column">
                    <h3>20,000</h3>
                    <p>Products</p>
                </aside>
                <aside class="column">
                    <h3>3,000</h3>
                    <p>Strains</p>
                </aside>
            </section>

            <section class="ui cta light grey basic segment">
                <div class="cta__padding ui two column stackable grid">
                    <aside class="column">
                        <img src={`${s3}AboutUs/shop-menu-add-to-cart-modal.png`} alt="Manage your listing on the go with our mobile optimized interface" width="100%" style={{marginTop:'-3rem' }} />
                    </aside>
                    <aside class="column">
                        <h3>Creating a marketplace for cannabis</h3>
                        <p>Skip the line at the store and pre-order your favorite cannabis products from Kushy online. With our expansive directory, you can discover new products, preorder and pickup your products, and share your review.</p>
                    </aside>
                </div>
            </section>

            <section class="ui cta basic segment">
                <div class="cta__padding ui two column stackable grid">
                    <aside class="column">
                        <h3>Building an ecosystem for accessible cannabis</h3>
                        <p>Connect your data with other tools and services to make your life <em>easier</em>. With our cannabis API, the <strong><span class="text red">Kushy</span> platform team</strong> works with partners and developers worldwide to build apps and integrations that streamline your experience, automate mundane tasks, and bring new features and functionality to improve your daily life.</p>
                    </aside>
                    <aside class="column">
                        <img src={`${s3}AboutUs/Kushy API Diagram - Integrations 1 No Gradient.png`} alt="Manage your listing on the go with our mobile optimized interface" width="100%" align="right" style={{paddingLeft:'1rem', marginTop:'-3rem' }} />
                    </aside>
                </div>
            </section>


        </article>
    </Main>
  )
}
