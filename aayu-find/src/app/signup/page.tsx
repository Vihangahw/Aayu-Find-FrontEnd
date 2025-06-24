import Input from "@/components/Input";
import Button from "@/components/Button";

export default function SignupPage() {
    return (
        <section className="flex justify-center items-center min-h-screen">
            <div className="bg-green-800 p-8 rounded shadow-lg max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                <form className="space-y-4">
                    <Input type="text" placeholder="Full Name" />
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <Button label="Sign Up" />
                </form>
            </div>
        </section>
    );
}
