---
title: Consumer Authentication
permalink: /consumer-authentication/
layout: default
---

# Consumer Authentication

Consumer authentication, also known as cardholder authentication or 3DSecure, is a process of authenticating a cardholder with the card's issuing bank. The authentication process occurs during the payment process, typically through an embedded iframe. This eCommerce-focused program can often reduce the chances of chargebacks due to fraud for authenticated transactions.

While this may introduce a separate step during checkout, there are times when an issuer isn't participating in the program or when the issuer or merchant elects not to authenticate the cardholder for a particular transaction which both remove the need for the authentication process.

<aside class="warning">
Consumer authentication needs to be enabled on your account before you can leverage the program. Please reach out to your Heartland representative to enable it.
</aside>

<aside class="success">
The rules that govern when a consumer is prompted for authentication can be configured. If you would like to modify these rules beyond their defaults, please work with <a href="https://developer.heartlandpaymentsystems.com/support">Heartland Support</a>.
</aside>

## Checkout Flow

Without consumer authentication, a typical Heartland checkout flow may look something like the below:

1. Select goods or services
2. Proceed to checkout page
3. Fill out payment form
4. Submit form
5. See confirmation page

The Heartland checkout flow with consumer authentication added will look like this (bolded below for emphasis):

1. Select goods or services
2. Proceed to checkout page
3. Fill out payment form
4. Submit form
5. **Authenticate with issuer**
6. See confirmation page

With our libraries in place, the authentication process will keep the consumer within within your payment form, removing the need for a potentially jarring redirect for the consumer.

## Shopping Cart Setup

We are constantly improving our shopping cart and ecommerce platform integrations, and adding support for consumer authentication is no different. If you are using an integration that already has consumer authentication built-in, there will be a few new configuration options in the plugins settings screen. For example, the new options look like this in our WooCommerce integration:

![]({{ '/Content/images/consumer-authentication-integration-options.png' }})

The values for these options will be supplied once your merchant account is configured with consumer authentication. During checkout, the consumer will see something similar to the following (again from our WooCommerce integration):

![]({{ '/Content/images/consumer-authentication-integration-experience.png' }})

Outside of these two screens, the integrations' interfaces and setup process will remain the same.

## Custom Integrations

Custom integrators will also be able to leverage our consumer authentication offering. To complete the integration, you will be using:

- Heartland's tokenization library
- Our partner's (Cardinal Commerce) consumer authentication library

Heartland's tokenization libary can be referenced from the same URL for both certification and production uses (<https://api.heartlandportico.com/SecureSubmit.v1/token/2.1/securesubmit.js>), but Cardinal's library will have two separate URLs for each environment:

- Certification: <https://includestest.ccdc02.com/cardinalcruise/v1/songbird.js>
- Production: <https://includes.ccdc02.com/cardinalcruise/v1/songbird.js>

Once referenced, your integration will use both libraries for an end-to-end checkout experience.

### Integration Process

