import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Posts.module.css';

export default function Home() {
  const [token, setToken] = useState();
  const [posts, setPosts] = useState([]);

  const getToken = async () => {
    const d = await fetch("/api/token");
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
    <div className={styles.container}>
      <h1 className={styles.title}>Product Hunt Weekly Top {posts.length}</h1>
      <div className={styles.grid}>
        {posts && posts.map(post => {
          return (
            <div className={styles.holder} key={post.node.id}>
              <div className={styles.card}>
                <div className={styles.votes}>{post.node.votesCount}</div>
                <Image src={post.node.thumbnail.url} alt={post.node.name} width={200} height={150} />
                <div>{post.node.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
