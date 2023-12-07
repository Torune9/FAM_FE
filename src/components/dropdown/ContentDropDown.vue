<template>
    <Transition name="item">
        <main v-if="active" class="absolute z-10 right-[20%] top-6">
            <ItemDropDown>
                <ul>
                    <li :id="item.id" class=" border-b p-1 cursor-pointer" v-for="item,i of items" :key="i" @click="item.method($event)">
                        {{ item.menu }}
                    </li>
                </ul>
            </ItemDropDown>
        </main>
    </Transition>
</template>
<script setup>
import { inject , watchEffect ,ref} from 'vue'
import ItemDropDown from './ItemDropDown.vue'

const active = inject('isActive')
const props = defineProps({
    datas : {
        type : Object,
        default : ()=>{}
    },
})
const role = ref(false)

const emits = defineEmits(['showRoleModal'])
const items = [
    {
        menu : 'Change Role Account',
        id : 1,
        method : function (event) {
        emits('showRoleModal',event)
        }
    },
    {
        menu : '',
        id : 2,
        method : function(event) {
            emits('showRoleModal',event)
        }
    },
    {
        menu : 'Reset Password',
        id : 3,
        method :function (event) {
            emits('showRoleModal',event)
        }
    }
]

watchEffect(()=>{
    role.value = props.datas[0].active
    role.value == true ? items[1].menu = 'Deactivated Account' :  items[1].menu = 'Activated Account'
    
})  

</script>
<style scoped>
.item-enter-active {
    transition: all 0.2s;
}

.item-leave-active {
    transition: all 0.2s;
}

.item-enter-from {
    transform: translateY(-5px);
}

.item-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>