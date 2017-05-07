var income = (function() {
    return {
        initialDayOfDeposit: 19,
        outputMoney : 0,
        init: function() {
            this.percentPerYear = 14;
        },
        calculateMoneyPerMonth: function(fullSum) {
            return (fullSum * this.percentPerYear / 100) / 12;
        },
        calculateFullIncome: function(fullSum, countOfSaveMonth) {
            fullSum = Number(fullSum);
            if (countOfSaveMonth < 1) {
                this.outputMoney = fullSum;
                return fullSum;
            }
            fullSum += this.calculateMoneyPerMonth(fullSum);
            this.calculateFullIncome(fullSum, --countOfSaveMonth);
        },
        calculateFullMonths: function(initialDate, returnDate) {
            // setup correct initial date according to the open deposit date
            if (initialDate.getDate() > income.initialDayOfDeposit ) {
                initialDate.setMonth(initialDate.getMonth() + 1);
            }
    
            // calculate full months
            if (returnDate.getDate() < income.initialDayOfDeposit ) {
                returnDate.setMonth(returnDate.getMonth() - 1);
            }
            var fullMonths = returnDate.getMonth() - initialDate.getMonth();
            return fullMonths;
        }
    };
}());

$( document ).ready(function() {
    income.init();
    $( "#put-money" ).click(function() {
        income.outputMoney = 0;
        var userName = $('#user-name').val();
        var moneySum = Number($('#input_deposit').val());
        var initialDate = new Date( $('#initial-payment-date').val() );
        var returnDate = new Date( $('#return-deposit-date').val() );

        // calculate full income after additional payments
        $(".additional-payment").each(function() {
            var additionalPayment = Number($(this).find(".additional-payment-sum").val());
            var additionalPaymentDate = new Date( $(this).find(".additional-payment-date").val() );

            var differencesBetweenMonths = income.calculateFullMonths(initialDate, additionalPaymentDate);
            initialDate = additionalPaymentDate;
            income.outputMoney = income.outputMoney || moneySum;
            income.calculateFullIncome(income.outputMoney, differencesBetweenMonths);
            income.outputMoney += additionalPayment;
        });

        income.outputMoney = income.outputMoney || moneySum;
        var differencesBetweenMonths = income.calculateFullMonths(initialDate, returnDate);
        income.calculateFullIncome(income.outputMoney, differencesBetweenMonths);
        var wholeIncome = Math.floor(income.outputMoney);
        alert( "Hi " + userName + ", your income is " + wholeIncome );
    });

    $( "#add_money" ).click(function() {
        var calculateDepositBlock = $('#calculate-deposit-block');
        var moneyBlock =
             '<div class="form-group additional-payment">' +
                 '<input type="text" class="form-control additional-payment-sum" value="1500">' +
                 '<input type="date" class="form-control additional-payment-date" value="2017-07-07"' +
             '</div>';
        calculateDepositBlock.append(moneyBlock);
    });

});



