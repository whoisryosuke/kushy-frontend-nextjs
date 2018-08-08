import React from 'react'
import Main from "layouts/Main/Main";
import config from 'config/config';

export default () => {
  return (
    <Main>
      <section class="Advertise ContentArea">

        <header class="ui inverted vertical red masthead center aligned segment">
          <h1 class="ui header centered">Contact Us</h1>
        </header>

        <article class="ui segment container centered">

          <form action="/contact/" method="POST" class="ui form">

            <div class="three fields">
              <div class="field required">
                <label>Name</label>
                <input type="text" name="name" placeholder="Dave Weeden" required /> {/* @if ($errors->has('name'))
                <span class="help-block">
                  <strong>{{ $errors-> first('name') }}</strong>
                </span>
                @endif */}
              </div>
              <div class="field">
                <label>Business</label>
                <input type="text" placeholder="Cannabis Co." />
              </div>
              <div class="field required">
                <label>Email</label>
                <input type="email" placeholder="legit@email.com" name="email" required /> {/* @if ($errors->has('email'))
                <span class="help-block">
                  <strong>{{ $errors-> first('email') }}</strong>
                </span>
                @endif */}
              </div>
            </div>
            <section class="one field">
              <label for="message">
                Message
              </label>
              <textarea class="FormField__input" name="message"></textarea>
            </section>

            <button type="submit" name="submit" value="submit" class="ui submit button red fluid">
              Send message
            </button>
          </form>

        </article>
      </section>
    </Main>
  )
}
