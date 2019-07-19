Vue.component('proper', {
    template: '#proper',
    props: ['config', 'count'],
    data () {
        return {
            selected: '',
        }
    },
    methods: {
        checkSelected(obg) {
            this.$emit('add-selected-in-arr', obg);  // добавляем в список выбранный объект
        },
        removeData() {
            this.$emit('delete-row-data');
        },
        changeOrder() {
            console.log(this.selected);
            this.selected.orderTypeDefault = (this.selected.orderTypeDefault === 'ASC') ? 'DESC' : 'ASC';
            this.$emit('change-data-order', this.selected);
        }
    },
    computed: {
        visualOrder() {
            return ((this.selected.orderTypeDefault === 'ASC') || (this.selected.orderTypeDefault === 'DESC'));
        },
        typeOrder() {
            return (this.selected.orderTypeDefault === 'ASC') ? 'down' : 'up';
        }
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
            listSelected: [],
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        addProperty () {
            this.isNotDisabled = false;
            this.listSelected.push(
                {
                    "name": '',
                    "title": '',
                    "orderTypeDefault": '',
                    "priority": ''
                }
            )
        },
        addSelectedInArr(index, obg) {
            (this.listSelected[index].name === '') ? this.isNotDisabled = true : null;
            this.listSelected[index].name = obg.name;
            this.listSelected[index].title = obg.title;
            this.listSelected[index].orderTypeDefault = obg.orderTypeDefault;
            this.listSelected[index].priority = obg.priority;
        },
        onChangeDataOrder(index, obg) {
            this.listSelected[index].orderTypeDefault = obg.orderTypeDefault;
        },
        onDeleteProperty(index) {
            console.log(index);
            this.listSelected.splice(index, 1);
        }
    }
});