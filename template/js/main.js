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
            listOptions: [],
            resultVisual: '',
            removeAddBtn: true,
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
        addSelectedInArr(index, name) {
            this.config.forEach(item => {
                if (item.name === name) {
                    this.$set(this.listSelected, index, {...this.listSelected[index], ...item});
                }
            });
            this.listOptions.forEach( item => item.visible = true );
            this.changeArr();
            this.isNotDisabled = true;
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
            let arrMas = Object.values(arr);
            this.resultVisual = arrMas.filter(item => {
                this.$delete(item, 'tempId');
                return Object.keys(item).length;
            });
        },
        onDeleteProperty(index) {
            if(this.listSelected[index].name === undefined){
                this.isNotDisabled = true;
            }
            this.listSelected.splice(index, 1);
            this.listOptions.forEach( item => item.visible = true );
            this.changeArr();
        },
        sort() {
            this.resultVisualTrue = !this.resultVisualTrue;
            //let listAr = Object.values(parseObj);
            console.log(this.listSelected);
            localStorage.setItem('listSelected', JSON.stringify(this.listSelected));
            console.log(localStorage.getItem('listSelected'));
        },
    },
    computed: {
        showAddButton() {
            return this.removeAddBtn = this.listSelected.length < this.config.length;
        },
    },
    created: function (){
        this.config.forEach(item => {
            this.listOptions.push({"name": item.name, "visible": true});
        });

        if(localStorage.getItem('listSelected')){
            this.resultVisualTrue = true;
            this.removeAddBtn = true;

            let parseObj = JSON.parse(localStorage.getItem('listSelected'));
            this.$set(this, "listSelected", parseObj);

            let visualArr = JSON.parse(localStorage.getItem('listSelected'));
            visualArr.filter(item => {
                this.$delete(item, 'tempId');
                return Object.keys(item).length;
            });
            this.$set(this, "resultVisual", visualArr);
        }
    }
});