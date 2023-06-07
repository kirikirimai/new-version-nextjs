import Link from "next/link"
import styles from '../page.module.css'

const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await res.json()
    return posts
}


const PostsList = async () => {
    const posts = await getData()
    return (
        <div>

            {posts.slice(0, 5).map((post) => {
                return (
                    <>
                        <div className={styles.list} key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </Link>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default PostsList;