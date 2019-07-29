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
            listOptions: [],
            resultVisual: '',
            removeAddBtn: true,
            localStorege: null,
            hasError: false,
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
                if(!!item.isError){
                    this.$delete(item, 'isError');
                }
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
        saveData() {
            this.validationPropertys();
            if(!this.hasError){
                localStorage.setItem('listSelected', JSON.stringify(this.listSelected));
                this.localStorege = null;
                this.$set(this, "localStorege", JSON.stringify(this.listSelected));
            }
        },
        validationPropertys(){
            let error = false;
            this.listSelected.forEach(item => {
                if(item.name === undefined){
                    this.$set(item, 'isError', true);
                    error = true;
                } else {
                    this.$delete(item, 'isError');
                }
            });
            this.hasError = error;
        },
        discardData(){
            this.$set(this, "listSelected", JSON.parse(this.localStorege));
            this.addArrayInResultVisualBox();
            this.listSelected.forEach(item => {
                for(let i=0; i<this.listOptions.length; i++){
                    (item.name === this.listOptions[i].name) ? this.listOptions[i].visible = false : this.listOptions[i].visible = true;
                }
            });
        },
        addArrayInResultVisualBox(){
            let visualArr = JSON.parse(this.localStorege);
            visualArr.filter(item => {
                this.$delete(item, 'tempId');
                return Object.keys(item).length;
            });
            this.$set(this, "resultVisual", visualArr);
        },
    },
    computed: {
        title(){
            return this.localStorege === JSON.stringify(this.listSelected) ? 'Add' : 'Edit'
        },
        showAddButton() {
            return this.removeAddBtn = this.listSelected.length < this.config.length;
        },
        disabledSaveBtn() {
            return (this.localStorege === JSON.stringify(this.listSelected));
        },
        disabledBtn(){
            if(this.localStorege.length > 3){
                return (this.localStorege === JSON.stringify(this.listSelected));
            } else {
                return true;
            }
        }
    },

    created: function (){
        this.config.forEach(item => {
            this.listOptions.push({"name": item.name, "visible": true});
        });

        if(localStorage.getItem('listSelected')){
            this.removeAddBtn = true;

            this.localStorege = localStorage.getItem('listSelected');
            this.$set(this, "listSelected", JSON.parse(this.localStorege));

            this.addArrayInResultVisualBox();
        }
    }
});