---
title: Introduction
permalink: /introduction/
layout: default
---

# Introduction

You no longer have to worry about the burdens of PCI compliance because card data never touches your server. The exchange of sensitive information occurs directly between the consumer and Heartland Payment Systems through our Portico Gateway. Our convention-based jQuery plugin streamlines this process so you don't have to worry about obtaining tokens. The plugin handles that request and appends the resulting token to your form before it posts.

The Secure Submit API Library is available in many different languages: PHP, .Net, Java, Ruby, and Python. This documentation is intended to speed up the process of implementing the SDK into your solution by providing sample code and instructions

> Current Language

{% highlight csharp %}
 // c#
System.Console.WriteLine("hello.");
{% endhighlight %}

{% highlight php %}
<?php
// php
echo 'hello.';
?>
{% endhighlight %}

{% highlight java %}
// java
System.out.println("hello.");
{% endhighlight %}

{% highlight ruby %}
# ruby
puts "hello."
{% endhighlight %}

{% highlight python %}
# python
print "hello."
{% endhighlight %}

{% highlight js %}
// nodeJS
console.log("hello.");
{% endhighlight %}

## Developer Support
You are not alone! If you have any questions while you are working through your development process, please feel free to <a href="mailto:entapp_devportal@e-hps.com">reach out to our team for assistance</a>.

## Single-Use Tokenization

The most secure way to get up and running with Secure Submit is to use our iFrame-hybrid tokenization solution.

> Basic HTML Payment Form

{% highlight html %}
<form id="payment_form" method="post" action="/process">
  <!-- Your payment fields go here -->
  <dt><label for="iframesCardNumber">Card Number:</label></dt>
  <dd><div id="iframesCardNumber"></div></dd>

  <dt><label for="iframesCardExpiration">Card Expiration:</label></dt>
  <dd><div id="iframesCardExpiration"></div></dd>

  <dt><label for="iframesCardCvv">Card CVV:</label></dt>
  <dd><div id="iframesCardCvv"></div></dd>

  <br />
  <div id="iframesSubmit"></div>

  <!-- Regular input fields are ok, too -->
  <input type="hidden" name="payment_token" />
</form>
{% endhighlight %}

### Where are the payment fields?

You may have noticed there are no actual `input` fields in the HTML above. Congratulations! You've discovered how we can [reduce your PCI-DSS scope](/resource/download/coalfire-white-paper/) by moving a large portion of the payment acceptance process away from your site.

To achieve this, our Javascript library inserts tiny iFrames pointed to solitary `input` fields on our payment gateway into those empty `div` elements above. Even though the fields themselves are displayed through iFrames and are hosted on our payment gateway, they integrate seemlessly into your existing payment form on your web site, keeping your customers where they should be&hellip;_on your web site_. This can help reduce your PCI scope down to the SAQ-A form (aka the short form) since the customer is inputting their card data onto our servers and all your site has access to is a single-use payment token.

Secure Submit is packaged as a Javascript library. All you need to do is include the Secure Submit library, and add a few lines of initialization code. It's that simple!

> Necessary Javascript for Tokenization

{% highlight html %}
<script src="https://api.heartlandportico.com/SecureSubmit.v1/token/2.1/securesubmit.js"></script>
<script type="text/javascript">
(function (window, document, Heartland) {
  var hps = new Heartland.HPS({
    publicKey: 'pkapi_cert_YS5lWAwgoWVLmyVToq',
    type:      'iframe',
    fields: {
      cardNumber: {
        target:      'iframesCardNumber',
        placeholder: '•••• •••• •••• ••••'
      },
      cardExpiration: {
        target:      'iframesCardExpiration',
        placeholder: 'MM / YYYY'
      },
      cardCvv: {
        target:      'iframesCardCvv',
        placeholder: 'CVV'
      },
      submit: {
        target:      'iframesSubmit'
      }
    },
    onTokenSuccess: function (resp) {
      var form = document.getElementById('payment_form');
      var payment_token = document.getElementById('payment_token');
      payment_token.value = resp.token_value;
      payment_form.submit();
    },
    onTokenError: function (resp) {
      if (window.console && window.console.log) {
        console.log('There was an error: ' + resp.error.message);
      }
    }
  });

  Heartland.Events.addHandler(document.getElementById('iframes'), 'submit', function (e) {
    e.preventDefault();
    hps.Messages.post(
      {
        accumulateData: true,
        action:         'tokenize',
        message:        'pkapi_cert_YS5lWAwgoWVLmyVToq'
      },
      'cardNumber'
    );
  });
}(window, document, Heartland);
</script>
{% endhighlight %}

<aside class="notice">
You'll need to replace the public_key with the key you received from us during the boarding process. It is used to identify you as well as the target environment (for example, Certification, Production, etc.).
</aside>

<aside class="success">
That's all you need! When the consumer submits the form, the `payment_token` field is updated to contain a single-use payment token. This token can be used to make a payment and request a multi-use token. Be sure to let your Heartland representative know if you are interested in implementing a recurring payment system with our multi-use tokens. There are additional options that must be configured during the boarding process.
</aside>

## Validation

Worried about bad data being entered? Our iFrame-based fields have a set of functions to help your customers during their checkout process. All fields only allow customers to input numbers, preventing the accidental letter and/or symbol from creating a problem, and each one also adds a CSS class of `.valid` or `.invalid` to make styling good or bad data easier, pin-pointing problems for your customers as early as possible.

While on the subject of visual cues, the card number field will also add a CSS class of the form `.card-type-{card brand}`, allowing the card brand logos to be displayed for the customer and adding one more visual validation that the card information is correct.

## See It in Action

Head over to the [Tokenization Demo](/documentation/tokenization-demo/) to learn more about our Javascript tokenization solution and to see it in action!
