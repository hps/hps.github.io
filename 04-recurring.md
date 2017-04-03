---
title: Recurring Payments
permalink: /recurring-payments/
layout: default
---

# Recurring Payments

Heartland's recurring product, PayPlan, allows you to easily setup reccuring payments on a tokenized credit card.

<aside class="notice">
Recurring payments with PayPlan are not enabled by default. You must contact your Heartland Representitive to request this functionality on your account.
</aside>

## Create a PayPlan service object

> Create a service object

{% highlight csharp %}
var config = new HpsServicesConfig {
    SecretApiKey = "<<your api key goes here>>"
};
var payPlanService = new HpsPayPlanService(serviceConfig);
{% endhighlight %}

{% highlight php %}
<?php
$config = new HpsServicesConfig();
$config->secretApiKey =  "<<your api key goes here>>";
$payPlanService = new HpsPayPlanService($config);
{% endhighlight %}

{% highlight java %}
HpsServicesConfig config = new HpsServicesConfig();
config.setSecretAPIKey("<<your api key goes here>>");
HpsPayPlanService payPlanService = new HpsPayPlanService(config);
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight python %}
config = HpsServicesConfig()
config.secret_api_key = '<<your api key goes here>>'
payplan_service = HpsPayPlanService(config)
{% endhighlight %}

{% highlight js %}
var config = {
    secretApiKey: "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A",
    serviceUri: "https://cert.api2.heartlandportico.com/Portico.PayPlan.v2"
};
var payPlanService = new HpsPayPlanService(config);
{% endhighlight %}

## Create a Recurring Customer

> Create a Customer

{% highlight csharp %}
var newCustomer = new HpsPayPlanCustomer
{
    CustomerStatus = HpsPayPlanCustomerStatus.Active,
    CustomerIdentifier = generateCustomerId(),
    FirstName = "Bill",
    LastName = "Johnson",
    Company = "Heartland Payment Systems",
    Country = "USA"
};

var customer = payPlanService.AddCustomer(newCustomer);
{% endhighlight %}

{% highlight php %}
<?php
$newCustomer = new HpsPayPlanCustomer();
$newCustomer->customerIdentifier = generateCustomerId();
$newCustomer->firstName          = 'Bill';
$newCustomer->lastName           = 'Johnson';
$newCustomer->company            = 'Heartland Payment Systems';
$newCustomer->country            = 'USA';
$newCustomer->customerStatus     = HpsPayPlanCustomerStatus::ACTIVE;

$customer = $payPlanService->addCustomer($newCustomer);
{% endhighlight %}

{% highlight java %}
HpsPayPlanCustomer newCustomer = new HpsPayPlanCustomer();
newCustomer.setCustomerStatus(HpsPayPlanCustomerStatus.ACTIVE);
newCustomer.setCustomerIdentifier(generateCustomerId());
newCustomer.setFirstName("Bill");
newCustomer.setLastName("Johnson");
newCustomer.setCompany("Heartland Payment Systems");
newCustomer.setCountry("USA");
newCustomer.setCustomerStatus(HpsPayPlanCustomerStatus.ACTIVE);

HpsPayPlanCustomer customer = payPlanService.addCustomer(newCustomer);
{% endhighlight %}

{% highlight python %}
new_customer = HpsPayPlanCustomer()
new_customer.customer_identifier = get_customer_identifier()
new_customer.first_name = 'Bill'
new_customer.last_name = 'Johnson'
new_customer.company = 'Heartland Payment Systems'
new_customer.country = 'USA'
new_customer.customer_status = HpsPayPlanCustomerStatus.ACTIVE

customer = payplan_service.add_customer(new_customer)
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
var newCustomer = {
    customerIdentifier: getCustomerId(),
    firstName: 'Bill',
    lastName: 'Johnson',
    company: 'Heartland Payment Systems',
    country: 'USA',
    customerStatus: HpsPayPlanCustomerStatus.Active
};

payPlanService.addCustomer(newCustomer, function (err, customer) {
    // handle response
});
{% endhighlight %}

### Useful Enumerations

Enumeration              | Constant
------------------------ | --------
HpsPayPlanCustomerStatus | Active
                         | Inactive

## Create a Payment Method for a Customer

Follow the example below to create a new Payment Method for a customer.The object payPlanService was defined in the customer creation example code above.

> Create Payment Method

