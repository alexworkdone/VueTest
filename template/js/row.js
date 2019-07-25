const proper = {
    template: '#proper',
    props: ['itemRow', 'listOptions', 'count', 'listSelected'],
    data () {
        return {
            selected: '',
        }
    },
    methods: {
        disabledOption(i, obj) {
            return (this.itemRow.name === obj.name) ? obj.visible = false : obj.visible;
        },
        checkSelected(obj) {
            this.$emit('add-selected-in-arr', obj);
        },
        removeData() {
            this.$emit('delete-row-data');
        },
        changeOrder() {
            this.itemRow.orderTypeDefault = (this.itemRow.orderTypeDefault === 'ASC') ? 'DESC' : 'ASC';
            this.$emit('change-data-order', this.itemRow);
        },

    },
    computed: {
        visualOrder() {
            return ((this.itemRow.orderTypeDefault === 'ASC') || (this.itemRow.orderTypeDefault === 'DESC'));
        },
        typeOrder() {
            return (this.itemRow.orderTypeDefault === 'ASC') ? 'down' : 'up';
        },
    }
};