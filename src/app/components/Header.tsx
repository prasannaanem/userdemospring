// components/Header.tsx
import Link from 'next/link';

const Header = () => {
    return (
        <header className="sticky top-0 bg-white shadow-md z-50">
            <nav className="container mx-auto p-4 flex justify-between items-center">
                <ul className="flex space-x-6">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contactus">Contact Us</Link></li>
                    <li><Link href="/users">Users</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
