# PWA's

## Intro: What are PWA's

Progressive Web Apps, or PWA's as they're known for short -- which oddly isn't any shorter -- Are a set of ideas for building native app-like experiences with web technology. It also represents the worst acronym that web developers have created to date; "Pwah" (For the record, no one actually calls them that).

So what are _they_ exactly? What makes them "progressive"? How can we differentiate from any ol' "Web App"?

    In the below text, we should scroll a huge list of things from the PWA checklist

There is a huge laundry list of items that go into making a Progressive Web App . Things like loading from service workers cache, using HTTPS, being responsive, or using schema.org metadata. But the one that really stands out to me?

We should call a web app "progressive" if a user would want to add the app to their homescreen. Now, I know this definition is not very rigorous and you wouldn't be using it as a means to measure your own web application, but it does cut to the heart of the matter. The truth is, the vast majority of web applications do not feel _solid or compelling_ enough for me to want it on my device. They often don't bridge the uncanny valley, leading them to be forgotten in the depths of a forgettable a URL

## Intro: Self

Why does this matter? Unless you're incredibly obsessive about little things like, oh, I don't know; Time to First Meaningful Paint? It really doesn't matter. Because we always have 5 bars LTE, right? Right.

I haven't introduced myself. My name is John Fawcett. I'm an engineer at Cloudflare working on Cloudflare Workers. One might say I'm a Cloudflare worker working on Cloudflare Workers, but that would be quite absurd.

I like to work out of coffeeshops, bars, and on the road; Places where the web _particularly sucks_. I say it sucks, but really, I'm receiving the internet of 5-6 years ago. How is it -- that with only a 5-year old internet connection -- It feels like the web can be completely broken? It always strikes me how negligent we can be as application developers. We often only plan for perfect network conditions.

That's what this talk is about; Software has gone from a practice that had to be memory-and-space-conscious, to the space-irreverant jquery/react/angular monstrosities of today. We blindly npm install moment-timezones, don't pre-compile our handlebars templates, forget about NODE_ENV=production when building our react codebases. Perhaps developer experience is getting better, but it seems to be increasingly difficult to make the end-user experience more optimized.

## History

Before Progressive Web Apps, we had the Single Page App, or SPA (the previous champion of horrible web acronyms). And despite a few commentors on HackerNews bemoaning the loss of gloriously simplistic server-rendered HTML cobbled together with forms and jquery, the rise of the Single Page App was a really great leap forward for the web. It's when we started using all of our HTTP verbs. It's when we started caring about mobile. It's when we really started thinking about the web as a platform for applications rather than just a collection of documents.

Web developers eventually acquired the building blocks to make real applications with web technology. Tools like Backbone, Knockout, and Angular came out and established architectures for building Single Page Apps.

A whole rennaissance of web technology came out around this time. Hey, remember CoffeeScript? That was fun! Glad we got that out of our system. By the way, the word "CoffeeScript" is _developer trigger-word #1_ of this talk. Stay-tuned for more.

Now we have all these web devs ready to build the next app, but how do they deliver it to the user? Further, how do we create an app-like experience that can compete with the native applications on mobile devices? At this point, browser support for even simple things like webcam access is limited to a small set of devices.

### Phone Gap

Enter Phone Gap (or Cordova as its known now). Phone Gap was a library for native mobile app development that acted as a bridge between a web application running on a user's phone and the api's that are allotted to a native app developer. Basically, your web application would run inside a fullscreen Web View (a fancy iframe) for whatever platform it was running on; So things like Android, iOS, and Windows Mobile. Native mobile features like access to the microphone and web cam would be requested via a custom RPC protocol implemented over websockets.

Think about that for a second. We're using websockets to send over camera information to the browser. That's seriously cool! But it'd be cooler if we could just have those api's on the web _without_ sending them over from some other application development system (we do now actually; navigator.getUserMedia()).

With Phone Gap, you'd build your app for iOS, Android, and Windows Mobile, and publish your app to their respective app stores. This is how real web apps got on the user's homescreen.

The plus side to this model was that your fancy iframe app could just point to a URL on your webserver, completely obviating the application update process. That's right! You could write a completely inoccuous web app for iOS, get it on the app store, then update it to have malicious code! Wowee.

But hey, if you're using a remote URL to load your application, what happens if you have a crappy internet connection? Or what happens if you have an internet connection standard for this time period? (The aforementioned 5-years ago connection). What happens is a blank. White. Screen. A blank white screen until all of your precious assets load. Maybe you minified your javascript. Maybe you even lobbed off dead CSS selectors, maybe you're even using a a CDN, but your users are still presented with this awful blank white screen.

This is because web apps needed to explicitly declare what gets cached to disk in a very special way.

### Cache Manifest

The Cache Manifest. Trigger word #2 of this talk. For those of you unfamiliar with the cache manifest, it's a well-meaning but deservedly deprecrated piece of web tech. Essentially, it's a file that lists resources that should be cached to disk _indefinitely_, or at least until the cache manifest changes. It includes sections like:

* CACHE: This is the default section, so if you forget to write it, no worries, cache manifest will assume any resource outside of any section goes into this section. _What could go wrong?_
* NETWORK: This section is for resources that will absolutely require a network connection. So why do we even need to specify? Okay
* FALLBACK: Now, I'm reading exactly from MDN here because I'm not entirely sure how this would get used, "specifies fallback pages the browser should use if a resource is inaccessible. Each entry in this section lists two URIs—the first is the resource, the second is the fallback. Both URIs must be relative and from the same origin as the manifest file. Wildcards may be used." Presumably if you have a network failure and nothing in cache, just use this. Though, this seems hard to anticipate in a static file.

