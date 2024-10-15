import { computed, reactive, ref, toRef, watch } from "vue"

const useCheckbox = (data,field)=>{
    const selectorkey= ref(null)
    const selected = reactive({items:[]})
    const partial = ref(false)

    const deselectAll = ()=>{
        selected.items = []
    }

    const checkAll = ()=>{
        partial.value = false
        return data.value.map(item=>{
            selected.items.push(item[field.value]);
        })
    }

    watch(selectorkey, (newValue, oldValue) => {
            if(newValue){
                deselectAll()
                checkAll()
            }
            else if(!partial.value){
                deselectAll()
            }
        }
    )

    watch(()=>selected.items, (newValue, oldValue) => {
            if(selectorkey.value && selected.items.length<data.value.length){
                partial.value=true
                selectorkey.value =null
            }
        },
        {
            deep:true
        }
    )

    const selectedItemCount = computed(()=>{
        return selected.items.length
    })

    return {
        selectorkey,
        selected,
        deselectAll,
        selectedItemCount
    }

}

export default useCheckbox
