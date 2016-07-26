---
title: PayPal Express Payments
permalink: /paypal-express-payments/
layout: default
---

# PayPal Express Payments

Heartland has partnered with PayPal to provide merchants the ability to process PayPal Express payments through the same Heartland Portico gateway as credit card payments. Merchant who choose to integrate PayPal Express payments through Heartland benefit from consolidated reporting, a single point of contact for both payment types, and more!

## Create a BuyerData Object

Buyer data helps PayPal control the checkout flow (with the return and cancel URLs) as well as potentially identify the consumer using a PayPal payer ID.

> Creating BuyerData

{% highlight php %}
<?php
$buyer = new HpsBuyerData();
$buyer->returnUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/charge.php';
$buyer->cancelUrl = $buyer->returnUrl;
{% endhighlight %}

{% highlight java %}
HpsBuyerData buyer = new HpsBuyerData();
buyer.setReturnUrl("http://localhost/securesubmit/paypal/charge.jsp");
buyer.setCancelUrl("http://localhost/securesubmit/paypal/index.html");
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Create a PaymentData Object

Payment data holds the many types of totals (subtotal, shipping total, etc.) and the payment type to be used in the transaction. The amounts provided in `HpsPaymentData` should add up to the amount argument in the various `HpsPayPalService` methods. If they do not, PayPal will reject the transaction.

> Creating PaymentData

{% highlight php %}
<?php
$payment = new HpsPaymentData();
$payment->subtotal = '226.57';
$payment->shippingAmount = '12.74';
$payment->taxAmount = '19.14';
$payment->paymentType = 'Authorization';
{% endhighlight %}

{% highlight java %}
HpsPaymentData payment = new HpsPaymentData();
payment.setSubTotal(new BigDecimal("226.57"));
payment.setShippingAmount(new BigDecimal("12.74"));
payment.setTaxAmount(new BigDecimal("19.14"));
payment.setPaymentType("Authorization");
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Create a ShippingInfo Object

Shipping information can be optional when creating a new session as this information can be provided by PayPal during checkout. If it is provided during session creation, the SDK will pass a flag to prevent PayPal from prompting the consumer for shipping address information in the PayPal interface. If it is not provided during session creation, the developer will want to request the session information after the consumer is redirected to the return URL.

> Creating ShippingInfo

{% highlight php %}
<?php
$shipping = new HpsShippingInfo();
$shipping->name = 'Joe Tester';
$shipping->address = new HpsAddress();
$shipping->address->address = '6860 Dallas Pkwy';
$shipping->address->city = 'Plano';
$shipping->address->state = 'TX';
$shipping->address->zip = '75024';
$shipping->address->country = 'US';
{% endhighlight %}

{% highlight java %}
HpsShippingInfo shipping = new HpsShippingInfo();
shipping.setName("Joe Tester");
HpsAddress address = new HpsAddress();
address.setAddress("6860 Dallas Pkwy");
address.setCity("Plano");
address.setState("TX");
address.setZip("75024");
address.setCountry("US");
shipping.setAddress(address);
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Create a Line Items List

The line item list is an list of `HpsLineItem` objects. The item amounts should add up to the `HpsPaymentData` subtotal property.

If a discount or multiple discounts need to be sent with the order, a line item object should be created with a negative amount.

> Creating line items

{% highlight php %}
<?php
$items = array();

$item1 = new HpsLineItem();
$item1->name = 'Item Number 1';
$item1->number = '1';
$item1->amount = '37.19';
$item1->quantity = '1';
$items[] = $item1;
{% endhighlight %}

{% highlight java %}
List<HpsLineItem> items = new ArrayList<HpsLineItem>();
HpsLineItem item1 = new HpsLineItem();
item1.setName("Item Number 1");
item1.setNumber("1");
item1.setAmount("37.19");
item1.setQuantity("1");
items.add(item1);
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Create a PayPal Session

A session will be created with PayPal to be referenced in all future method calls. The response contains two important pieces of information:

- Session ID: the token generated by PayPal
- Redirect URL: the initial destination URL where the consumer will be redirected

From here, the consumer will be within the PayPal checkout flow and their user interface. On completion, the consumer will be redirected to the return URL set in the `HpsBuyerData` object, and on cancellation, the consumer will be redirected to the cancel URL in the `HpsBuyerData` object.

> Creating a session