{% highlight csharp %}
var newPaymentMethod = new HpsPayPlanPaymentMethod
{
    CustomerKey = customer.CustomerKey,
    PaymentMethodType = HpsPayPlanPaymentMethodType.CreditCard,
    NameOnAccount = string.Format("{0} {1}", customer.FirstName, customer.LastName),
    AccountNumber = "4111111111111111",
    ExpirationDate = "0120",
    Country = "USA"
};

var paymentMethod = payPlan.AddPaymentMethod(newPaymentMethod);
{% endhighlight %}

{% highlight php %}
<?php
$newPaymentMethod = new HpsPayPlanPaymentMethod();
$newPaymentMethod->customerKey    = $customer->customerKey;
$newPaymentMethod->nameOnAccount  = 'Bill Johnson';
$newPaymentMethod->accountNumber  = 4111111111111111;
$newPaymentMethod->expirationDate = '0120';
$newPaymentMethod->country        = 'USA';

$customer = $payPlanService->addPaymentMethod($newPaymentMethod);
{% endhighlight %}

{% highlight java %}
HpsPayPlanPaymentMethod newMethod = new HpsPayPlanPaymentMethod();

newMethod.setCustomerKey(customer.getCustomerKey());
newMethod.setPaymentMethodType(HpsPayPlanPaymentMethodType.CREDIT_CARD);
newMethod.setNameOnAccount(String.format("%s %s", customer.getFirstName(), customer.getLastName()));
newMethod.setAccountNumber("4111111111111111");
newMethod.setExpirationDate("0120");
newMethod.setCountry("USA");

HpsPayPlanPaymentMethod paymentMethod = payPlanService.addPaymentMethod(newMethod);
{% endhighlight %}

{% highlight python %}
new_payment_method = HpsPayPlanPaymentMethod()

new_payment_method.customer_key = customer.customer_key
new_payment_method.payment_method_type = HpsPayPlanPaymentMethodType.CREDIT_CARD
new_payment_method.name_on_account = 'Bill Johnson'
new_payment_method.account_number = 4111111111111111
new_payment_method.expiration_date = '0120'
new_payment_method.country = 'USA'

payment_method = payplan_service.add_payment_method(new_payment_method)
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
var paymentMethod = {
    customerKey: customer.customerKey,
    paymentMethodType: HpsPayPlanPaymentMethodType.CreditCard,
    nameOnAccount: 'Bill Johnson',
    accountNumber: 4111111111111111,
    expirationDate: '0120',
    country: 'USA'
};

payPlanService.addPaymentMethod(newPaymentMethod, function (err, paymentMethod) {
    // handle response
});
{% endhighlight %}

### Useful Enumerations

Enumeration                   | Constant
----------------------------- | --------
HpsPayPlanPaymentMethodStatus | Active
                              | Inactive
                              | Invalid
                              | Revoked
                              | Expired
                              | LostStolen
HpsPayPlanPaymentMethodType   | CreditCard
                              | Ach

## Create a Recurring Plan for a Payment Method

Use the following example to create a new subscription plan for a given Payment Method.
The objects payPlanService and paymentMethod were defined in earlier example code.

> Create Payment Method

{% highlight csharp %}
var newSchedule = new HpsPayPlanSchedule
{
    ScheduleIdentifier = getScheduleId(),
    CustomerKey = paymentMethod.CustomerKey,
    PaymentMethodKey = paymentMethod.PaymentMethodKey,
    SubtotalAmount = new HpsPayPlanAmount("100"),
    StartDate = getScheduleStartDate(),
    Frequency = HpsPayPlanScheduleFrequency.Weekly,
    Duration = HpsPayPlanScheduleDuration.LimitedNumber,
    NumberOfPayments = 3,
    ReprocessingCount = 2,
    EmailReceipt = "Never",
    EmailAdvanceNotice = "No",
    ScheduleStatus = HpsPayPlanScheduleStatus.Active
};

var schedule = payPlanService.AddSchedule(newSchedule);
{% endhighlight %}

