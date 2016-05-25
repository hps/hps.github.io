# Recurring Payments
 > Create a Customer

{% highlight csharp %}
 var newCustomer = new HpsPayPlanCustomer
{
	CustomerStatus = HpsPayPlanCustomerStatus.Active,
	CustomerIdentifier = "ExampleCo-1234",
	FirstName = "Bill",
	LastName = "Johnson",
	Company = "Heartland Payment Systems",
	Country = "USA"
};
var serviceConfig = new HpsServicesConfig() { SecretApiKey = "<< your api key goes here>>" };
var payPlanService = new HpsPayPlanService( serviceConfig );
var customer = payPlanService.AddCustomer( newCustomer );
{% endhighlight %}

{% highlight php %}
<?php
$id = date('Ymd').'-SecureSubmit-'.substr(str_shuffle($this->alphabet), 0, 10);
$newCustomer = new HpsPayPlanCustomer();
$newCustomer->customerIdentifier = $id;
$newCustomer->firstName          = 'Bill';
$newCustomer->lastName           = 'Johnson';
$newCustomer->company            = 'Heartland Payment Systems';
$newCustomer->country            = 'USA';
$newCustomer->customerStatus     = HpsPayPlanCustomerStatus::ACTIVE;
{% endhighlight %}

{% highlight java %}
String id = generateCustomerId();

HpsPayPlanCustomer newCustomer = new HpsPayPlanCustomer();
newCustomer.setCustomerStatus(HpsPayPlanCustomerStatus.ACTIVE);

newCustomer.setCustomerIdentifier(id);
newCustomer.setFirstName("Bill");
newCustomer.setLastName("Johnson");
newCustomer.setCompany("Heartland Payment Systems");
newCustomer.setCountry("USA");
newCustomer.setCustomerStatus(HpsPayPlanCustomerStatus.ACTIVE);
{% endhighlight %}

{% highlight python %}
new_customer = HpsPayPlanCustomer()
new_customer.customer_identifier = self.get_customer_identifier()
new_customer.first_name = 'Bill'
new_customer.last_name = 'Johnson'
new_customer.company = 'Heartland Payment Systems'
new_customer.country = 'USA'
new_customer.customer_status = HpsPayPlanCustomerStatus.ACTIVE
{% endhighlight %}

Securesubmit allows you to easily setup reoccuring payments on a tokenized credit card.

## Creating a Payment Method for a Customer
 Create Payment Method

{% highlight csharp %}
var paymentMethod = new HpsPayPlanPaymentMethod
{
    CustomerKey = _customer.CustomerKey,
    PaymentMethodType = HpsPayPlanPaymentMethodType.CreditCard,
    NameOnAccount = string.Format("{0} {1}", _customer.FirstName, _customer.LastName),
    AccountNumber = "4111111111111111",
    ExpirationDate = "0120",
    Country = "USA"
};
var returnedPaymentMethod = payPlan.AddPaymentMethod( paymentMethod );
var paymentMethodKey = returnedPaymentMethod.PaymentMethodKey;
{% endhighlight %}

{% highlight php %}
<?php
$newPaymentMethod = new HpsPayPlanPaymentMethod();
$newPaymentMethod->customerKey    = $this->customer->customerKey;
$newPaymentMethod->nameOnAccount  = 'Bill Johnson';
$newPaymentMethod->accountNumber  = 4111111111111111;
$newPaymentMethod->expirationDate = '0120';
$newPaymentMethod->country        = 'USA';
{% endhighlight %}

{% highlight java %}
HpsPayPlanPaymentMethod newMethod = new HpsPayPlanPaymentMethod();

newMethod.setCustomerKey(this.customer.getCustomerKey());
newMethod.setPaymentMethodType(HpsPayPlanPaymentMethodType.CREDIT_CARD);
newMethod.setNameOnAccount(String.format("%s %s", this.customer.getFirstName(), this.customer.getLastName()));
newMethod.setAccountNumber("4111111111111111");
newMethod.setExpirationDate("0120");
newMethod.setCountry("USA");
{% endhighlight %}

{% highlight python %}
payment_method = HpsPayPlanPaymentMethod()

payment_method.customer_key = self.customer.customer_key
payment_method.payment_method_type = HpsPayPlanPaymentMethodType.CREDIT_CARD
payment_method.name_on_account = 'Bill Johnson'
payment_method.account_number = 4111111111111111
payment_method.expiration_date = '0120'
payment_method.country = 'USA'
{% endhighlight %}

Follow the example below to create a new Payment Method for a customer.The object payPlanService was defined in the customer creation example code above.

## Create a Recurring Plan for a Payment Method
> Create Payment Method