{% highlight php %}
<?php
$config = new HpsServicesConfig();
$config->username = '30360021';
$config->password = '$Test1234';
$config->deviceId = '90911395';
$config->licenseId = '20527';
$config->siteId = '20518';
$config->soapServiceUri = 'https://api-uat.heartlandportico.com/paymentserver.v1/PosGatewayService.asmx?wsdl';

$service = new HpsPayPalService($config);
$createSessionResponse = $service->createSession(
  $amount,
  $currency,
  $buyer,
  $payment,
  $shipping,
  $items
);
{% endhighlight %}

{% highlight java %}
HpsServicesConfig _config = new HpsServicesConfig();
_config.setUserName("30360021");
_config.setPassword("$Test1234");
_config.setDeviceId(90911395);
_config.setLicenseId(20527);
_config.setSiteId(20518);
_config.setServiceUri("https://api-uat.heartlandportico.com/paymentserver.v1/PosGatewayService.asmx?wsdl");
HpsPayPalService service = new HpsPayPalService(_config, true);

HpsAltPaymentCreateSession sessionResponse = paypalService.createSession(
  amount,
  currency,
  buyer,
  payment,
  shipping,
  items
);
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Get Session Information

The session ID is in the `token` query string parameter when the consumer is redirected to the return URL. The consumer's PayPal payer ID is in the `PayerID` query string parameter.

> Getting session information

{% highlight php %}
<?php
$sessionId = $_GET['token'];
$buyer->payerId = $_GET['PayerID'];
$sessionInfoResponse = $service->sessionInfo($sessionId);
{% endhighlight %}

{% highlight java %}
String sessionId = request.getParameter("token");
buyer.setPayerId(request.getParamter("PayerID"));
HpsAltPaymentSessionInfo sessionInfoResponse = service.sessionInfo(sessionId);
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Authorize the Consumer's Account

> Creating an authorization

{% highlight php %}
<?php
$authorizeResponse = $service->authorize(
  $sessionId,
  $amount,
  $currency,
  $buyer,
  $payment,
  $shipping,
  $items
);
{% endhighlight %}

{% highlight java %}
HpsAltPaymentAuth authorizeResponse = service.authorize(
  sessionId,
  amount,
  currency,
  buyer,
  payment,
  shipping,
  items
);
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Check a Pending Transaction's Status

At times, PayPal will respond in an authorization request stating the authorization is in a pending status. This most often occurs when the consumer only has ACH/eCheck backing her account, so the funds requested in the authorization cannot be confirmed. Before the authorization can be captured, the status of the pending authorization must be checked/updated using the status method.

> Checking the status

{% highlight php %}
<?php
$statusResponse = $service->status($authorizeResponse->transactionId);
{% endhighlight %}

{% highlight java %}
HpsTransactionStatus statusResponse = service.status(authorizeResponse.getTransactionID());
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Capture the Authorization

> Capturing the authorization

{% highlight php %}
<?php
$captureResponse = $service->capture($authorizeResponse->transactionId, $amount);
{% endhighlight %}

{% highlight java %}
HpsAltPaymentCapture captureResponse = service.capture(authorizeResponse.getTransactionID());
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Authorize with an Automatic Capture

When a merchant can immediately ship an order or is selling services/virtual products, the use of delayed captures is usually not needed. For these cases, the `Sale` payment type is often preferred as it acts as an authorization with an automatic capture.

> Creating a Sale Transaction

{% highlight php %}
<?php
$payment->paymentType = 'Sale';
$saleResponse = $service->sale(
  $sessionId,
  $amount,
  $currency,
  $buyer,
  $payment,
  $shipping,
  $items
);
{% endhighlight %}

{% highlight java %}
payment.setPaymentType("Sale");
HpsAltPaymentSale saleResponse = service.sale(
  sessionId,
  amount,
  currency,
  buyer,
  payment,
  shipping,
  items
);
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Refund a Captured Authorization

> Refunding a captured authorization

{% highlight php %}
<?php
$refundResponse = $service->refund($authorizeResponse->transactionId);
{% endhighlight %}

{% highlight java %}
HpsAltPaymentRefund refundResponse = service.refund(authorizeResponse.getTransactionID());
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

## Void an Open Authorization

> Voiding an open authorization

{% highlight php %}
<?php
$voidResponse = $service->void($authorizeResponse->transactionId);
{% endhighlight %}

{% highlight java %}
HpsAltPaymentVoid voidResponse = service.void(authorizeResponse.getTransactionID());
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight python %}
# coming soon
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}