{% highlight php %}
<?php
$newPaymentSchedule = new HpsPayPlanSchedule();
$newPaymentSchedule->scheduleIdentifier = getScheduleId();
$newPaymentSchedule->customerKey        = $paymentMethod->customerKey;
$newPaymentSchedule->paymentMethodKey   = $paymentMethod->paymentMethodKey;
$newPaymentSchedule->subtotalAmount     = array('value' => 100);
$newPaymentSchedule->startDate          = getScheduleStartDate();
$newPaymentSchedule->frequency          = HpsPayPlanScheduleFrequency::WEEKLY;
$newPaymentSchedule->duration           = HpsPayPlanScheduleDuration::LIMITED_NUMBER;
$newPaymentSchedule->numberOfPayments   = 3;
$newPaymentSchedule->reprocessingCount  = 2;
$newPaymentSchedule->emailReceipt       = 'Never';
$newPaymentSchedule->emailAdvanceNotice = 'No';
$newPaymentSchedule->scheduleStatus     = HpsPayPlanScheduleStatus::ACTIVE

$schedule = $payPlanService->addSchedule($newPaymentSchedule);
{% endhighlight %}

{% highlight java %}
HpsPayPlanSchedule newSchedule = new HpsPayPlanSchedule();
newSchedule.setScheduleIdentifier(getScheduleId());
newSchedule.setCustomerKey(paymentMethod.getCustomerKey());
newSchedule.setPaymentMethodKey(paymentMethod.getPaymentMethodKey());
newSchedule.setSubtotalAmount(new HpsPayPlanAmount("100"));
newSchedule.setStartDate(getScheduleStartDate());
newSchedule.setFrequency(HpsPayPlanScheduleFrequency.WEEKLY);
newSchedule.setDuration(HpsPayPlanScheduleDuration.LIMITED_NUMBER);
newSchedule.setNumberOfPayments(3);
newSchedule.setReprocessingCount(2);
newSchedule.setEmailReceipt("Never");
newSchedule.setEmailAdvanceNotice("No");
newSchedule.setScheduleStatus(HpsPayPlanScheduleStatus.ACTIVE);

HpsPayPlanSchedule schedule = payPlanService.addSchedule(newSchedule);
{% endhighlight %}

{% highlight python %}
newSchedule = HpsPayPlanSchedule()

new_schedule.schedule_identifier = get_schedule_id()
new_schedule.customer_key = payment_method.customer_key
new_schedule.payment_method_key = payment_method.payment_method_key
new_schedule.subtotal_amount = HpsPayPlanAmount(100)
new_schedule.start_date = get_schedule_start_date()
new_schedule.frequency = HpsPayPlanScheduleFrequency.WEEKLY
new_schedule.duration = HpsPayPlanScheduleDuration.LIMITED_NUMBER
new_schedule.number_of_payments = 3
new_schedule.reprocessing_count = 2
new_schedule.email_receipt = 'Never'
new_schedule.email_advance_notice = 'No'
new_schedule.schedule_status = HpsPayPlanScheduleStatus.ACTIVE

schedule = payplan_service.add_schedule(schedule)
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
var newSchedule = {
    scheduleIdentifier: getScheduleId(),
    customerKey: paymentMethod.customerKey,
    paymentMethodKey: paymentMethod.paymentMethodKey,
    subtotalAmount: HpsPayPlanAmount(100),
    startDate: getScheduleStartDate(),
    frequency: HpsPayPlanScheduleFrequency.Weekly,
    duration: HpsPayPlanScheduleDuration.LimitedNumber,
    numberOfPayments: 3,
    reprocessingCount: 2,
    emailReceipt: 'Never',
    emailAdvanceNotice: 'No',
    scheduleStatus: HpsPayPlanScheduleStatus.Active
};

payPlanService.addSchedule(newSchedule, function (err, schedule) {
    // handle response
});
{% endhighlight %}

### Useful Enumerations

Enumeration                 | Constant
--------------------------- | --------
HpsPayPlanScheduleStatus    | Active
                            | Inactive
                            | Failed
HpsPayPlanScheduleDuration  | Ongoing
                            | EndDate
                            | LimitedNumber
HpsPayPlanScheduleFrequency | Weekly
                            | BiWeekly
                            | SemiMonthly
                            | Monthly
                            | Quarterly
                            | SemiAnnually
                            | Annually

### Failed Scheduled Transactions

A schedule with a Failed status is an indication that the merchant must reach out to the customer to obtain new payment information.  PayPlan has an email notification that a merchant can opt in to receive a list of all schedules that failed during the nightly processing.
If a card exceeds retries with non-fatal decline codes, then the schedule status changes to Failed but the payment status remains Active. This email notification is based on emailReceipt and emailAdvanceNotice.

#### Expired

There is logic in place for recurring billing; it allows us to drop the expiration date on a card if it is less than current MMYYYY and it’s a recurring billing transaction. Eventually these will decline and/or trigger a fatal error. -below-

