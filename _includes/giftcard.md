# Gift Card Payments
Merchant gift card programs lead customers to spend—on average—60 percent more than the value of their gift cards. In addition, 72 percent of shoppers also shop for themselves when they go online or in-store to purchase a gift card.

Heartland helps you acquire more loyal customers with our innovative gift card program. You can personalize your own gift cards, offer reloading capabilities and use a card-not-present program that allows your customers to use their phone number as their identifier.

## Create a Gift Card Object
> Creating a Gift Card

{% highlight php %}
<?php
$card = new HpsGiftCard();
$card->number = "5022440000000000098";
{% endhighlight %}

You might want to check the balance of a Gift Card before you try to create a sale.

## Get a Gift Card Balance
> Get Gift Card Balance

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->balance($card);
{% endhighlight %}

When consuming gift cards, you will need to first create a HpsGiftCard object to pass to the subsequent methods.

## Charge a Gift Card (Sale)
> Charge Gift Card

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->sale($card, 10.00);
{% endhighlight %}

Creating a sale on a Gift Card is simple.

## Add Value to a Gift Card
You can add a value to an existing Gift Card

> Add to Gift Card

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->addValue(10.00, 'usd', $card);
{% endhighlight %}

Creating a sale on a Gift Card is simple.

## Reward a Gift Card
> Reward Gift Card

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->reward($card, 10.00);
{% endhighlight %}

To create a reward against a gift card you just need to pass in the card and the dollar amount to be rewarded.

## Activate a Gift Card
> Activate Gift Card

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->activate(100.00, 'usd', $card);
{% endhighlight %}

Activating a gift card is as simple as providing the dollar amount, currency code and gift card object

## Deactivate a Gift Card
> Deactivate Gift Card

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->deactivate($card);
{% endhighlight %}

Activating a gift card is as simple as providing the dollar amount, currency code and gift card object

## Replace a Gift Card
> Replace Gift Card

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->replace($card, $card2);
{% endhighlight %}

Sometimes there is a need to replace a gift card with a new gift card.

## Void a Gift Card Transaction
> Void Gift Card Transaction

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->void($transactionId);
{% endhighlight %}

To void a gift card transaction, you will need only a gift transaction id.

## Reverse a Gift Card By Transaction
> Reverse Gift Card By Transaction

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->reverse($transactionId, 10.00);
{% endhighlight %}

You can reverse (or partially reverse) a gift card transaction with the transaction id.

## Reverse a Gift Card
> Reverse Gift Card

{% highlight php %}
<?php
$giftService = new HpsGiftCardService($config);
$response = $giftService->reverse($card, 10.00);
{% endhighlight %}

You can reverse (or partially reverse) a gift card transaction with the transaction id.
