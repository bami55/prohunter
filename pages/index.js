import Head from 'next/head';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import styles from '../styles/Posts.module.css';

export default function Home() {
  const [token, setToken] = useState();
  const [posts, setPosts] = useState([]);

  const getToken = async () => {
    const d = await fetch('/api/token');
    const data = await d.json();
    setToken(data.token);
  };

  const getPosts = async () => {
    if (!token) {
      setPosts([]);
      return;
    }
    const d = await fetch(`/api/post?token=${token}`);
    const data = await d.json();
    if (d.ok) {
      setPosts(data.posts);
    } else {
      setPosts([]);
      alert(data.error);
    }
  };

  const load = async () => {
    if (posts.length === 0) {
      await getToken();
      await getPosts();
    }
  };

  useEffect(() => {
    load();
  });

  return (
    <>
      <Head>
        <title>Pro hunter</title>
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>
          {posts.length > 0 && `Product Hunt Weekly Top ${posts.length}`}
        </h1>
        <div className={styles.grid}>
          {posts && posts.map((post) => <Card node={post.node} key={post.node.id} />)}
        </div>
      </div>
    </>
  );
}
