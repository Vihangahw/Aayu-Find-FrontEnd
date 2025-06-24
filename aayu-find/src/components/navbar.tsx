import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-green-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/assets/images/aayu-find.png" // Adjust the path
                        alt="Aayu Find Logo"
                        width={150} // Adjust the size
                        height={50}
                        className="cursor-pointer"
                    />
                </Link>
                <div className="flex space-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/plants">Plants</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/signup">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
}
