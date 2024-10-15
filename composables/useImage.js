import { ref } from 'vue'

export default function(){
    const url = ref()
    const image = ref()
    let multiple =ref([])

    const process = (file) => {
        url.value = null
        // console.log(file, 'insert')
        image.value = file
        const reader = new FileReader()
        reader.onload = (e) => {
            url.value = e.target.result

            multiple.value.push(e.target.result)
            // console.log(multiple)
        }
        reader.readAsDataURL(file)
        
    }

    const empty = () => {
        image.value = null;
        url.value = null 
        multiple.value = []

        console.log(image.value, url.value, multiple.value)
    }

    const resetFiles = (file) => {
        
        url.value = file
        multiple.value.push(file)
        // console.log(url.value, multiple)
    }

    return {
        multiple,
        url,
        image,
        process,
        empty,
        resetFiles
    }
}
