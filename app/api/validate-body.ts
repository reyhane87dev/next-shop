export default function validateBody <T extends Object>(
    {
        expectedItems,
        body,
    } : {
        expectedItems : string[],
        body : T,
    }
){
    const errors : string[] = [];
    expectedItems.forEach((item)=>{
       if (!body[item]){
        errors.push(`${item} الزامی است`)
       }
    })
    return errors
}