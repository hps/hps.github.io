# Introduction
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

You no longer have to worry about the burdens of PCI compliance because card data never touches your server. The exchange of sensitive information occurs directly between the consumer and Heartland Payment Systems through our Portico Gateway. Our convention-based jQuery plugin streamlines this process so you don't have to worry about obtaining tokens. The plugin handles that request and appends the resulting token to your form before it posts.

The SecureSubmit API Library is available in many different languages: PHP, .Net, Java, Ruby, and Python. This documentation is intended to speed up the process of implementing the SDK into your solution by providing sample code and instructions

## Developer Support
You are not alone! If you have any questions while you are working through your development process, please feel free to <a href="mailto:entapp_devportal@e-hps.com">reach out to our team for assistance</a>.

## Single-Use Tokenization
> Basic HTML Payment Form

{% highlight html %}
<form id="payment_form" method="post" action="Process">

    <!-- Your payment fields go here -->

    <label for="card_number">Card number:</label>
    <input type="text" id="card_number" value="" />

    <label for="card_cvc">Card cvc:</label>
    <input type="text" id="card_cvc" value="" />

    <label for="exp_month">Exp month:</label>
    <input type="text" id="exp_month" value="" />

    <label for="exp_year">Exp year:</label>
    <input type="text" id="exp_year" value="" />

    <input type="submit" value="Submit Payment" />
</form>
{% endhighlight %}

The quickest way to get up and running with SecureSubmit is to adhere to our naming conventions when marking up your payment form. Note that the name attributes are not included for any fields that contain card data. This prevents those fields from posting to your server, which is critical in order to avoid PCI requirements. The SecureSubmit plugin attempts to remove those attributes programmatically if they exists, but it is best not to include them.

SecureSubmit is packaged as a Javascript library. All you need to do is include the SecureSubmit library, and add a few lines of initialization code. It's that simple!


> For Automatic Javascript For Tokenization

{% highlight html %}
<script src="securesubmit.js"></script>
<script type="text/javascript">
$(function () {

    $("#payment_form").SecureSubmit({
        public_key: "pkapi_cert_YS5lWAwgoWVLmyVToq",
        error: function (response) {
            console.log(response);
        }
    });

});
</script>
{% endhighlight %}

> Manual Javascript For Tokenization

{% highlight html %}
<script src="securesubmit.js"></script>
<script type="text/javascript">
var tokenValue, tokenType, tokenExpire;

hps.tokenize({
    data: {
      public_key: {{PUBLICAPIKEY}},
      number: 4242424242424242,
      cvc: 123,
      exp_month: 12,
      exp_year: 2015
    },
    success: function (response) {
      /** Place additional validation/business logic here. */     

      tokenValue = response.token_value;
      tokenType = response.token_type;
      tokenExpire = response.token_expire;
    },
    error: function (response) {
      /** Handle Token Error */
    }
  });
</script>
{% endhighlight %}

<aside class="notice">
You'll need to replace the public_key with the key you received from us during the boarding process. It is used to identify you as well as the target environment (for example, Certification, Production, etc.).
</aside>

<aside class="success">
That's all you need! When the consumer submits the form, a token_value field is added that contains a single-use payment token. This token can be used to make a payment and request a multi-use token. Be sure to let your Heartland representative know if you are interested in implementing a recurring payment system with our multi-use tokens. There are additional options that must be configured during the boarding process.
</aside>

## Validation

If you're using the jQuery Validation plugin, everything will just work. We check to make sure the form is valid before requesting a token and halt all processing if there are errors. We also provide a success handler for those who wish to implement their own validation or require a little more fine-grained control. Our plugin evaluates the results of that success handler and halts processing of the form if it returns false. We also pass the results of the token request into the specified success handler for those who need access to the actual single-use payment token. This gives you the flexibility to implement your own solutions in the event that our defalut behavior doesn't meet your requirements.
