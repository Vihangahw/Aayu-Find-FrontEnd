import Navbar from "@/components/navbar"
import Footer from "@/components/footer";
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen"
        suppressHydrationWarning >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
