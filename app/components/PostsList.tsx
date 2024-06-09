'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '../axiosInstance';
import { Post } from '../types';
import AddPost from './AddPost';
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import styles from './PostsList.module.css';
import { useTheme } from '../context/ThemeContext';

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const { theme } = useTheme();

    const fetchPosts = async () => {
        try {
            const response = await axiosInstance.get('/posts');
            const postsData = response.data.posts;
            setPosts(postsData);
            localStorage.setItem('posts', JSON.stringify(postsData));
        } catch (error) {
            console.error('Ошибка при загрузке постов:', error);
        }
    };

    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        } else {
            fetchPosts();
        }
    }, []);

    const handleAddPost = (post: Post) => {
        const updatedPosts = [...posts, post];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const handleUpdatePost = (updatedPost: Post) => {
        const updatedPosts = posts.map(post => post.id === updatedPost.id ? updatedPost : post);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setEditingPostId(null);
    };

    const handleDeletePost = (id: number) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <div className={`${styles.container} ${theme === 'dark' ? 'dark' : 'light'}`}>
            <AddPost onAddPost={handleAddPost} />
            {posts.map((post) => (
                <div key={post.id} className={styles.post}>
                    <div className={styles.postHeader}>
                        <h2 className="postTitle">{post.title}</h2>
                        <p>{post.body.substring(0, 100)}</p>
                    </div>
                    {/* <div className={styles.postAuthor}>
                        <img src="https://via.placeholder.com/50" alt="Author" />
                        <div>
                            <span className={styles.postAuthorName}>{post.user?.name || 'Author Name'}</span>
                        </div>
                    </div> */}
                    <div className={styles.postBody}>
                        {post.body}
                    </div>
                    <div className={styles.postFooter}>
                        <div>
                            <Link href={`/posts/${post.id}`}>Подробнее</Link>
                        </div>
                        <div>
                            <DeletePost id={post.id} onPostDeleted={handleDeletePost} />
                            <UpdatePost id={post.id} currentTitle={post.title} currentBody={post.body} onPostUpdated={handleUpdatePost} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostsList;
