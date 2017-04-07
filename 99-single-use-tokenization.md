---
title: Single-Use Tokenization
permalink: /single-use-tokenization/
language_tabs_type: client
layout: default
hide: true
---

# Single-Use Tokenization

{% highlight js %}
(new Heartland.HPS({
    publicKey:    'pkapi_cert_jKc1FtuyAydZhZfbB3',
    cardNumber:   '4111111111111111',
    cardCvv:      '123',
    cardExpMonth: '12',
    cardExpYear:  '2025',
    // Callback when a token is received from the service
    success: function (resp) {
        alert('Here is a single-use token: ' + resp.token_value);
    },
    // Callback when an error is received from the service
    error: function (resp) {
        alert('There was an error: ' + resp.error.message);
    }
// Immediately call the tokenize method to get a token
})).tokenize();
{% endhighlight %}

{% highlight java %}
// coming soon
{% endhighlight %}

{% highlight objc %}
HpsTokenService *service = [[HpsTokenService alloc] initWithPublicKey:@"pkapi_cert_jKc1FtuyAydZhZfbB3"];

[service getTokenWithCardNumber:@"4111111111111111"
                            cvc:@"123"
                       expMonth:@"12"
                        expYear:@"2025"
               andResponseBlock:^(HpsTokenData *tokenResponse) {
                   if([tokenResponse.type isEqualToString:@"error"]) {
                        self.tokenCodeResultLabel.text = tokenResponse.code;
                        self.tokenResultLabel.text = tokenResponse.message;
                   }
                   else {
                        self.tokenResultLabel.text = tokenResponse.tokenValue;
                   }
               }];
{% endhighlight %}

{% highlight swift %}
import Heartland_iOS_SDK

let tokenService: HpsTokenService = HpsTokenService(publicKey:"pkapi_cert_jKc1FtuyAydZhZfbB3");

tokenService.getTokenWithCardNumber("XXXXXXXXXXXXX",
                               cvc: "123",
                               expMonth: "12",
                               expYear: "2025") { (tokenData) in


    //use token
    tokenData.tokenValue
    //Call method after execution to continue.
}
{% endhighlight %}