{% highlight csharp %}
var schedule = new HpsPayPlanSchedule
{
        ScheduleIdentifier = Guid.NewGuid().ToString(),    
        CustomerKey = paymentMethod.CustomerKey,
        PaymentMethodKey = _paymentMethod.PaymentMethodKey,
        SubtotalAmount = new HpsPayPlanAmount("100"),
        StartDate = date,
        Frequency = HpsPayPlanScheduleFrequency.Weekly,
        Duration = HpsPayPlanScheduleDuration.LimitedNumber,
        NumberOfPayments = 3,
        ReprocessingCount = 2,
        EmailReceipt = "Never",
        EmailAdvanceNotice = "No",
        ScheduleStatus = HpsPayPlanScheduleStatus.Active
};
var returnedSchedule = payPlanService.AddSchedule( schedule );
var scheduleKey = returnedSchedule.ScheduleKey;
{% endhighlight %}

{% highlight php %}
<?php
$id = date('Ymd').'-SecureSubmit-'.substr(str_shuffle($this->alphabet), 0, 10);
$date = date('m30Y', strtotime(date('Y-m-d', strtotime(date('Y-m-d'))).'+1 month'));

$newPaymentSchedule = new HpsPayPlanSchedule();
$newPaymentSchedule->scheduleIdentifier = $id;
$newPaymentSchedule->customerKey        = $this->paymentMethod->customerKey;
$newPaymentSchedule->paymentMethodKey   = $this->paymentMethod->paymentMethodKey;
$newPaymentSchedule->subtotalAmount     = array('value' => 100);
$newPaymentSchedule->startDate          = $date;
$newPaymentSchedule->frequency          = HpsPayPlanScheduleFrequency::WEEKLY;
$newPaymentSchedule->duration           = HpsPayPlanScheduleDuration::LIMITED_NUMBER;
$newPaymentSchedule->numberOfPayments   = 3;
$newPaymentSchedule->reprocessingCount  = 2;
$newPaymentSchedule->emailReceipt       = 'Never';
$newPaymentSchedule->emailAdvanceNotice = 'No';
$newPaymentSchedule->scheduleStatus     = HpsPayPlanScheduleStatus::ACTIVE
{% endhighlight %}

{% highlight java %}
String id = this.generateScheduleId();
String date = getLastDayOfMonth();

HpsPayPlanSchedule schedule = new HpsPayPlanSchedule();
schedule.setScheduleIdentifier(id);
schedule.setCustomerKey(this.paymentMethod.getCustomerKey());
schedule.setPaymentMethodKey(this.paymentMethod.getPaymentMethodKey());
schedule.setSubtotalAmount(new HpsPayPlanAmount("100"));
schedule.setStartDate(date);
schedule.setFrequency(HpsPayPlanScheduleFrequency.WEEKLY);
schedule.setDuration(HpsPayPlanScheduleDuration.LIMITED_NUMBER);
schedule.setNumberOfPayments(3);
schedule.setReprocessingCount(2);
schedule.setEmailReceipt("Never");
schedule.setEmailAdvanceNotice("No");
schedule.setScheduleStatus(HpsPayPlanScheduleStatus.ACTIVE);
{% endhighlight %}

{% highlight ruby %}
schedule = HpsPayPlanSchedule()

schedule.schedule_identifier = self.get_schedule_identifier()
schedule.customer_key = self.payment_method.customer_key
schedule.payment_method_key = self.payment_method.payment_method_key
schedule.subtotal_amount = HpsPayPlanAmount(100)
schedule.start_date = self.last_day_of_the_month()
schedule.frequency = HpsPayPlanScheduleFrequency.WEEKLY
schedule.duration = HpsPayPlanScheduleDuration.LIMITED_NUMBER
schedule.number_of_payments = 3
schedule.reprocessing_count = 2
schedule.email_receipt = 'Never'
schedule.email_advance_notice = 'No'
schedule.schedule_status = HpsPayPlanScheduleStatus.ACTIVE
{% endhighlight %}

Use the following example to create a new subscription plan for a given Payment Method.
The objects payPlanService and paymentMethod were defined in earlier example code.
{% highlight php %}
<?php
$id = date('Ymd').'-SecureSubmit-'.substr(str_shuffle($this->alphabet), 0, 10);
$date = date('m30Y', strtotime(date('Y-m-d', strtotime(date('Y-m-d'))).'+1 month'));
$newPaymentSchedule = new HpsPayPlanSchedule();
$newPaymentSchedule->scheduleIdentifier = $id;
$newPaymentSchedule->scheduleKey        = $this->paymentMethod->customerKey;
$newPaymentSchedule->scheduleName   = $this->paymentMethod->paymentMethodKey;
$newPaymentSchedule->deviceId     = array('value' => 100);
$newPaymentSchedule->paymentMethodKey          = $date;
$newPaymentSchedule->frequency          = HpsPayPlanScheduleFrequency::WEEKLY;
$newPaymentSchedule->duration           = HpsPayPlanScheduleDuration::LIMITED_NUMBER;
$newPaymentSchedule->numberOfPayments   = 3;
$newPaymentSchedule->reprocessingCount  = 2;
$newPaymentSchedule->emailReceipt       = 'Never';
$newPaymentSchedule->emailAdvanceNotice = 'No';
$newPaymentSchedule->scheduleStatus     = HpsPayPlanScheduleStatus::ACTIVE
{% endhighlight %}

