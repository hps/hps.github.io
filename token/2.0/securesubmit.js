/*global $, jQuery*/
var hps = (function ($) {
    "use strict";

    var HPS;

    HPS = {

        Tag: "SecureSubmit",

        Urls: {
            CERT: "https://posgateway.cert.secureexchange.net/Hps.Exchange.PosGateway.Hpf.v1/api/token",
            PROD: "https://api.heartlandportico.com/SecureSubmit.v1/api/token",
            iframeCERT: "https://hps.github.io/token/2.0/",
            iframePROD: "" // tbd
        },

        tokenize: function (options) {
            var gateway_url, params, env;
            var number = $.trim(options.data.number);
            var exp_month = $.trim(options.data.exp_month);
            var exp_year = $.trim(options.data.exp_year);

            // add additional service parameters
            params = $.param({
                "api_key": options.data.public_key,
                "object": "token",
                "token_type": "supt",
                "_method": "post",
                "card[number]": number,
                "card[cvc]": $.trim(options.data.cvc),
                "card[exp_month]": exp_month,
                "card[exp_year]": exp_year
            });

            env = options.data.public_key.split("_")[1];

            if (env === "cert") {
                gateway_url = HPS.Urls.CERT;
            } else {
                gateway_url = HPS.Urls.PROD;
            }


            var d = new Date();
            if (parseInt(exp_year) < d.getFullYear()) {
                options.error("The expiration year is in the past.");
                return;
            }

            var cardType = '';

            var re = {
                visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
                mastercard: /^5[1-5][0-9]{14}$/,
                amex: /^3[47][0-9]{13}$/,
                diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
                discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
                jcb: /^(?:2131|1800|35\d{3})\d{11}$/
            };

            if (re.visa.test(number)) {
                cardType = 'visa';
            } else if (re.mastercard.test(number)) {
                cardType = 'mastercard';
            } else if (re.amex.test(number)) {
                cardType = 'amex';
            } else if (re.diners.test(number)) {
                cardType = 'diners';
            } else if (re.discover.test(number)) {
                cardType = 'discover';
            } else if (re.jcb.test(number)) {
                cardType = 'jcb';
            }

            // request token
            $.ajax({
                cache: false,
                url: gateway_url,
                data: params,
                dataType: "jsonp",
                success: function (response) {

                    // Request failed, handle error
                    if (typeof response.error === 'object') {
                        // call error handler if provided and valid
                        if (typeof options.error === 'function') {
                            options.error(response.error);
                        }
                        else {
                            // handle exception
                            HPS.error(response.error.message);
                        }
                    } else if (typeof options.success === 'function') {
                        response.card_type = cardType;
                        response.exp_month = exp_month;
                        response.exp_year = exp_year;

                        options.success(response);
                    }
                }
            });
        },

        tokenize_swipe: function (options) {
            var gateway_url, params, env;

            params = $.param({
                "api_key": options.data.public_key,
                "object": "token",
                "token_type": "supt",
                "_method": "post",
                "card[track_method]": "swipe",
                "card[track]": $.trim(options.data.track)
            });

            env = options.data.public_key.split("_")[1];

            if (env === "cert") {
                gateway_url = HPS.Urls.CERT;
            } else {
                gateway_url = HPS.Urls.PROD;
            }

            // request token
            $.ajax({
                cache: false,
                url: gateway_url,
                data: params,
                dataType: "jsonp",
                success: function (response) {

                    // Request failed, handle error
                    if (typeof response.error === 'object') {
                        // call error handler if provided and valid
                        if (typeof options.error === 'function') {
                            options.error(response.error);
                        } else {
                            // handle exception
                            HPS.error(response.error.message);
                        }
                    } else if (typeof options.success === 'function') {
                        options.success(response);
                    }
                }
            });
        },

        tokenize_encrypted_card: function (options) {
            var gateway_url, params, env;

            params = $.param({
                "api_key": options.data.public_key,
                "object": "token",
                "token_type": "supt",
                "_method": "post",
                "encryptedcard[track]": $.trim(options.data.track),
                "encryptedcard[track_method]": "swipe",
                "encryptedcard[track_number]": $.trim(options.data.track_number),
                "encryptedcard[ktb]": $.trim(options.data.ktb),
                "encryptedcard[pin_block]": $.trim(options.data.pin_block)
            });

            env = options.data.public_key.split("_")[1];

            if (env === "cert") {
                gateway_url = HPS.Urls.CERT;
            } else {
                gateway_url = HPS.Urls.PROD;
            }

            // request token
            $.ajax({
                cache: false,
                url: gateway_url,
                data: params,
                dataType: "jsonp",
                success: function (response) {

                    // Request failed, handle error
                    if (typeof response.error === 'object') {
                        // call error handler if provided and valid
                        if (typeof options.error === 'function') {
                            options.error(response.error);
                        } else {
                            // handle exception
                            HPS.error(response.error.message);
                        }
                    } else if (typeof options.success === 'function') {
                        options.success(response);
                    }
                }
            });
        },

        tokenize_iframe: function (public_key) {
            var tokenValue;

            HPS.tokenize({
                data: {
                  public_key: public_key,
                  number: document.getElementById('heartland-card-number').value,
                  cvc: document.getElementById('heartland-cvv').value,
                  exp_month: document.getElementById('heartland-expiration-month').value,
                  exp_year: document.getElementById('heartland-expiration-year').value
                },
                success: function(response) {
                  window.parent.postMessage({action: "onTokenSuccess", response: response}, '*');
                },
                error: function (response) {
                  window.parent.postMessage({action: "onTokenError", response: response}, '*'); // this is untested
                }
            });
        },

        _setStyle: function (elementid, htmlstyle) {
            document.getElementById(elementid).setAttribute('style', htmlstyle);
        },

        _appendStyle: function (elementid, htmlstyle) {
            var newstyle = $('#' + elementid).attr('style') + htmlstyle;
            document.getElementById(elementid).setAttribute('style', newstyle);
        },

        _setText: function (elementid, text) {
            document.getElementById(elementid).innerHTML = text;
        },

        _setPlaceholder: function (elementid, text) {
            document.getElementById(elementid).placeholder = text;
        },

        _resizeFrame: function () {
            var docHeight = jQuery('html').height();
            window.parent.postMessage({action: "resize", height: docHeight}, '*');
        },

        _styles: {
          body: function () {
            HPS.setStyle('heartland-body',
              'margin: 0;' +
              "font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;" +
              'color: #666;'
            );
          },
          labelsAndLegend: function () {
            var ids = [
              'heartland-card-number-label',
              'heartland-expiration-date-legend',
              'heartland-expiration-month-label',
              'heartland-expiration-year-label',
              'heartland-cvv-label'
            ];
            $.each(ids, function (i) {
              HPS.setStyle(ids[i],
                'font-size: 13px;' +
                'text-transform: uppercase;' +
                'font-weight: bold;' +
                'display: block;' +
                'width: 100%;' +
                'clear: both;'
              );
            });
          },
          inputsAndSelects: function () {
            var ids = [
              'heartland-card-number',
              'heartland-expiration-month',
              'heartland-expiration-year',
              'heartland-cvv'
            ];
            $.each(ids, function (i) {
              HPS.setStyle(ids[i],
                'width: 309px;' +
                'padding: 5px;' +
                'font-size: 14px;' +
                'margin: 3px 0px 15px 0px;' +
                'border: 1px #ccc solid;' +
                /* IE10 Consumer Preview */
                'background-image: -ms-linear-gradient(bottom, #F7F7F7 0%, #EFEFEF 100%);' +
                /* Mozilla Firefox */
                'background-image: -moz-linear-gradient(bottom, #F7F7F7 0%, #EFEFEF 100%);' +
                /* Opera */
                'background-image: -o-linear-gradient(bottom, #F7F7F7 0%, #EFEFEF 100%);' +
                /* Webkit (Safari/Chrome 10) */
                'background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #F7F7F7), color-stop(1, #EFEFEF));' +
                /* Webkit (Chrome 11+) */
                'background-image: -webkit-linear-gradient(bottom, #F7F7F7 0%, #EFEFEF 100%);' +
                /* W3C Markup, IE10 Release Preview */
                'background-image: linear-gradient(to top, #F7F7F7 0%, #EFEFEF 100%);'
              );
            });
          },
          fieldset: function () {
            HPS.setStyle('heartland-expiration-date-container',
              'border: 0;' +
              'margin: 0 25px 0px 1px;' +
              'padding: 0;' +
              'width: 173px;' +
              'display: inline-block;' +
              'float:  left;'
            );
          },
          selects: function () {
            var ids = ['heartland-expiration-month', 'heartland-expiration-year'];
            $.each(ids, function (i) {
              HPS.appendStyle(ids[i],
                'border: 0;' +
                'outline: 1px solid #ccc;' +
                'height: 28px;' +
                'width: 80px;' +
                '-webkit-appearance: none;' +
                '-moz-appearance: none;' +
                '-webkit-border-radius: 0px;' +
                'background-image: url(../dropdown-arrow.png);' +
                'background-position: 65px 12px;' +
                'background-repeat: no-repeat;' +
                'background-color:  #F7F7F7;' +
                'float: left;' +
                'margin-right: 6px'
              );
            });
          },
          selectLabels: function () {
            var ids = ['heartland-expiration-month-label', 'heartland-expiration-year-label'];
            $.each(ids, function (i) {
              HPS.setStyle(ids[i],
                'position:absolute;' +
                'width:1px;' +
                'height:1px;' +
                'padding:0;' +
                'margin:-1px;' +
                'overflow:hidden;' +
                'clip:rect(0,0,0,0);' +
                'border:0;'
              );
            });
          },
          cvvContainer: function () {
            HPS.setStyle('heartland-cvv-container',
              'width: 110px;' +
              'display: inline-block;' +
              'float: left;'
            );
          },
          cvv: function () {
            HPS.appendStyle('heartland-cvv', 'width: 110px;');
          }
        },

        resizeIFrame: function (frame, height) {
            frame.style.height = (parseInt(height, 10)) + 'px';
        },

        setText: function (elementid, elementtext) {
            HPS.frame.contentWindow.postMessage({action: "setText", id: elementid, text: elementtext}, '*');
        },

        setStyle: function (elementid, elementstyle) {
            HPS.frame.contentWindow.postMessage({action: "setStyle", id: elementid, style: elementstyle}, '*');
        },

        appendStyle: function (elementid, elementstyle) {
            HPS.frame.contentWindow.postMessage({action: "appendStyle", id: elementid, style: elementstyle}, '*');
        },

        trim: function (string) {

            if (string !== undefined && typeof string === "string" ) {

                string = string.toString().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }

            return string;
        },

        empty: function (val) {
            return val === undefined || val.length === 0;
        },

        error: function (message) {
            $.error([HPS.Tag, ": ", message].join(""));
        },

        configureElement: function (options) {
            // set plugin data
            $(this).data(HPS.Tag, {
                public_key: options.public_key,
                success: options.success,
                error: options.error
            });

            // add event handler for form submission
            $(this).submit(function (e) {

                var theForm, data, i, cardType;

                // stop form from submitting
                e.preventDefault();

                // remove name attributes from sensitive fields
                $("#card_number").removeAttr("name");
                $("#card_cvc").removeAttr("name");
                $("#exp_month").removeAttr("name");
                $("#exp_year").removeAttr("name");

                theForm = $(this);

                // get data from storage
                data = theForm.data(HPS.Tag);

                // validate form - jQuery validate plugin
                if (typeof theForm.validate === 'function') {
                    theForm.validate();
                    // validation failed
                    if (!theForm.valid()) {
                        return;
                    }
                }

                var number = $.trim($("#card_number").val());
                var exp_month = $.trim($("#exp_month").val());
                var exp_year = $.trim($("#exp_year").val());

                var d = new Date();
                if (parseInt(exp_year) < d.getFullYear()) {
                    HPS.error("The expiration year is in the past.");
                    return;
                }

                HPS.tokenize({
                    data: {
                        public_key: data.public_key,
                        number: number,
                        cvc: $.trim($("#card_cvc").val()),
                        exp_month: exp_month,
                        exp_year: exp_year
                    },
                    success: function (response) {
                        // create field and append to form
                        $("<input>").attr({
                            type: "hidden",
                            id: "token_value",
                            name: "token_value",
                            value:  response.token_value
                        }).appendTo(theForm);

                        var re = {
                            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
                            mastercard: /^5[1-5][0-9]{14}$/,
                            amex: /^3[47][0-9]{13}$/,
                            diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
                            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
                            jcb: /^(?:2131|1800|35\d{3})\d{11}$/
                        };

                        if (re.visa.test(number)) {
                            cardType = 'visa';
                        } else if (re.mastercard.test(number)) {
                            cardType = 'mastercard';
                        } else if (re.amex.test(number)) {
                            cardType = 'amex';
                        } else if (re.diners.test(number)) {
                            cardType = 'diners';
                        } else if (re.discover.test(number)) {
                            cardType = 'discover';
                        } else if (re.jcb.test(number)) {
                            cardType = 'jcb';
                        }

                        $("<input>").attr({
                            type: "hidden",
                            id: "card_type",
                            name: "card_type",
                            value: cardType
                        }).appendTo(theForm);

                        $("<input>").attr({
                            type: "hidden",
                            id: "exp_month",
                            name: "exp_month",
                            value: exp_month
                        }).appendTo(theForm);

                        $("<input>").attr({
                            type: "hidden",
                            id: "exp_year",
                            name: "exp_year",
                            value: exp_year
                        }).appendTo(theForm);

                        $("<input>").attr({
                            type: "hidden",
                            id: "last_four",
                            name: "last_four",
                            value: number.slice(-4)
                        }).appendTo(theForm);

                        // success handler provided
                        if (typeof data.success === 'function') {
                            // call the handler with payload
                            if (data.success(response) === false) {
                                return; // stop processing
                            }
                        }

                        theForm.unbind('submit'); // unbind event handler
                        theForm.submit(); // submit the form
                    },
                    error: function (response) {
                        if (typeof data.error === 'function') {
                            data.error(response);
                        }
                    }
                });

            });
        },

        configureInternalIframe: function (options) {
            $(window).on("message", function (e) {
                var m = e.originalEvent;
                switch(m.data.action) {
                    case 'tokenize': {
                        HPS.tokenize_iframe(m.data.message);
                        break;
                    }
                    case 'setStyle': {
                        HPS._setStyle(m.data.id, m.data.style);
                        HPS._resizeFrame();
                        break;
                    }
                    case 'appendStyle': {
                        HPS._appendStyle(m.data.id, m.data.style);
                        HPS._resizeFrame();
                        break;
                    }
                    case 'setText': {
                        HPS._setText(m.data.id, m.data.text);
                        HPS._resizeFrame();
                        break;
                    }
                    case 'setPlaceholder': {
                        HPS._setPlaceholder(m.data.id, m.data.text);
                        break;
                    }
                }
            });
            $(window).on("load", function () {
                HPS._resizeFrame();
            });
        },

        configureIframe: function (options) {
            var useDefaultStyles = true;
            var iframe_url;
            var frame = document.createElement('iframe');

            env = options.public_key.split("_")[1];

            if (env === "cert") {
                iframe_url = HPS.Urls.iframeCERT;
            } else {
                iframe_url = HPS.Urls.iframePROD;
            }

            frame.id = 'securesubmit-iframe';
            frame.src = iframe_url;
            frame.style.border = '0';
            frame.scrolling = 'no'

            if (typeof options.useDefaultStyles !== 'undefined' && options.useDefaultStyles === false) {
                useDefaultStyles = false;
            }

            $(options.iframeTarget).append(frame);
            HPS.frame = frame;

            $(window).on("message", function (e) {
                var m = e.originalEvent;
                switch(m.data.action) {
                    case 'onTokenSuccess': {
                        options.onTokenSuccess(m.data.response);
                        break;
                    }
                    case 'onTokenError': {
                        options.onTokenError(m.data.response);
                        break;
                    }
                    case 'resize': {
                        HPS.resizeIFrame(frame, m.data.height);
                        break;
                    }
                }
            });

            $(window).on('load', function (e) {
                if (useDefaultStyles) {
                    HPS._styles.body();
                    HPS._styles.labelsAndLegend();
                    HPS._styles.inputsAndSelects();
                    HPS._styles.fieldset();
                    HPS._styles.selects();
                    HPS._styles.selectLabels();
                    HPS._styles.cvvContainer();
                    HPS._styles.cvv();
                }
            });

            $(options.buttonTarget).click(function () {
                frame.contentWindow.postMessage({action: "tokenize", message: options.publicKey}, '*');
            });
        }
    };

    $.fn.SecureSubmit = function (options) {

        return this.each(function () {
            if (!$(this).is("form") || typeof options !== 'object' || $.hasData($(this))) {
                return;
            }

            if (typeof options.type !== 'undefined' && options.type === 'iframe') {
              HPS.configureIframe.apply(this, [options]);
            } else {
              HPS.configureElement.apply(this, [options]);
            }
        });
    };

    return HPS;
}(jQuery));
