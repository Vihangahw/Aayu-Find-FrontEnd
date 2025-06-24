import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LoginPage() {
    return (
        <section className="flex justify-center items-center min-h-screen">
            <div className="bg-green-700 p-8 rounded shadow-lg max-w-sm">
                <h1 className="text-2xl text-center font-bold mb-4">Login</h1>
                <form className="space-y-4">
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <Button label="Login" />
                </form>
            </div>
        </section>
    );
}
