import Footer from "app/layouts/footer";
import Navbar from "app/layouts/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (<>
        <header>
            <Navbar />
        </header>
        <main className="space-y-10 mb-40">
            {children}
        </main>
        <Footer />
    </>)
}