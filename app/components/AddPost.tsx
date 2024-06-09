'use client';

import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Post } from '../types';
import styles from './AddPost.module.css';

const AddPost = ({ onAddPost }: { onAddPost: (post: Post) => void }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Сброс ошибки перед отправкой
        if (!title || !body) {
            setError('Title and Body are required');
            return;
        }
        try {
            const response = await axiosInstance.post('/posts/add', {
                title,
                body,
                userId: 1
            });
            onAddPost(response.data);
            setTitle('');
            setBody('');
            setIsOpen(false);
            alert('Post added successfully!');
        } catch (error: any) {
            setError('Failed to add post: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <>
            {isOpen ? (
                <div className={styles.addPostContainer}>
                    <div className={styles.addPostIcon} onClick={() => setIsOpen(false)}>×</div>
                    <form onSubmit={handleSubmit} className={styles.addPostForm}>
                        <input
                            type="text"
                            className={styles.addPostTitle}
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                        <textarea
                            className={styles.addPostBody}
                            placeholder="Tell your story..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit" className={styles.addPostButton}>Add Post</button>
                    </form>
                </div>
            ) : (
                <div className={styles.addPostContainer} onClick={() => setIsOpen(true)}>
                    <div className={styles.addPostIcon}>+</div>
                    <div className={styles.addPostPlaceholder}>
                        <h2 className={styles.addPostTitle}>Title</h2>
                        <p className={styles.addPostBody}>Tell your story...</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddPost;
