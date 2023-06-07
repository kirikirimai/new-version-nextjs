import React from 'react'
import styles from '../../page.module.css'
import Link from 'next/link'

const getData = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const posts = await res.json()
  return posts
}

const createPaginationLinks = async (currentPageId) => {

  const currentId = parseInt(currentPageId, 10);
  const alldata= await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await alldata.json()
  const sliceArr=posts.slice(0,10)
  const postsLen=sliceArr.length

  const currentIndex = sliceArr.findIndex(item => {
    return item.id === currentId;
  });
  
  const prev = Math.max(currentIndex - 1, 0);
  const next = Math.min(currentIndex + 1, postsLen - 1);
  const prevIndex = sliceArr[prev].id;
  const nextIndex = sliceArr[next].id;
  console.log(prevIndex, nextIndex)

  const prevFlag = prevIndex === currentId ? true : false;
  const nextFlag = nextIndex === currentId ? true : false;
  console.log(prevFlag, nextFlag)
  return {
    prevIndex,
    nextIndex,
    prevFlag,
    nextFlag
  };
}

const SinglePage = async ({ params }) => {
  const post = await getData(params.id)
  const { prevIndex, nextIndex,prevFlag,nextFlag } = await createPaginationLinks(params.id)
  return (
    <div>
      <h1 className={styles.h1ttl}>Single Page</h1>

      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        <div className={styles.pagenation} >
          <ul>
            {!prevFlag && <li><Link href={`/posts/${prevIndex}`}>PREV</Link></li>}
            {!nextFlag && <li><Link href={`/posts/${nextIndex}`}>NEXT</Link></li>}
            
          </ul>
        </div>
      </div>
    </div>


  )
}

export default SinglePage