Referencing the docs on MDN, you will see it's covered in warnings, such as:

> Do not specify the manifest itself in the cache manifest file, otherwise it will be nearly impossible to inform the browser a new manifest is available.

> Never access cached files by using traditional GET parameters

> Reloading the page in IE Mobile will clear the application cache, so the webpage will fail to load. However, closing the page and opening via bookmark again works fine.

In some ways, Progressive Web Apps are an answer to these difficulties. Really, they're the current answer to how to build modern web apps.

## PWAs

Progressive Web Apps are really just a set of technologies and ideas that enable a certain standard of UX, performance, and reliability. Remember HTML5? It was touted as this _one thing_ that you do to have the latest and greatest web page. "Just enable HTML5 on our site" says the PHPCEO. But really HTML5 was a bunch of different stuff. And so too are PWAs.

## PWA's: The Easy stuff

Here's the easy stuff you can do to make your website more progressive:

* Use HTTPs
  * This is really easy with Cloudflare btw. It's just a toggle.
* Indicate to the browser that you're webapp capable
  * This is just a <meta> tag in your head
* Add application icons
  * There's a lot of different sizes required, but ultimately, this is pretty trivial as well
* Tell the browser what color should be used for your URL bar
  * In modern mobile browsers, this can be used in the tab selection view
* Create an app manifest to prompt an install banner
  * The application manifest also tells browsers that you're able to be installed to the homescreen
  * It also contains some metadata necessary for being added, like
* Use the History API
  * This is really easy to with things like react router.
  * Or, you don't use a library. Just register a global 'click' listener on the document:
    * `document.addEventListener('click', e => /* stuff */)`
  * Then, e.preventDefault() and pushState the URL using the history api
* Specify heights for images and other media
  * You don't want your content _jumping_ around after your application loads
  * Images should have known aspect ratios. Same with canavs elements
  * Use the built in height attributes and JavaScript to determine the height of an image before it loads
* Use responsive HTML/CSS
  * Eric Meyer has been telling us to do this since well before PWA's were a thing.
  * Rems, Ems, and breakpoints. Use em'.

## PWA's: The Harder Stuff

### Your app should still work offline

This is where things get tricky. Caching correctly is a legimitately hard thing to do correctly, which is why the overly-simplistic and static Cache Manifest format failed.

There are three newish pieces of tech that enable you to do this effectively:

1. The Cache API
2. Service Workers
3. The offline/online events

When network connectivity is lost, an `offline` event is triggered on the window object. You should use this moment to let the user know that they're currently working offline. This is actually on the official Google checklist of things that make up a PWA, so you should probably do it.

Conversely, an `online` event is triggered when network connectivity has recovered.

I know what you're thinking! "Gee, I could store this offline/online state and queue network calls when offline, then dequeue when we come back online". Totally viable, and we'll need to do something like it to tie it all together. For some requests, however, we can serve the user directly from disk, without hitting the network at all.

#### Service Workers

Service Workers allow us to handle all network requests inside another process on the device called a Web Worker. Well, not technically a Web Worker. It's a special web worker called a service worker. Code is better than words, let's look at some:

```javascript
addEventListener('fetch', e => {
  // e.respondWith accepts a Promise which should resolve to a Response
  e.respondWith(
    (async () => {
      // Check to see if we have a cached version of the response matching
      // this request
      const cache = await Cache.open('my-cache')
      const response = cache.match(e.request)
      if (response) return response

      // If not, let's attempt the original request
      return fetch(e.request)
    })(),
  )
})
```

#### A real example: Budgetizer

How about a more concrete example? People like those, right?

This is Budgetizer. This web app is a way for me to _manually_ track my expenses using my phone. I setup a new budget, and add that budget to my homescreen for easy access later. When I go out for lunch, you'll see me judiciously tracking every dollar spent. This not only helps me save money, it also helped me understand the plight of the PWA developer.

You see, our toy cache example above works for static assets and that's about it. In reality, we have dynamic URLs that represent new objects in our system. Often times, that means our app _requires_ a server to generate ID's. We need to re-think this client-server relationship to really take advantage of Application Cache. For ID's, if we could generate them on the client using uuid's, then that could save us from explicitly needing to talk to the server.

Then, we could adopt a model where the user is _always working offline_ and we occasionally sync with the server when available.

And that's about it. Assuming an offline-first model allows us to write really succinct code here.

#### A note on the Application Shell model

I use a pattern here called the app shell model.

#### Other things a PWA can do:

* Send Notifications
  * Seriously, don't be a jerk about notifications
  * If a web app asks if you want to receive notifications immediately upon visiting said app (I'm looking at you Slack), this is a jerk website
  * You should request for notifications permissions after the user has performed some critical interaction
  * Consider a flight-booking app. Ask if the user wants to receive notifications after they've booked their flight.
  * This strongly indicates intent and is not spammy
  * Beware! Once a user declines notifications, you cannot ask them again
* Use the credentials API for authentication
* Use the payment API for payments

## Lighthouse

Lighthouse is an automated PWA auditing and testing tool by Google. It's opensource. It's shipped inside of Chrome devtools. And you can install it from NPM so that you can use it in CI to catch PWA-related regressions!

## Conclusion/Review

* Use the Cache API to ensure your app assets are cached
* Register a service worker to serve cached assets
* Let the user know when they're operating offline
* Your app should still work offline
