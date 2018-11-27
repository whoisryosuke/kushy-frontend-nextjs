import React from 'react'
import Developers from "layouts/Developers/Developers";
import config from 'config/config';

export default () => {
  const s3 = config.assets.root + config.assets.site;
  return (
    <Developers>
      <h2 class="ui header">Getting started with Kushy</h2>
      <article class="ui segment aligned center">
          <p>Maybe you're a dispensary and you want to get patients checked in faster. Or who knows, you might be an event coordinator looking to host an event for medical cannabis patients and you want an easy way to integrate patient verification. There's a lot you can do with the <a href="http://kushy.net/developers/">Kushy API</a>.</p>

          <h3 class="ui header">What is the Kushy API</h3>

          <p>The <a href="http://kushy.net/developers/">Kushy API</a> is the API for <a href="http://kushy.net">Kushy</a>, an online cannabis directory and marketplace. Kushy has over 10,000 cannabis strains, 20k cannabis businesses, and more. Users on Kushy are also able to upload their documentation to verify their legal medical status in their state of residence. This allows for patients to preorder cannabis through the website, or verify their medical status by integrating 3rd party apps. </p>

          <p>The Kushy API is split into two sections. The public API is for public information like cannabis data (strains, businesses) and basic user data.  The private API is where developers can request more secure data such as a user's reviews or patient verification status.</p>

          <p>Developers can create a key that allows them to create applications that request more private user data, such as a patient's MMJ verification status, or their email. Users will only allow for this by logging into Kushy after being redirected from the application.</p>

          <h3 class="ui header">How does it work?</h3>

          <ol class="ui list">
              <li><a href="https://kushy.net/developers/apps">Sign up for a Kushy API key</a></li>
              <li>Create a small app that redirects user to Kushy login</li>
              <li>User approves your app.</li>
              <li>You can now access that specific user's data on Kushy.</li>
          </ol>

          <p>It's that simple. Now, let's show you how.</p>

          <h3 class="ui header">Signing up for an API key</h3>

          <ol class="ui list">
              <li><a href="https://kushy.net/register">Sign up an account on Kushy.</a></li>
              <li>Head over to the Kushy API Developer section and go to <a href="https://kushy.net/developers/apps">the Applications page.</a></li>
              <li>Click the "Create a new client" button. A popup modal will appear.</li>
              <li>Type a name for your application in the first name field.</li>
              <li>Enter the callback URL for your application. If you don't know what to do here, for this guide type "http://localhost:8000/callback".</li>
              <li>Then make sure to check off the scopes you'd like to use.</li>
              <li>Click Create client</li>
          </ol>

          <p>Your client ID and key should appear. Save both, you'll need them later.</p>

          <p>If you selected a more secure scope, like patient verification, your key will be shown as pending. Once approved, you'll be emailed a notification and you'll see the key on appear on the Applications page.</p>

          <h3 class="ui header">Create your app</h3>

          <p>You can use most, if not any, web language to accomplish this -- from React to Ruby. We'll be using PHP in the form of the <a href="http://laravel.com">Laravel framework</a> for sake of simplicity. Install a fresh version of Laravel, install <a href="https://github.com/guzzle/guzzle">Guzzle</a> through <a href="https://getcomposer.org/download/">composer</a>, and let's get started.</p>

          routes/web.php

          <pre><code class="php">
          {`Route::get('/', function () {
              $query = http_build_query([
                  'client_id' => '6',
                  'redirect_uri' => 'http://127.0.0.1:8001/callback',
                  'response_type' => 'code',
                  'scope' => 'access-email'
              ]);

              return redirect('https://kushy.net/oauth/authorize?'.$query);
          });

          Route::get('/callback', function (Request $request) {
              $response = (new GuzzleHttp\Client)->post('https://kushy.net/oauth/token', [
                  'form_params' => [
                      'grant_type' => 'authorization_code',
                      'client_id' => '6',
                      'client_secret' => 'q1w51ti3M0Mc79nTDkvQvpv2A8uvKDqpSJRMWlzK',
                      'redirect_uri' => 'http://127.0.0.1:8001/callback',
                      'code' => $request->code,
                  ]
              ]);

              session()->put('token', json_decode((string) $response->getBody(), true));

              return redirect('/user');
          });

          Route::get('/user', function () {
              if ( ! session()->has('token')) {
                  return redirect('/');
              }

              $response = (new GuzzleHttp\Client)->get('https://kushy.net/api/apps/v3/user', [
                  'headers' => [
                      'Authorization' => 'Bearer '.Session::get('token.access_token')
                  ]
              ]);

              return json_decode((string) $response->getBody(), true);
          });`}
          </code></pre>

          <p>This script basically defines 3 routes.</p>

          <ul class="ui list">
              <li>The <strong>first route</strong> is the root (<code>/</code>), which redirects the user to the Kushy OAuth authorization page. Or if the user is not logged in -- it sends them to the login form, then to the authorization page once they've successfully logged in. We use <code>http_build_query</code> to build a query string with the appropriate keys and values we need to send to the OAuth page. Ideally, you could simply type something like <code>https://kushy.net/oauth/authorize?client_id=YOUR_ID&redirect_uri=http://yourwebsite.com/callback....</code> into your browser (or directly link to it) and it'd accomplish the same thing.</li>

              <li>The <strong>second route</strong> is the callback (<code>/callback</code>), which is where the Kushy OAuth server sends the verification token once the user approves the app. Here we send a POST request to <code>https://kushy.net/oauth/token</code>, which generates a JWT authentication token that allows the app to access the user. This token will be used each time we need to make an authenticated request to any private Kushy API endpoint. So we save it using `session()` here to use it across the user's 'session' in the app. Then we redirect the user to the next route.</li>

              <li>The <strong>third route</strong> is the page where we request and show user information. We send a request to the Kushy API user endpoint and place the access token we just got in the headers. If it's successful, the server will respond with a JSON request containing the data.</li>
          </ul>

          <p><em>Please note to use the exact same callback URL, client ID, and secret from earlier. You will run into complications if do things like add a slash (/) to the end of the callback URL, when you entered a non-slash version into the Kushy API Application request form.</em></p>

          <h3 class="ui header">Simple as that, patient verification</h3>

          <p>It's really never been easier to integrate patient verification into your application. If you're familiar with the OAuth 2.0 specification, or if you've ever done something like add social login from Twitter or Google, this will probably be a walk in the park for you.</p>
      </article>
    </Developers>
  )
}
