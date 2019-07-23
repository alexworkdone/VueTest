new Vue({
    el: '#app',
    components: {
        'proper-item': proper
    },
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
            resultVisualTrue: false,
            options: [],
            resultVisual: '',
        }
    },
    methods: {
        addProperty () {
            this.isNotDisabled = false;
            this.listSelected.push(
                {
                    "tempId": Date.now(),
                }
            );
        },
        addSelectedInArr(index, obj) {
            this.$set(this.listSelected, index, { ...this.listSelected[index], ...obj });
            this.changeArr();
            this.isNotDisabled = true;
            this.$set(this.options, index, obj.name);
        },
        onChangeDataOrder(index, obj) {
            this.$set(this.listSelected, index, {
                ...this.listSelected[index],
                orderTypeDefault: obj.orderTypeDefault,
            });
            this.changeArr();
        },
        changeArr(){
            const arr = JSON.parse(JSON.stringify(this.listSelected));
            this.resultVisual = arr.filter(item => {
                this.$delete(item, 'tempId');
                return Object.keys(item).length;
            });
        },
        onDeleteProperty(index, obj) {
            if(this.listSelected[index].name === undefined){
                this.isNotDisabled = true;
            }
            this.listSelected.splice(index, 1);
            this.changeArr();
            //this.options[index] = obj.name;
            this.options.splice(index, 1);
            console.log(this.options);
        },
        sort() {
            this.resultVisualTrue = !this.resultVisualTrue;
        },
    },
    computed: {
        showAddButton() {
            return this.listSelected.length < this.config.length;
        },
    },
});