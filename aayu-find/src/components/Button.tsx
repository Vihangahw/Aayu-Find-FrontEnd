interface ButtonProps {
    label: string;
}

export default function Button({ label }: ButtonProps) {
    return <button className="w-full bg-green-100 text-green-950 p-2 rounded">{label}</button>;
}
