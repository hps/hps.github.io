# Error Handling
> Error Handler

{% highlight ruby %}
begin

    charge_service.charge(1.00,"usd", credit_card, card_holder)

rescue Hps::InvalidRequestException => e
    # handle error for amount less than zero dollars
rescue Hps::AuthenticationException => e
     # handle errors related to your Hps configuration
rescue Hps::CardException => e
    # handle card-related exceptions: card declined, processing error, etc
end
{% endhighlight %}

{% highlight python %}
try:
    credit_service.charge(-5, 'usd', credit_card, card_holder)
except InvalidRequestException, e:
    # handle error for amount less than zero dollars
except AuthenticationException, e:
    # handle errors related to your HpsServiceConfig
except CardException, e:
    # handle card-related exceptions: card declined, processing error, etc
{% endhighlight %}

{% highlight csharp %}
try
{
	creditService.Charge(-5.00m, "usd", creditCard, cardHolder);
}
catch (HpsInvalidRequestException e)
{
	// handle error for amount less than zero dollars
}
catch (HpsAuthenticationException e)
{
	// handle errors related to your HpsServiceConfig
}
catch (HpsCreditException e)
{
	// handle card-related exceptions: card declined, processing error, etc
}
catch (HpsGatewayException e)
{
	// handle gateway-related exceptions: invalid cc number, gateway-timeout, etc
}
{% endhighlight %}

{% highlight php %}
<?php
try
{
	$chargeService->charge(-5, "usd", $cardOrToken, $cardHolder);
}
catch (InvalidRequestException $e)
{
	// handle error for amount less than zero dollars
}
catch (AuthenticationException $e)
{
	// handle errors related to your HpsServiceConfig
}
catch (CardException $e)
{
	// handle card-related exceptions: card declined, processing error, etc
}
{% endhighlight %}

{% highlight java %}
try
{
	chargeService.charge(new BigDecimal("-5"), "usd", creditCard, cardHolder);
}
catch (InvalidRequestException e)
{
	// handle error for amount less than zero dollars
}
catch (AuthenticationException e)
{
	// handle errors related to your HpsServiceConfig
}
catch (CardException e)
{
	// handle card-related exceptions: card declined, processing error, etc
}
{% endhighlight %}

Each Heartland SDK handles the following error types:

Error Type | Meaning
---------- | -------
HpsInvalidRequestException | handle error for amount less than zero dollars
HpsAuthenticationException | handle errors related to your HpsServiceConfig (likely an invalid secret api key)
HpsCreditException | handle card-related exceptions: card declined, processing error, etc
HpsGatewayException | handle gateway-related exceptions: invalid cc number, gateway-timeout, etc
