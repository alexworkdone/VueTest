Vue.component('Property', {
    template: '#Property',
    props: ['config', 'properties'],
    data () {
        return {
            selected: {},
            order: '',
            priority: '',
            property: ''
        }
    },
    methods: {
        removeData () {
            this.$emit('delete-data')
        },
        checkOnDisabled (val) {
            this.priority = val.priority
            this.property = val.name
            this.order = val.orderTypeDefault
            this.setData()
        },
        setData () {
            this.$emit('data-info', {
                order: this.order,
                priority: this.priority,
                property: this.property,
                isChecked: true
            })
        },
        hasDuplicate (property) {
            return this.properties.some((el) => {
                return el.property === property
            })
        },
        changeOrder () {
            this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
            this.setData()
        }
    }
});

let ID = 0;
new Vue({
    el: '#app',
    data () {
        return {
            properties: [],
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
            selectedElements: {},
            isNotEmptyRow: false
        }
    },
    watch: {
        properties (newVal, oldVal) {
            this.isNotDisabled = newVal.every((item) => {
                if (item.hasOwnProperty('id')) {
                return (item.hasOwnProperty('property'))
            } else {
                return false
            }
        })  && newVal.length >= 0
        }
    },
    computed: {
        propertiesCount () {
            let count  = 0
            this.properties.forEach((item) => {
                count += item.property ? 1 : 0
        });
            return count
        }
    },
    methods: {
        addProperty () {
            this.isNotDisabled = this.propertiesCount > 0 && this.propertiesCount >= this.config.length
            this.properties.push({
                id: ++ID
            })
        },

        onDeleteProperty (id) {
            this.properties = this.properties.filter((item) => {
                return item.id !== id
            });
            this.updateSelectedElements()
        },

        onGetDataInfo (index, dateInfo) {
            this.isNotDisabled = this.propertiesCount < this.config.length - 1 ? dateInfo.isChecked : false
            Object.assign(this.properties[index], {
                'order': dateInfo.order,
                'priority': dateInfo.priority,
                'property': dateInfo.property
            });
            Vue.set(this.properties, this.properties)
            this.updateSelectedElements()
        },

        sort () {
            console.log('this.properties', this.properties)
        },
        updateSelectedElements () {
            let selectedElements = {}
            for (let i = 0; i < this.properties.length; i++) {
                if (this.properties[i].hasOwnProperty('property')) {
                    selectedElements[this.properties[i]['property']] = true
                }
            }
            this.selectedElements = selectedElements
        }
    }
});