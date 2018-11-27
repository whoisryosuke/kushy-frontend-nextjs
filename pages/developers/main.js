import React from 'react'
import Developers from "layouts/Developers/Developers";
import config from 'config/config';

export default () => {
  const s3 = config.assets.root + config.assets.site;
  return (
    <Developers>
          <article class="ui segment aligned center">
        <h2 class="ui header aligned center">Build danker apps with Kushy</h2>
        <section class="ui grid">
            <aside class="eight wide column">
                <img src={`${s3}Developers/StrainsAccess.png`} class="ui image" alt="Blue Dream and Afghan Kush buttons on Kushy" />
            </aside>                
            <aside class="eight wide column">
                <h3>Access over 10,000 strains</h3>
                <p>From THC to CBN and every terpene in between, find any strain you need and all the associated data.</p>
            </aside>
        
            <aside class="eight wide column">
                <h3>Find cannabis shops</h3>
                <p>Browse by location, access live product menus, and discover deals from dispensaries and headshops.</p>
            </aside>
            <aside class="eight wide column">
                <img src={`${s3}Developers/ShopsMarkerFind.png`} class="ui image" alt="Shop map markers on Kushy" />
            </aside>     
            <aside class="eight wide column">
                <img src={`${s3}Developers/VerifyPatients.png`} class="ui image" alt="Patient verification progress bar on Kushy" />
            </aside>                
            <aside class="eight wide column">
                <h3>Verify Patients</h3>
                <p>Check in patients at your dispensary or validate users on your web platforms to ensure compliance with the local state medical marijuana laws.</p>
            </aside>
        </section>
    </article>


    <article class="ui container">
        <a href="https://github.com/kushyapp/cannabis-dataset/" class="ui button fluid">
            Download Dataset
        </a>
        <section class="ui three column grid pt1">
            <aside class="column">
                <a href="#" class="ui button fluid btn--tall">
                    Roadmap
                </a>
            </aside>
            <aside class="column">
                <a href="https://github.com/kushyapp/cannabis-dataset/blob/master/CHANGELOG.md" class="ui button fluid btn--tall">
                    Changelog
                </a>
            </aside>
            <aside class="column">
                <a href="https://github.com/kushyapp/cannabis-dataset/" class="ui button fluid btn--tall">
                    Source Code
                </a>
            </aside>
        </section>
    </article>
    </Developers>
  )
}
