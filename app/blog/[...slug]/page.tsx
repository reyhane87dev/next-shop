async function generateStaticParams(){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    const ids = posts.map((blog : {id : number})=>{
        return { slug : blog.id.toString() }
    })
    return ids
}

export default async function PostDetail({params} : {params : {slug : string[]}}){
   const {slug} = await params;
   const [blogId] = slug;
   if(slug.length == 1){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`);
    const blog = await response.json();
    return (
        <div>
            {
                blog ? (
                    <div>
                        <div>{blog.title}</div>
                        <div>{blog.body}</div>
                    </div>
                ) : (
                    <div>
                        blog not found
                    </div>
                )
            }
        </div>
    )
   }
}