<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TZ</title>
    <link rel="icon" href="/template/img/favicon.png" type="image/gif" sizes="16x16">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
          integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
    <link rel="stylesheet" href="/template/css/bundle.min.css">
</head>

<body>
    <template id="proper">
        <div class="row row-list">
            <div class="col-1">
                <div class="flex-center">
                    {{ count }}
                </div>
            </div>
            <div class="col-8">
                <select v-model="selected" class="form-control"
                        @change="checkSelected(selected)">
                    <option
                            v-for="(item, index) in config"
                            :key="index"
                            :value="item"
                            :disabled="disabledOption(item.name)"
                    >
                        {{ item.title }}
                    </option>
                </select>
            </div>
            <div class="col-2">
                <div class="flex-center sort-icon" @click="changeOrder">
                    <i v-if="visualOrder" :class="`fas fa-sort-amount-${typeOrder}`"></i>
                </div>
            </div>
            <div class="col-1 align-center">
                <div class="flex-center cancel-icon" @click="removeData">
                   <i class="fas fa-times"></i>
                </div>
            </div>
        </div>
    </template>
    
    
    
    <div id="app">
        <div class="wrap">
            <form>
                <div class="row">
                    <div class="col-8 offset-1">
                        <div class="title">Properties</div>
                    </div>
                    <div class="col-2">
                        <div class="title align-center">Order</div>
                    </div>
                </div>
                <section>
                    <template v-for="(item, index) in listSelected">
                        <proper
                                :config="config"
                                :options="options"
                                :key="item.tempId"
                                :count="index+1"
                                @add-selected-in-arr="addSelectedInArr(index, $event)"
                                @change-data-order="onChangeDataOrder(index, $event)"
                                @delete-row-data="onDeleteProperty(index)"
                        />
                    </template>
                </section>
                <div class="row">
                    <div class="col-6 align-right">
                        <button
                                v-if="listSelected.length < config.length"
                                class="btn btn-big btn-success btn-icon-left"
                                @click.prevent="addProperty"
                                :disabled="!isNotDisabled"
                        >
                            <i class="fas fa-plus-circle"></i>
                            Add property
                        </button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-big btn-general" @click.prevent="sort">
                            Sort
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <pre>{{ resultVisual }}</pre>
    </div>
    
    <script src="/template/js/vue.js"></script>
    <script src="/template/js/tz.js"></script>
</body>
</html>