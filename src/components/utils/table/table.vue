<template>
	<div v-if="fixedHeader">
		<table class="w-table">
			<slot name="header"></slot>
		</table>
	</div>
	<div :style="bodyStyle">
		<table class="w-table">
			<slot v-if="!fixedHeader" name="header"></slot>
			<slot></slot>
		</table>
	</div>
</template>

<script>
export default {
    name: 'w-table',
    props: {
        fixedHeader: { type: Boolean, default: true },
        height: { type: String },
        enableSelectAll: { type: Boolean, default: false }, //默认不打开全选
        allRowsSelected: { type: Boolean, default: false }, //所有行都被选择
        multiSelectable: { type: Boolean, default: false }, //默认非多选
        selectable: { type: Boolean, default: true }, //默认可选
        showCheckbox: { type: Boolean, default: true } //显示checkbox
    },
    data: () => ({
        isSelectAll: false
    }),
    computed: {
        bodyStyle() {
            return {
                overflow: 'auto',
                height: this.height
            }
        }
    },
    mounted() {
        if (this.allRowsSelected) {
            this.selectAll() //如果设置所有行都被选则调用这个函数
        }
    },
    methods: {
        handleRowClick(index, tr) {
            this.$emit('rowClick', index, tr)
        },
        handleRowHover(index, tr) {
            this.$emit('rowHover', index, tr)
            this.$emit('row-hover', index, tr)
        },
        handleRowHoverExit(index, tr) {
            this.$emit('rowHoverExit', index, tr)
            this.$emit('row-hover-exit', index, tr)
        },
        handleRowSelect(selectedRows) {
            this.$emit('rowSelection', selectedRows)
            this.$emit('row-selection', selectedRows)
        },
        handleCellClick(rowIndex, columnName, td, tr) {
            this.$emit('cellClick', rowIndex, columnName, td, tr)
            this.$emit('cell-click', rowIndex, columnName, td, tr)
        },
        handleCellHover(rowIndex, columnName, td, tr) {
            this.$emit('cellHover', rowIndex, columnName, td, tr)
            this.$emit('cell-hover', rowIndex, columnName, td, tr)
        },
        handleCellHoverExit(rowIndex, columnName, td, tr) {
            this.$emit('cellHoverExit', rowIndex, columnName, td, tr)
            this.$emit('cell-hover-exit', rowIndex, columnName, td, tr)
        },
        changeSelectAll(isSelectAll) {
            this.isSelectAll = isSelectAll
        },
        selectAll() {
            const tbody = this.getTbody()
            if (tbody) tbody.unSelectAll()
        },
        unSelectAll() {
            const tbody = this.getTbody()
            if (tbody) tbody.unSelectAll()
        },
        getTbody() {
            for (let i = 0; i < this.$children.length; i++) {
                const childItem = this.$children[i]
                if (childItem.isTbody) return childItem
            }
        }
    },
    watch: {
        allRowsSelected(newValue, oldValue) {
            if (newValue === oldValue) return
            if (newValue) {
                this.selectAll()
            } else {
                this.unSelectAll()
            }
        }
    }
}

</script>

<style lang="sass" rel="stylesheet/scss">
	.w-table {
	    width: 100%;
	    padding: 0 24px;
	    table-layout: fixed;
	    border-spacing: 0;
	    border-collapse: collapse;
	    background-color: #101;
	}
</style>