### Failed Scheduled Transactions
A schedule with a Failed status is an indication that the merchant must reach out to the customer to obtain new payment information.  PayPlan has an email notification that a merchant can opt in to receive a list of all schedules that failed during the nightly processing.
If a card exceeds retries with non-fatal decline codes, then the schedule status changes to Failed but the payment status remains Active.
This email notification is based on emailReceipt and emailAdvanceNotice 

#### Expired
There is logic in place for recurring billing; it allows us to drop the expiration date on a card if it is less than current MMYYYY and it’s a recurring billing transaction. Eventually these will decline and/or trigger a fatal error. -below-

#### Declined
If a card is declined when processing a schedule, the “Failure Count” field is incremented.  If the Failure Count exceeds the reprocessing count, then the schedule status is also updated to ‘Failed’.  Each subsequent try is aproximately 24 hours after.

#### Communication Failures
If there is a communication failure, the schedule will fall into an error queue and no updates will be made.  Any schedule in the error queue is manually reviewed the next business day.  This is exceptionally rare and we do not typically provide any information to a merchant when an instance occurs.  


#### Other fatal errors 
·         Invalid
·         Expired
·         Lost/Stolen
·         Revoked
A payment status can be set to something other than Active/Inactive only by the “fatal” response codes from an issuer during schedule processing; a one-time transaction does not change a payment method status.
For example, if we process a schedule with a card and the issuer returns lost/stolen, then the schedule status changes to failed and the payment status changes to Lost/Stolen.
If a card exceeds retries with non-fatal decline codes, then the schedule status changes to Failed but the payment status remains Active.

Once the payment method is updated an edit can be performed to restart the schedule.


## Find Customers
> Find Customers

{% highlight csharp %}
// without paging:
var response = _payPlanService.FindAllCustomers();

// with paging:
_payPlanService.SetPagination(1, 0);
var response = _payPlanService.FindAllCustomers();

// with filters:
var searchParams = new Dictionary<string, object> {{"customerIdentifier", "SecureSubmit"}};
var response = _payPlanService.FindAllCustomers(searchParams);
{% endhighlight %}

{% highlight php %}
<?php
// without paging:
$results = $this->service->findAll();

// with paging:
$results = $this->service
            ->page(1, 0)
            ->findAll();

// with filters:
$results = $this->service
            ->findAll(array('customerIdentifier' => 'SecureSubmit'));
{% endhighlight %}

{% highlight java %}
// without paging:
HpsPayPlanCustomerCollection results = this.service.findAllCustomers();

// with paging:
this.service.setPagination(1, 0);
HpsPayPlanCustomerCollection results = this.service.findAllCustomers();

// with filters:
HashMap<String, Object> searchParams = new HashMap<String, Object>();
searchParams.put("customerIdentifier", "SecureSubmit");

HpsPayPlanCustomerCollection results = this.service.findAllCustomers(searchParams);
{% endhighlight %}

{% highlight python %}
// without paging:
results = self.service.find_all_customers()

// with paging:
results = self.service.page(1, 0).find_all_customers()

// with filters:
results = self.service.find_all_customers({'customerIdentifier': 'SecureSubmit'})
{% endhighlight %}

You can find customers associated with a given payment method using this method call.


## Edit Schedule
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


Conditional Parameters
scheduleStarted returns true if at least one transaction in the schedule has processed even if it has declined. The PHP-SDK will drop illegally passed fields during the edit call. More complete code examples can be found in the SDK


### scheduleStarted = False
The following fields may only be edited when the schedule has not started processing
Parameter | Description
--------- | -----------
scheduleIdentifier | String 50 character max
startDate | date in DDMMYYYY format
frequency | Weekly,Bi-Weekly,Semi-Monthly,Monthly,Bi-Monthly,Quarterly,Semi-Annually,Annually
duration | Ongoing,Limited,Number,End Date

### scheduleStarted = true
Once the schedule has started processing then the following field becomes editable
Parameter | Description
--------- | -----------
NextProcessingDate |  date in DDMMYYYY format
cancellationDate | date in DDMMYYYY format



