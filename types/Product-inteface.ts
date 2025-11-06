export default interface ProductInterface {
    title : string
    price : number
    images : string[]
    _id : string
    category : string
    properties : {key : string,value : string}[]
    description : string
    count : number
}