<template>
    <div class="my-container">
        <div class="title-wrapper">
            <div class="title">Ranges</div>
            <div class="border-bottom-title"> </div>
        </div>
        <div class="form">
            <div class="form-section">
                <div class="form-title">
                    Usage Intensity
                </div>
                <div class="form-body">
                    <div v-for="t in intensityTypes" 
                        @click="setIntensity(t)"
                        :key="t.fields.value" 
                        class="option" 
                        :class="{selected: intensityValue == t.fields.value}"
                    >
                        <div class="circle"></div>
                        <div class="option-name" v-show="!t.fields.name.includes('-')">
                            {{ t.fields.name }}
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="form-section">
                <div class="form-title">
                    Transport Distance
                </div>
                <div class="form-body">
                    <div v-for="t in distanceTypes" 
                        @click="setDistance(t)"
                        :key="t.fields.value" 
                        class="option" 
                        :class="{selected: distanceValue == t.fields.value}"
                    >
                        <div class="circle"></div>
                        <div class="option-name" v-show="!t.fields.name.includes('-')">
                            {{ t.fields.name }}
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="form-section">
                <div class="form-title">
                    Load Capacity
                </div>
                <input type="range" 
                       id="capacity" 
                       name="capacity" 
                       :min="capacityObj.from" 
                       :max="capacityObj.to" 
                       v-model="capacityValue"
                       data-toggle="tooltip" 
                       data-placement="top" 
                       :title="capacityValue"
                >
                <div class="weights">
                    <div class="fromTo">
                        {{ capacityObj.from }} {{ " " }} kg
                    </div>
                    <span>-</span>
                    <div class="fromTo">
                        {{ capacityObj.to }} {{ " " }} kg
                    </div>
                </div>
            </div>
        </div>
        <div class="filters">
            <div v-if="intensityValue > 0" class="filter">
               <span>Usage Intensity: {{ intensityValueName }}</span> 
               <img src="../assets/imgs/close.png" alt="remove filter" @click="clearIntensity">
            </div>
            <div v-if="distanceValue > 0" class="filter">
               <span>Transport Distance: {{ distanceValueName }}</span> 
               <img src="../assets/imgs/close.png" alt="remove filter" @click="clearDistance">
            </div>
            <div v-if="capacityValue > 0" class="filter">
               <span>Load Capacity: {{ capacityValue }} Kg</span> 
               <img src="../assets/imgs/close.png" alt="remove filter" @click="clearCapacity">
            </div>
        </div>
        <div class="products">
            <div v-for="p in filteredProducts" :key="p.id" class="product">
                <img :src="p.featured_image" :alt="p.name" class="product-img">
                <div class="product-details">
                    <div class="product-name">{{ p.name }}</div>
                    <div class="product-code">{{ p.code }}</div>
                    <div class="product-capacity">
                        CAPACITY: <span>{{ parseInt( p.numericTypes[0].value) }} Kg</span>
                    </div>
                </div>
                <a href="" class="link-button product-link">View Product</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Container',
    data () {
        return {
            allProducts: [],
            intensityTypes: [],
            intensityValue: 0,
            intensityValueName: '',
            distanceTypes: [],
            distanceValue: 0,
            distanceValueName: '',
            capacityObj: {},
            capacityValue: 0,
        }  
    },
    mounted(){
        fetch('https://api-forklift.code95.info/v1/products/filters')
            .then(res => res.json())
            .then(res => {
                const intensity = res.data["Select-Type"].filter(obj => obj.name.toLowerCase().includes('intensity'))[0]
                this.intensityTypes = [...intensity.values]
                const distance = res.data["Select-Type"].filter(obj => obj.name.toLowerCase().includes('distance'))[0]
                this.distanceTypes = [...distance.values]
                this.capacityObj = res.data["Numeric-Type"][0]
            }).catch(err => console.log(err))

        fetch('https://api-forklift.code95.info/v1/products/getJson')
            .then(res => res.json())
            .then(res => {
                console.log(res.data)
                this.allProducts = res.data
            })
    },
    methods: {
        setIntensity (obj) {
            this.intensityValue = obj.fields.value
            this.intensityValueName = obj.fields.name
        },
        setDistance (obj) {
            this.distanceValue = obj.fields.value
            this.distanceValueName = obj.fields.name
        },
        clearIntensity () {
            this.intensityValue = 0
            this.intensityValueName = ''
        },
        clearDistance () {
            this.distanceValue = 0
            this.distanceValueName = ''
        },
        clearCapacity () {
            this.capacityValue = 0

        },
        
    },
    computed: {
        filteredProducts () {
            let products = [...this.allProducts]
            console.log(this.intensityValue , this.distanceValue, this.capacityValue)
            if (this.intensityValue > 0 && products) {
                products =  products.filter(p => {
                    const intensity = p["selectTypes"].filter(obj => obj.name.toLowerCase().includes('intensity'))[0]
                    return Number(intensity.values.value) == this.intensityValue
                })
            }
            if (this.distanceValue > 0 && products) {
                products =  products.filter(p => {
                    const distance = p["selectTypes"].filter(obj => obj.name.toLowerCase().includes('distance'))[0]
                    return Number(distance.values.value) == this.distanceValue
                })
            }
            if (this.capacityValue > 0 && products) {
                products =  products.filter(p => Number(p["numericTypes"][0].value) >= this.capacityValue)
            }
            console.log('pppp',products)
            return products
        }
    }
}
</script>
<style>
    .my-container{
        padding: 100px 60px;
        color: black;
        font-family: 'Inter';
        display: flex;
        flex-direction: column;
        gap: 30px;
        min-width: 100%;
    }
    .title-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: fit-content;
        margin: 0 auto;
    }
    .title{
        text-transform: uppercase;
        position: relative;
        font-weight: 700;
        font-size: 32px;
    }
    .border-bottom-title{
        width: 50%;
        height: 5px;
        margin: 0;
    }
    .form{
        display: flex;
        gap: 20px;
        justify-content: flex-start;
        width: 100%;
    }
    .form-section{
        
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 30px;
        padding: 20px;
    }
    .form-title{
        font-weight: 400;
        font-size: 14px;
    }
    .form-body{
        display: flex;
        gap: 30px;
        position: relative;
        z-index: 1;
    }
    .option{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        width: 40px;
        cursor: pointer;
    }
    .weights{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .fromTo{
        border-radius: 5px;
        border: 1px solid black;
        padding: 8px 10px;
        font-size: 14px;
        width: 100px;
        text-align: left;
    }
</style>