#### Declined

If a card is declined when processing a schedule, the “Failure Count” field is incremented.  If the Failure Count exceeds the reprocessing count, then the schedule status is also updated to ‘Failed’.  Each subsequent try is aproximately 24 hours after.

#### Communication Failures

If there is a communication failure, the schedule will fall into an error queue and no updates will be made.  Any schedule in the error queue is manually reviewed the next business day.  This is exceptionally rare and we do not typically provide any information to a merchant when an instance occurs.

#### Other fatal errors

- Invalid
- Expired
- Lost/Stolen
- Revoked

A payment status can be set to something other than Active/Inactive only by the “fatal” response codes from an issuer during schedule processing; a one-time transaction does not change a payment method status.
For example, if we process a schedule with a card and the issuer returns lost/stolen, then the schedule status changes to failed and the payment status changes to Lost/Stolen.
If a card exceeds retries with non-fatal decline codes, then the schedule status changes to Failed but the payment status remains Active.

Once the payment method is updated an edit can be performed to restart the schedule.

## Find Customers

You can find customers associated using this method call.

> Find Customers

{% highlight csharp %}
// without paging:
var response = payPlanService.FindAllCustomers();

// with paging:
payPlanService.SetPagination(1, 0);
var response = payPlanService.FindAllCustomers();

// with filters:
var searchParams = new Dictionary<string, object> {
    {"customerIdentifier", "SecureSubmit"}
};
var response = payPlanService.FindAllCustomers(searchParams);
{% endhighlight %}

{% highlight php %}
<?php
// without paging:
$results = $payPlanService->findAll();

// with paging:
$results = $payPlanService
    ->page(1, 0)
    ->findAll();

// with filters:
$results = $payPlanService
    ->findAll(array(
        'customerIdentifier' => 'SecureSubmit'
    ));
{% endhighlight %}

{% highlight java %}
// without paging:
HpsPayPlanCustomerCollection results = payPlanService.findAllCustomers();

// with paging:
payPlanService.setPagination(1, 0);
HpsPayPlanCustomerCollection results = payPlanService.findAllCustomers();

// with filters:
HashMap<String, Object> searchParams = new HashMap<String, Object>();
searchParams.put("customerIdentifier", "SecureSubmit");

HpsPayPlanCustomerCollection results = payPlanService.findAllCustomers(searchParams);
{% endhighlight %}

{% highlight python %}
// without paging:
results = payplan_service.find_all_customers()

// with paging:
results = payplan_service.page(1, 0).find_all_customers()

// with filters:
results = payplan_service.find_all_customers({'customerIdentifier': 'SecureSubmit'})
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// without paging:
payPlanService.findAllCustomers(function (err, result) {
    // handle response
});

// with paging:
payPlanService.page(1, 0).findAllCustomers(function (err, result) {
    // handle response
});

// with filters:
var searchParams = {
    customerIdentifier: 'SecureSubmit'
};
payPlanService.findAllCustomers(
    searchParams,
    function (err, result) {
        // handle response
    }
);
{% endhighlight %}

## Find Payment Methods

You can find payment methods associated using this method call.

> Find Payment Methods

{% highlight csharp %}
// without paging:
var response = payPlanService.FindAllPaymentMethods();

// with paging:
payPlanService.SetPagination(1, 0);
var response = payPlanService.FindAllPaymentMethods();

// with filters:
var searchParams = new Dictionary<string, object> {
    {"customerIdentifier", "SecureSubmit"}
};
var response = payPlanService.FindAllPaymentMethods(searchParams);
{% endhighlight %}

{% highlight php %}
<?php
// without paging:
$results = $payPlanService->findAll();

// with paging:
$results = $payPlanService
    ->page(1, 0)
    ->findAll();

// with filters:
$results = $payPlanService
    ->findAll(array(
        'customerIdentifier' => 'SecureSubmit'
    ));
{% endhighlight %}

{% highlight java %}
// without paging:
HpsPayPlanCustomerCollection results = payPlanService.findAllPaymentMethods();

// with paging:
payPlanService.setPagination(1, 0);
HpsPayPlanCustomerCollection results = payPlanService.findAllPaymentMethods();

// with filters:
HashMap<String, Object> searchParams = new HashMap<String, Object>();
searchParams.put("customerIdentifier", "SecureSubmit");

HpsPayPlanCustomerCollection results = payPlanService.findAllPaymentMethods(searchParams);
{% endhighlight %}

