<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Properties Form</title>
    <link rel="stylesheet" href="static/bootstrap.min.css" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
          integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
    <link rel="stylesheet" href="/template/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/bundle.min.css">
</head>

<body>
    <template id="Property">
        <div class="row">
            <div class="col-10">
                <div class="card text-center bg-light">
                    <div class="row">
                        <div class="col-1 mt-4 mb-3">
                            {{ priority }}
                        </div>
                        <div class="col-10 mt-3 mb-3">
                            <select v-model="selected" :plain="true" class="form-control"
                                    @change="checkOnDisabled(selected)">
                                <option
                                        v-for="propertyItem in config"
                                        :key="propertyItem.name"
                                        :value="propertyItem"
                                        :disabled="$parent.selectedElements.hasOwnProperty(propertyItem.name)"
                                >
                                    <!--:disabled="hasDuplicate(propertyItem.name)"-->
                                    {{ propertyItem.title }}
                                </option>
                            </select>
                        </div>
                        <div class="col-1 mt-3 mb-3">
                            <span @click="changeOrder" v-if="order == 'ASC'">
                              <i class="fas fa-sort-amount-down sort-icon mt-1"></i>
                            </span>
                            <span @click="changeOrder" v-if="order == 'DESC'">
                              <i class="fas fa-sort-amount-up sort-icon mt-1"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="col-2 align-middle mt-4">
           <span @click="removeData">
               <i class="fas fa-times cancel-icon"></i>
           </span>
            </div>
        </div>
    </template>
    
    <div id="app">
        <div class="container">
            <form>
                <div class="row">
                    <div class="col-9">
                        <b>Properties</b>
                    </div>
                    <div class="col-3">
                        <b>Order</b>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <Property
                                v-for="(n, index) in properties"
                                :key="n.id"
                                @delete-data="onDeleteProperty(n.id)"
                                @data-info="onGetDataInfo(index, $event)"
                                :config="config"
                                :properties="properties"
                        />
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <button class="btn btn-outline-success" @click.prevent="addProperty" :disabled="!isNotDisabled">
                            <i class="fas fa-plus-circle"></i>
                            Add property
                        </button>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col offset-5">
                        <button class="btn btn-primary" @click.prevent="sort">
                            Sort
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    <script src="/template/js/vue.js"></script>
    <script src="/template/js/tz.js"></script>
</body>
</html>