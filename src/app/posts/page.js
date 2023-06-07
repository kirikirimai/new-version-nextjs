
import PostsList from "./postlist"
import styles from '../page.module.css'

const Posts = () => {
  return (
    <div>
        <h1 className={styles.h1ttl}>Posts</h1>
        <p>Jsonデータを取得してみる。</p>
        <PostsList />
    </div>
  )
}

export default Posts