In all cases, the integration process will begin with the generation of a JSON Web Token (JWT) in order to authenticate with the Cardinal Commerce service. To learn more about this process, please reference [Cardinal Commerce's documentation](https://developer.cardinalcommerce.com/cardinal-cruise-activation.shtml#generatingServerJWT). The JWT generation process will use the API Identifier, Org Unit ID, and API Key credentials provided during consumer authentication enrollment.

> Create a JWT

{% highlight csharp %}
using System;
using System.Collections.Generic;
using Application.Models;
using JWT;

public string GenerateJwt(string apiKey, string apiIdentifier, string orgUnitId)
{
  var payload = new Dictionary<string, object>
  {
    {"exp", DateTime.UtcNow.AddDays(365).ToUnixTime()},
    {"iat", DateTime.Now.ToUnixTime()},
    {"jti", Guid.NewGuid()},
    {"iss", apiIdentifier},
    {"OrgUnitId", orgUnitId},
    {
      "Payload", new Order
      {
        OrderDetails = new OrderDetails
        {
          OrderNumber = Guid.NewGuid().ToString()
        }
      }
    }
  };
  return JsonWebToken.Encode(payload, apiKey, JwtHashAlgorithm.HS256);
}
{% endhighlight %}

{% highlight php %}
<?php
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;

function generateJwt($orderTransactionId, $orderObj){
  $currentTime = time();
  $expireTime = 3600; // expiration in seconds - this equals 1hr

  $token = (new Builder())
    // API Key Identifier (iss claim)
    ->setIssuer($GLOBALS['ApiId'])
    // The Transaction Id (jti claim)
    ->setId($orderTransactionId, true)
    // Configures the time that the token was issued (iat claim)
    ->setIssuedAt($currentTime)
    // Configures the expiration time of the token (exp claim)
    ->setExpiration($currentTime + $expireTime)
    // Configures a new claim, called "OrgUnitId"
    ->set('OrgUnitId', $GLOBALS['OrgUnitId'])
    // Configures a new claim, called "Payload"
    // containing the OrderDetails
    ->set('Payload', $_SESSION['Order'])
    ->set('ObjectifyPayload', true)
    // Sign with API Key
    ->sign(new Sha256(), $GLOBALS['ApiKey'])
    // Retrieves the generated token
    ->getToken();

  return $token; // The JWT String
}
{% endhighlight %}

{% highlight java %}
// coming soon
{% endhighlight %}

{% highlight ruby %}
// coming soon
{% endhighlight %}

{% highlight python %}
// coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}

After generating a JWT, you will use Heartland's tokenization library to obtain a Heartland single-use token as well as a Cardinal Commerce token. This double tokenization process provides your integration two separate tokens for both systems and keeps your integration capable of qualifying for the lowest PCI DSS scope.

> Set up iframes for tokenization

{% highlight html %}
<script>
var hps = Heartland.HPS({
  publicKey: 'public API key',
  type: 'iframe',
  fields: {
    cardNumber: {
      target: 'card_number_target',
      placeholder: '•••• •••• •••• ••••'
    },
    cardExpiration: {
      target: 'card_expiration_target',
      placeholder: 'MM / YYYY'
    },
    cardCvv: {
      target: 'card_cvv_target',
      placeholder: 'CVV'
    }
  },
  style: {
    // any desired styles
  },
  onTokenSuccess: tokenResponseHandler,
  onTokenError: tokenResponseHandler,
  cca: {
    jwt: document.getElementById('jwt_value').value,
    orderNumber: document.getElementById('order_number').value
  };
});
</script>
{% endhighlight %}

As without consumer authentication, your `onTokenSuccess` callback function will be called upon tokenization. The normal Heartland tokenization response that used to be `response` is now `response.heartland`, and the new Cardinal Commerce tokenization response is now available under `response.cardinal`. In the below example, we store the two token values in our form for later use:

> Handle tokenization response

{% highlight html %}
<script>
function tokenResponseHandler(response) {
  var form = document.getElementById('payment_form');

  if (response.error || (response.heartland && response.heartland.error)) {
    var error = '';
    if (response.error) error = response.error.message;
    else error = response.heartland.error.message;
    alert(error);
  } else {
    var heartland = response.heartland || response;
    var cardinal = response.cardinal;
    var token = document.getElementById('token');
    var last4 = document.createElement('input');
    var cType = document.createElement('input');
    var expMo = document.createElement('input');
    var expYr = document.createElement('input');

    token.value = heartland.token_value;

    last4.type = 'hidden';
    last4.id = 'last_four';
    last4.name = 'last_four';
    last4.value = heartland.last_four;

    cType.type = 'hidden';
    cType.id = 'card_type';
    cType.name = 'card_type';
    cType.value = heartland.card_type;

    expMo.type = 'hidden';
    expMo.id = 'exp_month';
    expMo.name = 'exp_month';
    expMo.value = heartland.exp_month;

    expYr.type = 'hidden';
    expYr.id = 'exp_year';
    expYr.name = 'exp_year';
    expYr.value = heartland.exp_year;

    form.appendChild(last4);
    form.appendChild(cType);
    form.appendChild(expMo);
    form.appendChild(expYr);

    if (cardinal && cardinal.token_Value) {
      var cardinalToken = document.createElement('input');
      cardinalToken.type = 'hidden';
      cardinalToken.id = 'cardinal_token';
      cardinalToken.name = 'cardinal_token';
      cardinalToken.value = value;
      form.appendChild(cardinal.token_value);
      cca();
      return;
    }

    form.submit();
  }
}
</script>
{% endhighlight %}

When handling the tokenization response, we had to check to ensure a Cardinal token was obtained, and if that process was successful, we start the consumer authentication process with the Cardinal library in the `cca` function below.

> Initiate consumer authentication process

{% highlight html %}
<script>
function cca() {
  Cardinal.setup('init', {
    jwt: document.getElementById('jwt_value').value
  });
  // The below callback function will be called
  // after the authentication process completes.
  Cardinal.on('payments.validated', function (data, jwt) {
    var token = document.getElementById('cardinal_token');
    var form = document.getElementById('payment_form');
    var cca = document.createElement('input');

    data.jwt = jwt;
    cca.type = 'hidden';
    cca.id = 'cca_data';
    cca.name = 'cca_data';
    cca.value = Heartland.JSON.stringify(data);
    form.appendChild(cca);

    form.submit();
  });

  var token = document.getElementById('cardinal_token').value;

  var options = {
    OrderDetails: {
      OrderNumber: orderNumber + 'cca'
    },
    Token: {
      Token: token,
      ExpirationMonth: document.getElementById('exp_month').value,
      ExpirationYear: document.getElementById('exp_year').value
    }
  };
  Cardinal.start('cca', options);
}
</script>
{% endhighlight %}

Finally, the `payments.validated` callback will receive the result from consumer authentication, which should be forwarded to your backend service to send during the authorization request.

> Create an authorization request

{% highlight csharp %}
HpsSecureEcommerce secureEcommerce;
var data = deserializeJson(HttpContext.Current.Request["cca_data"]);
if (data != null && data.ActionCode != null
  && "SUCCESS" == data.ActionCode
) {
  var dataSource = string.Empty;
  switch (HttpContext.Current.Request["card_type"]) {
  case "visa":
    dataSource = "Visa 3DSecure";
    break;
  case "mastercard":
    dataSource = "MasterCard 3DSecure";
    break;
  case "discover":
    dataSource = "Discover 3DSecure";
    break;
  case "amex":
    dataSource = "AMEX 3DSecure";
    break;
  }
  var cavv = data.Payment.ExtendedData.CAVV != null
    ? data.Payment.ExtendedData.CAVV
    : string.Empty;
  var eciFlag = data.Payment.ExtendedData.ECIFlag != null
    ? substr(data.Payment.ExtendedData.ECIFlag, 1)
    : string.Empty;
  var xid = data.Payment.ExtendedData.XID != null
    ? data.Payment.ExtendedData.XID
    : string.Empty;
  secureEcommerce = new HpsSecureEcommerce()
  {
    Type       = "3DSecure",
    DataSource = dataSource,
    Data       = cavv,
    EciFlag    = eciFlag,
    Xid        = xid,
  };
}

var response = fluentCreditService
  .Authorize()
  .WithAmount(orderTotal)
  .WithCurrency('usd')
  .WithToken(HttpContext.Current.Request["token"])
  .WithSecureEcommerce(secureEcommerce)
  .Execute();
{% endhighlight %}

{% highlight php %}
<?php
$secureEcommerce = null;
if (false !== ($data = json_decode(stripslashes($_POST['cca_data'])))
  && isset($data) && isset($data->ActionCode)
  && 'SUCCESS' === $data->ActionCode
) {
  $dataSource = '';
  switch ($card_type) {
  case 'visa':
    $dataSource = 'Visa 3DSecure';
    break;
  case 'mastercard':
    $dataSource = 'MasterCard 3DSecure';
    break;
  case 'discover':
    $dataSource = 'Discover 3DSecure';
    break;
  case 'amex':
    $dataSource = 'AMEX 3DSecure';
    break;
  }
  $cavv = isset($data->Payment->ExtendedData->CAVV)
    ? $data->Payment->ExtendedData->CAVV
    : '';
  $eciFlag = isset($data->Payment->ExtendedData->ECIFlag)
    ? substr($data->Payment->ExtendedData->ECIFlag, 1)
    : '';
  $xid = isset($data->Payment->ExtendedData->XID)
    ? $data->Payment->ExtendedData->XID
    : '';
  $secureEcommerce = new HpsSecureEcommerce();
  $secureEcommerce->type       = '3DSecure';
  $secureEcommerce->dataSource = $dataSource;
  $secureEcommerce->data       = $cavv;
  $secureEcommerce->eciFlag    = $eciFlag;
  $secureEcommerce->xid        = $xid;
}

$response = $fluentCreditService
  ->authorize()
  ->withAmount($orderTotal)
  ->withCurrency('usd')
  ->withToken($_POST['token'])
  ->withSecureEcommerce($secureEcommerce)
  ->execute();
{% endhighlight %}

{% highlight java %}
// coming soon
{% endhighlight %}

{% highlight ruby %}
// coming soon
{% endhighlight %}

{% highlight python %}
// coming soon
{% endhighlight %}

{% highlight js %}
// coming soon
{% endhighlight %}
