# Reporting

## List Transactions
> List Transactions

{% highlight csharp %}
List<HpsReportTransactionSummary> items = creditService.List(DateTime.Today.AddDays(-10), DateTime.Today);
{% endhighlight %}

{% highlight php %}
<?php
$dateFormat = 'Y-m-d\TH:i:s.00\Z';
$dateMinus10 = new DateTime();
$dateMinus10->sub(new DateInterval('P10D'));
$dateMinus10Utc = gmdate($dateFormat, $dateMinus10->Format('U'));
$nowUtc = gmdate($dateFormat);

$items = $chargeSvc->listTransactions($dateMinus10Utc, $nowUtc, "CreditSale");
{% endhighlight %}

{% highlight java %}
List<HpsReportTransactionSummary> items = service.list(Calendar.getInstance().add(Calendar.DAY_OF_MONTH, -10), Calendar.getInstance());
{% endhighlight %}

{% highlight ruby %}
items = charge_service.list(DateTime.now - 10, DateTime.now)
{% endhighlight %}

{% highlight python %}
items = credit_service.list(datetime.datetime.utcnow() + datetime.timedelta(-10), datetime.datetime.utcnow())
{% endhighlight %}

{% highlight js %}
var startDate = new Date(), endDate = new Date();
startDate.setDate(startDate.getDate() - 1);

creditService.list(startDate.toISOString(), endDate.toISOString(), null, function (err, response) {
  if (err) return;
  // Do something with response
});
{% endhighlight %}

Gets a list of transaction summaries between a set of dates and filtered if specified.

### Parameters

Parameter | Description
--------- | -----------
Start | Start date
End | End date
Filter By | Filter the result set by transaction type

Returns: HpsReportTransactionSummaryArray

Properties | Description
--------- | -----------
Amount | Amount of the transaction
SettlementAmount : Settlement amount of transaction
OriginalTransactionId : If the transaction performed an action on a previous transaction, this field records the transaction that was acted upon.
MaskedCardNumber | Shows card number with astericks in all but last 4 digits
TransactionType | The type of transaction such as charge, refund, void etc
TransactionUtcDate | Date of transaction
Exceptions | Contains a set of any exceptions that might have been thrown as a result of the transaction


## Get a Transaction
> Get Transaction

{% highlight csharp %}
List<HpsReportTransactionSummary> items = creditService.List(DateTime.Today.AddDays(-10), DateTime.Today);

HpsReportTransactionDetails charge = creditService.Get(items[0].TransactionId);
{% endhighlight %}

{% highlight php %}
<?php
$dateFormat = 'Y-m-d\TH:i:s.00\Z';
$dateMinus10 = new DateTime();
$dateMinus10->sub(new DateInterval('P10D'));
$dateMinus10Utc = gmdate($dateFormat, $dateMinus10->Format('U'));
$nowUtc = gmdate($dateFormat);

$items = $chargeSvc->listTransactions($dateMinus10Utc, $nowUtc, "CreditSale");

$charge = $chargeSvc->get($items[0]->transactionId);
{% endhighlight %}

{% highlight java %}
List<HpsReportTransactionSummary> items = service.list(Calendar.getInstance().add(Calendar.DAY_OF_MONTH, -10), Calendar.getInstance());

HpsReportTransactionDetails charge = service.get(items.get(0).getTransactionID());
{% endhighlight %}

{% highlight ruby %}
items = charge_service.list(DateTime.now - 10, DateTime.now)

charge = charge_service.get(items[0].transaction_id)
{% endhighlight %}

{% highlight python %}
items = credit_service.list(datetime.datetime.utcnow() + datetime.timedelta(-10), datetime.datetime.utcnow())
charge = credit_service.get(items[0].transaction_id)
{% endhighlight %}

{% highlight js %}
var startDate = new Date(), endDate = new Date();
startDate.setDate(startDate.getDate() - 1);

creditService.list(startDate.toISOString(), endDate.toISOString(), null, function (err, items) {
  if (err) return;
  creditService.get(items[0].transactionId, function (error, response) {
    if (error) return;
    // Do something with the response
  });
});
{% endhighlight %}

Gets an HPS Transaction given a Transaction ID.

Returns: HpsReportTransactionDetails

Properties | Description
--------- | -----------
IssuerTransactionId | Card issuer transaction id
IssuerValidationCode | Card issuer transaction code
OriginalTransactionId | If the transaction performed an action on a previous transaction, this field records the transaction that was acted upon.
MaskedCardNumber | Shows card number with astericks in all but last 4 digits
SettlementAmount | Settlement amount of transaction
TransactionType | The type of transaction such as charge, refund, void etc
TransactionUtcDate | Date of transaction
Exceptions | Contains a set of any exceptions that might have been thrown as a result of the transaction
Memo | a free-form field (for Merchant reporting/record-keeping purposes only)
InvoiceNumber | This will not be used at settlement. (for Merchant reporting/record-keeping purposes only).
CustomerId | This is intended to be the customer identification. (for Merchant reporting/record-keeping purposes only).
TransactionStatus | String returning the status of the transaction
