
async function getUser(){
    const data = await fetch('');
    if (!data.ok) return {
        error : 'failed to fetch data'
    };

    const user : {name : string} = await data.json()

    return {
        error : '',
        user,
    };
}



export default async function UserCart(){
    
    const data = await getUser();
    
    if (data.error){
        return (
            <div>
                {data.error}
            </div>
        );
    }
    else {
        return (
            <div>
                {data.user?.name}
            </div>
        )
    }
}