{% highlight python %}
// without paging:
results = payplan_service.find_all_payment_methods()

// with paging:
results = payplan_service.page(1, 0).find_all_payment_methods()

// with filters:
results = payplan_service.find_all_payment_methods({'customerIdentifier': 'SecureSubmit'})
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// without paging:
payPlanService.findAllPaymentMethods(function (err, result) {
    // handle response
});

// with paging:
payPlanService.page(1, 0).findAllPaymentMethods(function (err, result) {
    // handle response
});

// with filters:
var searchParams = {
    customerIdentifier: 'SecureSubmit'
};
payPlanService.findAllPaymentMethods(
    searchParams,
    function (err, result) {
        // handle response
    }
);
{% endhighlight %}

## Find Schedules

You can find schedules associated using this method call.

> Find Schedules

{% highlight csharp %}
// without paging:
var response = payPlanService.FindAllSchedules();

// with paging:
payPlanService.SetPagination(1, 0);
var response = payPlanService.FindAllSchedules();

// with filters:
var searchParams = new Dictionary<string, object> {
    {"customerIdentifier", "SecureSubmit"}
};
var response = payPlanService.FindAllSchedules(searchParams);
{% endhighlight %}

{% highlight php %}
<?php
// without paging:
$results = $payPlanService->findAll();

// with paging:
$results = $payPlanService
    ->page(1, 0)
    ->findAll();

// with filters:
$results = $payPlanService
    ->findAll(array(
        'customerIdentifier' => 'SecureSubmit'
    ));
{% endhighlight %}

{% highlight java %}
// without paging:
HpsPayPlanCustomerCollection results = payPlanService.findAllSchedules();

// with paging:
payPlanService.setPagination(1, 0);
HpsPayPlanCustomerCollection results = payPlanService.findAllSchedules();

// with filters:
HashMap<String, Object> searchParams = new HashMap<String, Object>();
searchParams.put("customerIdentifier", "SecureSubmit");

HpsPayPlanCustomerCollection results = payPlanService.findAllSchedules(searchParams);
{% endhighlight %}

{% highlight python %}
// without paging:
results = payplan_service.find_all_schedules()

// with paging:
results = payplan_service.page(1, 0).find_all_schedules()

// with filters:
results = payplan_service.find_all_schedules({'customerIdentifier': 'SecureSubmit'})
{% endhighlight %}

{% highlight ruby %}
# coming soon
{% endhighlight %}

{% highlight js %}
// without paging:
payPlanService.findAllSchedules(function (err, result) {
    // handle response
});

// with paging:
payPlanService.page(1, 0).findAllSchedules(function (err, result) {
    // handle response
});

// with filters:
var searchParams = {
    customerIdentifier: 'SecureSubmit'
};
payPlanService.findAllSchedules(
    searchParams,
    function (err, result) {
        // handle response
    }
);
{% endhighlight %}

## Edit Schedule

### Conditional Parameters

scheduleStarted returns true if at least one transaction in the schedule has processed even if it has declined. The PHP-SDK will drop illegally passed fields during the edit call. More complete code examples can be found in the SDK

#### scheduleStarted = False

The following fields may only be edited when the schedule has not started processing

Parameter | Description
--------- | -----------
scheduleIdentifier | String 50 character max
startDate | date in DDMMYYYY format
frequency | Weekly,Bi-Weekly,Semi-Monthly,Monthly,Bi-Monthly,Quarterly,Semi-Annually,Annually
duration | Ongoing,Limited,Number,End Date

#### scheduleStarted = true

Once the schedule has started processing then the following field becomes editable

Parameter | Description
--------- | -----------
NextProcessingDate |  date in DDMMYYYY format
cancellationDate | date in DDMMYYYY format

> Edit Schedule

{% highlight php %}
<?php

$schedule                       = new HpsPayPlanSchedule();
$schedule->scheduleKey          = $scheduleKey;
$schedule->scheduleIdentifier   = "Schedule-9978";
$schedule->scheduleStatus       = HpsPayPlanScheduleStatus::ACTIVE;
$schedule->startDate            = date('m30Y', strtotime(date('Y-m-d', strtotime(date('Y-m-d'))).'+2 month'));
$schedule->processingDateInfo   = 1;
$schedule->frequency            = 'Monthly';
$schedule->duration             = 'Ongoing';
{% endhighlight %}

{% highlight csharp %}
// coming soon
{% endhighlight %}

{% highlight java %}
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
