# Authentication

{% highlight csharp %}
var config = new HpsServicesConfig()  {  SecretApiKey = "secret api key"  };
var creditService = new HpsCreditService(config);
{% endhighlight %}

{% highlight php %}
<?php
$config = new HpsServicesConfig();
$config->secretApiKey =  "secret api key";
$chargeService = new HpsCreditService($config);
{% endhighlight %}

{% highlight java %}
HpsServicesConfig config = new HpsServicesConfig();
config.setSecretAPIKey("secret api key");
HpsChargeService chargeService = new HpsChargeService(config);
{% endhighlight %}

{% highlight ruby %}
Hps.configure do |config|
    config.secret_api_key = "secret api key"
end  

charge_service = Hps::HpsChargeService.new
{% endhighlight %}

{% highlight python %}
config = HpsServicesConfig()
config.secret_api_key = 'secret api key'

credit_service = HpsCreditService(config)
{% endhighlight %}

Authentication with Heartland is simple: you will pass your Secret API Key (found on your Account Settings screen) to the SDK via your configuration.
