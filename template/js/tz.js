Vue.component('Property', {
    template: '#Property',
    props: ['config', 'counter'],
    data () {
        return {
            selected: {},
            order: '',
            priority: '',
            property: '',
        }
    },
    methods: {

    }
});

let ID = 0;
new Vue({
    el: '#app',
    data () {
        return {
            config: [{
                "name": "affiliate",
                "title": "Affiliate",
                "orderTypeDefault": "ASC",
                "priority": 1
            }, {
                "name": "balance",
                "title": "Balance",
                "orderTypeDefault": "DESC",
                "priority": 2
            }, {
                "name": "bonus_balance",
                "title": "Bonus balance",
                "orderTypeDefault": "DESC",
                "priority": 3
            }, {
                "name": "campaign",
                "title": "Campaign",
                "orderTypeDefault": "ASC",
                "priority": 4
            }, {
                "name": "cash_balance",
                "title": "Cash balance",
                "orderTypeDefault": "DESC",
                "priority": 5
            }, {
                "name": "country",
                "title": "Country",
                "orderTypeDefault": "ASC",
                "priority": 6
            }, {
                "name": "trader_points",
                "title": "Trader points",
                "orderTypeDefault": "DESC",
                "priority": 7
            }],
            isNotDisabled: true,
            countRow: 0,
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        addProperty () {
            //this.isNotDisabled = false;
            this.countRow++;
        },

    }
});