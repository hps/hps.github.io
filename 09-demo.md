---
title: Tokenization Demo
permalink: /tokenization-demo/
layout: default
---

<!-- prevent .lang-selector flash -->
<style type="text/css">.lang-selector,.dark-box{display:none;}</style>

# Tokenization Demo

Take a look at the following examples:

<div class="row">

	<div class="col-sm-6">

		<p><strong>Example A</strong></p>

		{% include samples/standard.html %}

	</div>

	<div class="col-sm-6">

		<p><strong>Example B</strong></p>

		{% include samples/iframes.html %}

	</div>

</div>

<a id="standard-code-sample"></a>

> Standard Tokenization

{% highlight html %}
{% include samples/standard.html %}
{% endhighlight %}

<a id="iframes-code-sample"></a>

> iFrames Tokenization

{% highlight html %}
{% include samples/iframes.html %}
{% endhighlight %}

To a customer, both examples are the same, but according to PCI-DSS, only `Example B` will help keep you PCI compliant with as little scope as possible. The fields in `Example A` are your typical `input` elements that are hosted on your payment page. The fields in `Example B` are also your typical `input` elements, but they are wrapped inside of `iframe` elements that are hosted on Heartland's payment gateway.

While there are some limitations to using `iframe` elements, our Javascript library has tried to remove most pain points for integrators wishing to embed these fields seamlessly into their existing solutions.

Feel free to click the `Show Code` buttons in the samples, if you haven't already, to view the necessary HTML and Javascript for each solution.

<script type="text/javascript">
  (function (document, Heartland) {
    function displaySample(sample, display) {
      var anchor = document.getElementById(sample + '-code-sample');
      var blockquote = anchor.parentNode.nextElementSibling;
      var pre = blockquote.nextElementSibling;
      blockquote.style.display = display;
      pre.style.display = display;
    }
    function copySample(sample) {
      return function (e) {
        displaySample('standard', 'none');
        displaySample('iframes', 'none');
        displaySample(sample, 'block');
      };
    }
    displaySample('standard', 'none');
    displaySample('iframes', 'none');
    Heartland.Events.addHandler(document.getElementById('standardShowCode'), 'click', copySample('standard'));
    Heartland.Events.addHandler(document.getElementById('iframesShowCode'), 'click', copySample('iframes'));
    setTimeout(function () {
      $('.lang-selector, .dark-box').remove();
    }, 500);
  }(document, Heartland));
</script>
