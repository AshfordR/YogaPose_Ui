import Link from "next/link";
import Image from 'next/image';
import styles from './NotFound.module.css'; // Import your CSS module

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Page Not Found</h2>
            <p className={styles.message}>Oops! Looks like the page you're looking for doesn't exist.</p>
            <Image 
                src="/Images/notfound.gif" // Make sure this path is correct
                alt="Page not found" 
                className={styles.gif} 
                width={500} // Set appropriate width
                height={300} // Set appropriate height
                priority // Load the image with high priority if it's crucial for the user experience
            />
            <Link href="/Home">
                <span className={styles.link}>Return Home</span>
            </Link>
        </div>
    );
}
