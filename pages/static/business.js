import React from "react";
import Main from "layouts/Main/Main";
import config from "config/config";

export default () => {
  const s3 = config.assets.root + config.assets.site;
  return (
    <Main>
      <section class="BusinessTour ContentArea">

        <header class="ui container hero center aligned basic segment">
          <div class="hero__half hero__content">
            <h1 class="ui header">Keeping cannabis businesses connected and compliant</h1>
            <p class="secondary">Kushy simplifies your team's workflows and connects you with customers, leaving you less stressed and more productive.</p>
          </div>
        </header>

        <figure class="hero--image-center red">
          <div class="ui container">
            <img src={`${s3}BusinessTour/Shop Menu - Example w Hover.png`} alt="" />
          </div>
        </figure>


        <section class="ui cta light grey basic segment">
          <div class="cta__padding ui two column stackable grid">
            <aside class="column">
              <h3>Keep your inventory in one place</h3>
              <p>Manage your profile's menu through our online, mobile-friendly dashboard, or assign staff separate accounts to manage for you. And with our integration with METRC, it's even easier to stay compliant and organized.</p>
              <p><a href="#">Learn more about inventory management</a></p>
            </aside>
            <aside class="column">
              <img src={`${s3}BusinessTour/Shop Card and Cart Modal@1x.png`} alt="Manage your listing on the go with our mobile optimized interface" width="100%" />
            </aside>
          </div>
        </section>

        <section class="ui cta basic segment mtn3">
          <div class="cta__padding ui two column stackable grid">
            <aside class="column">
              <img src={`${s3}BusinessTour/Patient Verification 1@2x.png`} alt="Manage your listing on the go with our mobile optimized interface" style={{width:'auto', maxWidth:'100%', maxHeight:'500px', textAlign:'center', marginTop:'-10rem'}} />
            </aside>
            <aside class="column">
              <h3>Verified patients made easy</h3>
              <p>Are you a licensed medical marijuana business? Gain access to patient data to simplify the intake and registration process.</p>
              <p><a href="#">Learn more about patient verification</a></p>
            </aside>
          </div>
        </section>


        <section class="ui cta light grey basic segment">
          <div class="cta__padding ui two column stackable grid">
            <aside class="column">
              <h3>Cannabis at the click of a button</h3>
              <p>Let the orders roll in with our online pre-ordering process, and simplify the purchasing process for your customers.</p>
              <p><a href="#">Learn more about online preordering</a></p>
            </aside>
            <aside class="column">
              <img src={`${s3}AboutUs/shop-menu-add-to-cart-modal.png`} alt="Manage your listing on the go with our mobile optimized interface" width="100%" />
            </aside>
          </div>
        </section>

        <section class="ui cta basic segment">
          <div class="cta__padding ui two column stackable grid">
            <aside class="column">
              <img src={`${s3}Developers/ShopsMarkerFind.png`} alt="Manage your listing on the go with our mobile optimized interface" width="100%" />
            </aside>
            <aside class="column">
              <h3>Customers on easy mode</h3>
              <p>A business profile on Kushy is your global calling card for customers and their filled shopping carts to come directly to your shop's door.</p>
              <p><a href="/add-your-listing">Create your free profile today!</a></p>
            </aside>
          </div>
        </section>

        <section class="ui container basic segment">
          <h2 class="ui header">Frequently Asked Questions</h2>
          <section class="ui two column grid">
            <section class="faq ui accordion column">
              <h3 class="active title">
                How does patient pre-verification work?
                <i class="dropdown icon"></i>
              </h3>
              <div class="active content">
                Users upload their personal identification and medical marijuana reccomendation and the Kushy staff verifies valid patients. By requesting access to our private patient API, you can have customers sign in to Kushy through your site or storefront, and verify the status of their medical marijuana recommendation.
              </div>

              <h3 class="title">
                How do I claim an existing listing?
                <i class="dropdown icon"></i>
              </h3>
              <div class="content">
                Users upload their personal identification and medical marijuana reccomendation and the Kushy staff verifies valid patients. By requesting access to our private patient API, you can have customers sign in to Kushy through your site or storefront, and verify the status of their medical marijuana recommendation.
              </div>
          </section>

          <section class="faq ui accordion column">
            <h3 class="active title">
              How does patient pre-verification work?
                            <i class="dropdown icon"></i>
            </h3>
            <div class="active content">
              Users upload their personal identification and medical marijuana reccomendation and the Kushy staff verifies valid patients. By requesting access to our private patient API, you can have customers sign in to Kushy through your site or storefront, and verify the status of their medical marijuana recommendation.
                        </div>

            <h3 class="title">
              How do I claim an existing listing?
                            <i class="dropdown icon"></i>
            </h3>
            <div class="content">
              Users upload their personal identification and medical marijuana reccomendation and the Kushy staff verifies valid patients. By requesting access to our private patient API, you can have customers sign in to Kushy through your site or storefront, and verify the status of their medical marijuana recommendation.
            </div>
        </section>
      </section>
      <a href="http://support.kushy.net/" class="ui basic red button" style={{marginTop:'1rem'}}>Get more support</a>
        </section>


    </section>
    </Main>
  );
};
