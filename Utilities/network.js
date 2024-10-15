import { $fetch, FetchError } from "ofetch";

export const api = () => {
    const { baseUrl } = useRuntimeConfig().public;
    return baseUrl;
  };
  

export const  networkPost = async({method , path ,heads , body }) => {
    var errorMessage = "";
    var response;
    var errors= [];
    let flag = 200;
    await $fetch(path, {
        method: method,
        baseURL: api(),
        headers: heads,
        body:body
    }).then((res)=>{
        // console.log(res);
        response = res;
    }).catch((error)=>{
        
        // console.log(error);
        flag = 422;
        errorMessage = error.response._data.message;
        errors = error.response._data.errors;
    });

    if(flag == 422){
        return {
            'status' : 422,
            'errors': errors,
            'message': errorMessage,
        }
    }else{
        return {
            'status' : 200,
            'res': response,
            'message': "Network Responded Successfully",
        }
    }
}
export const  networkGet = async({method , path ,heads }) => {
    var errorMessage = "Error Internal";
    var response;
    var errors= [];
    let flag = 200;
    await $fetch(path, {
        method: method,
        baseURL: api(),
        headers: heads,
        
    }).then((res)=>{
        response = res;
    }).catch((error)=>{
        flag = 422;
        errors = error;
    });
    if(flag == 422){
        return {
            'status' : 422,
            'errors': errors,
            'message': errorMessage,
        }
    }else{
        return {
            'status' : 200,
            'res': response,
            'message': "Network Responded Successfully",
        }
    }
}
export const  networkDownload = async({method , path ,heads , fileName }) => {
    var errorMessage = "Error Internal";
    var response;
    var errors= [];
    let flag = 200;
    await $fetch(path, {
        method: method,
        baseURL: api(),
        headers: heads,
        
    }).then((res)=>{
        response = res;
    }).catch((error)=>{
        flag = 422;
        errors = error;
    });
    if(flag == 422){
        return {
            'status' : 422,
            'errors': errors,
            'message': errorMessage,
        }
    }else{
        // console.log(response);
          const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName+'.xlsx');
            document.body.appendChild(link);
            link.click();
    }
}

export const  networkImage = (imagePath)=>{
    return baseUrl+'/storage/'+imagePath;
}
