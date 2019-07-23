const proper = {
    template: '#proper',
    props: ['config', 'options', 'count'],
    data () {
        return {
            selected: '',
        }
    },
    methods: {
        disabledOption(name) {
            return (!this.options.includes(name) || this.selected.name === name);
        },
        checkSelected(obj) {
            this.$emit('add-selected-in-arr', obj);
        },
        removeData() {
            this.$emit('delete-row-data');
        },
        changeOrder() {
            this.selected.orderTypeDefault = (this.selected.orderTypeDefault === 'ASC') ? 'DESC' : 'ASC';
            this.$emit('change-data-order', this.selected);
        },

    },
    computed: {
        visualOrder() {
            return ((this.selected.orderTypeDefault === 'ASC') || (this.selected.orderTypeDefault === 'DESC'));
        },
        typeOrder() {
            return (this.selected.orderTypeDefault === 'ASC') ? 'down' : 'up';
        },
    }
};