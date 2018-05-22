# PWA Talk Outline

* Introduction
  * What are PWA's
    * Like HTML5, it's no one thing
    * Really, it's just an app that utilizes certain tech
  * Introduce self
    * Why is this important to me
* History
  * PhoneGap
    * It used to be that if we wanted to build a web app for mobile devices,
      we had to use something like PhoneGap to access certain hardware features,
      * Even the webcam was off limits!
    * PhoneGap is a library written in the native environment that would open up
      a websocket to your static HTML webpage rendered inside of a native webview.
    * The websocket would be used for RPC between the "native app" and the web app.
    * So, data from the webcam would be sent over the websocket. Pretty cool!
    * Nowawdays, we can request user media and stream to canvas
  * Cache manifest
    * This was how you could increase performance and ensure some resources were
      always fetched from disk
    * This was horrible
    * List all of the gotchas
    * https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
* The easy stuff
  * Use HTTPs
  * Indicate to the browser that you're webapp capable
  * Add application icons
  * Create an app manifest to prompt an install banner
  * Use the History API
  * Specify heights for images and other media
  * Use responsive HTML/CSS
  * Don't be a jerk about push notifications
* Less easy stuff
  * Use the Cache API to ensure your app assets are cached
  * Register a service worker to serve cached assets
  * Let the user know when they're operating offline
  * Your app should still work offline
  * Use the credentials API for authentication
  * Use the payment API for payments
* Introduce Budgetizer
  * Budgetizer is a PWA for _manually_ tracking your spending
  * You can setup bugets
* How does Budgetizer work offline?
  * Each user's budget has a dynamic URL, so we can't just statically cache all assets
  * For our purposes, we want to be able to add a single budget to the home screen
  * On the budget page,
    * We attempt to cache the current URL
    * We also register the service worker
    * If network request matches a GET /budget request, send back the cached response
  * We need to track whether or not we're offline or online
* Service Workers
  * Take a moment to talk about how powerful a concept Service Workers are
  * The same code used for your client-side service worker can be used on Cloudflare
* Light House
  * Awesome new tool inside of Chrome Devtools
  * It can also be installed as a cli from npm
  * This means you can integrate into your CI so that you never regress on PWA-ness
* Conclusion
  * PWA's enable a web app to be added to the user's home screen without old tech like Phone Gap
  * service workers enable them to be fast, reliable, and work offline
  * Build a PWA today!
    * Or don't actually!!
    * Remember, a PWA is somethign worthy of being on a user's homescreen
