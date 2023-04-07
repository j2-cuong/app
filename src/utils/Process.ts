export function CheckNull(data:string){
    if(typeof(data) !== 'undefined'){
        return data
    } else {
        return null;
    }
}

export function ConvertTime (data:string){
    const dateString = data;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formattedDate
}

export function ConvertNumber (data:any){
    let formattedNumber : any
    let numberValue : any
    if (typeof data === 'number') 
    {
        numberValue = data;
        formattedNumber = numberValue.toLocaleString('en-US', { style: 'decimal' });
    } else if (typeof data === 'string') {
        numberValue = Number(data);
        formattedNumber = numberValue.toLocaleString('en-US', { style: 'decimal' });
    } 
    return formattedNumber
}

export function Calculator (quantity: number, price : number, type : string){
    let json 
    let result:number;
    if(type = 'AdultNo'){
        result = quantity * price
        console.log("Đức yêu cầu log", result)
        console.log("Đức yêu cầu ltypeofog", typeof(result))

        json = {
            "_properties" : `${quantity}*${ConvertNumber(price)} = ${ConvertNumber(result)}`,
            "res" : result
        }
    }
    if(type = 'ChildNo'){
        result = quantity * price
        json = {
            "_properties" : `${quantity}*${ConvertNumber(price)} = ${ConvertNumber(result)}`,
            "res" : result
        }
    }
    if(type = 'InfantNo'){
        result = quantity * price
        json = {
            "_properties" : `${quantity}*${ConvertNumber(price)} = ${ConvertNumber(result)}`,
            "res" : result
        }
    }
    if(type = 'privateRoom'){
        result = quantity * price
        json = {
            "_properties" : `${quantity}*${ConvertNumber(price)} = ${ConvertNumber(result)}`,
            "res" : result
        }
    }
    if(type = 'visa'){
        result = quantity * price
        json = {
            "_properties" : `${quantity}*${ConvertNumber(price)} = ${ConvertNumber(result)}`,
            "res" : result
        }
    }
    if(type){
        json = {
            "_properties" : `0`,
            "result" : 0
        }
    }
    return json;
}