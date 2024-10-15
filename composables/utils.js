export const capitalizeFirstWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const intToArrayConvert = (value) => {
    const array = []

    for(let i in value) {
        array.push(i)
    }

    return array
}

export const proxyToArrayConvert = (value) => {
    return JSON.parse(JSON.stringify(value))
}

export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const format = new Date(date).toDateString()

    return format.slice(4, 10) + ',' + format.slice(10, format.length)
}


export const extractNoOfSelected = (obj) => {
    console.log(obj)
    let total = 0
    Object.values(obj).map((val) =>{
        if (val) {
            total++
        }
    })
    return total
}



export const extractSelectedItemsObj = (selectedItem, allItems) => {

    let all = []
    Object.keys(selectedItem).map((key) =>{
        
        if (selectedItem[key]) {
            
            all.push(allItems[key])
        }
    })

    return all
}


export function convertTo12HourFormat(timeString) {
    const timeParts = timeString.split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const seconds = timeParts[2];
  
    const timeSuffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
  
    return `${hours}:${minutes}:${seconds} ${timeSuffix}`;
  }