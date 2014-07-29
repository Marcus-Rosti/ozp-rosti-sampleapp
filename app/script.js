(function () {

    var app = angular.module('appManager', []);

    app.controller("TabController", function () {
        this.cpTab = 1;
        this.ghTab = 1;

        this.isCPSet = function (checkTab) {
            return this.cpTab === checkTab;
        };

        this.isGHSet = function (checkTab) {
            return this.ghTab === checkTab;
        };

        this.setCPTab = function (setTab) {
            this.cpTab = setTab;
            console.log(this.cpTab);
        };

        this.setGHTab = function (setTab) {
            this.ghTab = setTab;
            console.log(this.ghTab);
        };
    });

    app.controller("DataController", function () {

        this.data = {
            optionType: 'c',
            stock: 100,
            strike: 94,
            volatility: .27,
            timeToExpiry: 25,
            interestRate: .0001,
            numberOfOptions: 10
        };

        this.greekData = {
            optionValue: 0,
            delta: 0,
            gamma: 0,
            theta: 0,
            rho: 0,
            vega: 0
        };

        this.neutralData = {
            deltaNeutral: 0,
            gammaDNeutral: 0
        };

        this.calculate = function () {
            var time = this.data.timeToExpiry / 365;

            this.greekData.optionValue = BlackScholes(this.data.optionType, this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);

            if (this.data.optionType == 'c') {
                this.greekData.delta = deltaCall(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
                this.greekData.gamma = gammaCall(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
                this.greekData.theta = thetaCall(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
                this.greekData.rho = rhoCall(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
                this.greekData.vega = vegaCall(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
            } else {
                this.greekData.delta = deltaPut(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
                this.greekData.gamma = gammaPut(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
                this.greekData.theta = thetaPut(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
                this.greekData.rho = rhoPut(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
                this.greekData.vega = vegaPut(this.data.stock, this.data.strike, time, this.data.interestRate, this.data.volatility);
            }
        };

    });

})();

