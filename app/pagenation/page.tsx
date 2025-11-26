import Link from "next/link";


const users = [
    {
        name : "reyhane1",
        id : 1,
    },
    {
        name : "reyhane2",
        id : 2,
    },
    {
        name : "reyhane3",
        id : 3,
    },
    {
        name : "reyhane4",
        id : 4,
    },
    {
        name : 'reyhane5',
        id : 5
    },
    {
        name : "reyhane6",
        id : 6
    }
];

const itemPerPage = 2;


export default function Page({searchParams} : {searchParams : {page : string}}){

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const startIndex = itemPerPage * page - itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const selectedItems = users.slice(startIndex,endIndex);
    
    return (
        <div>
            <ul>
                {
                    selectedItems.map((item,index)=>{
                        return <li key={index} >
                            {item.name}
                        </li>
                    })
                }
            </ul>
            <div>
                <div>
                    <button>
                        <Link href={`/pagenation?page=${page+1}`} >next</Link>
                    </button>
                    <button>
                        <Link href={`/pagenation?page=${page-1}`} >
                            prev
                        </Link>
                    </button>
                </div>
                <div>
                    {page} of {users.length / itemPerPage}
                </div>
            </div>
        </div>
    )
}