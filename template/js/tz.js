Vue.component('proper', {
    template: '#proper',
    props: ['config', 'count'],
    data () {
        return {
            selected: ''
        }
    },
    methods: {
        checkSelected(obg) {
            this.$emit('add-selected-in-arr', obg.name);  // добавляем в список выбранный елемент 'name'
            this.$emit('show-add-btn');  // включаем кнопку для добавления нового поля
            this.setData();
        },
        setData () {

        },
        removeData() {
            this.$emit('delete-row-data');
        },
        changeOrder() {
            this.selected.orderTypeDefault = (this.selected.orderTypeDefault === 'ASC') ? 'DESC' : 'ASC';

        }
    },
    computed: {

    }
});


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
            listSelected: [],
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        addProperty () {
            this.countRow++;
            this.isNotDisabled = false;
        },
        addSelectedInArr(index, name) {
            this.listSelected[index] = name;
            console.log(this.listSelected);
        },

    }
});