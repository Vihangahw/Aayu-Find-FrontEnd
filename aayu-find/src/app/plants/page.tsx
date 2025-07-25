import React from 'react'
import { HeartPulse, Eye, Leaf } from 'lucide-react'

const plantsData = [
    
    {
        name: "Heen Bovitiya",
        scientificName: "Osbeckia octandra",
        image: "/AayuFind-Heen-Bovitiya.JPG",
        description: "A cornerstone of Sri Lankan traditional medicine, Heen Bovitiya is highly valued for its therapeutic properties. It plays a significant role in natural remedies, particularly for liver-related conditions.",
        medicinalUse: "Traditionally used to support the treatment of chronic conditions such as Non-Alcoholic Fatty Liver Disease (NAFLD) and high cholesterol. Its properties are believed to aid in liver protection and function.",
        identificationNotes: "Often confused with the common 'Bovitiya' plant. Key differences are its smaller leaf size and darker green color. Accurate identification is crucial to ensure its effective use in remedies."
    },
    {
        name: "Yaki Naran",
        scientificName: "Atalantia ceylanica",
        image: "/AayuFind-Yaki-Naran.JPG",
        description: "Yaki Naran is a vital plant in Ayurvedic practices, recognized for its potential in managing metabolic conditions. It is a prime example of a plant where accurate identification is critical due to its close resemblance to other species.",
        medicinalUse: "Primarily utilized for its potential to help manage high cholesterol levels and conditions like diabetes. It's a key ingredient in many traditional preparations aimed at improving metabolic health.",
        identificationNotes: "Visually very similar to the common Organic Lime ('Dehi'). It has oval-shaped leaves and smooth edges, with only subtle differences in vein patterns that are difficult for a non-specialist to distinguish."
    },
    {
        name: "Kowakka",
        scientificName: "Coccinia grandis",
        image: "/AayuFind-Kowakka.JPG",
        description: "Also known as Ivy Gourd, Kowakka is a fast-growing plant that is often dismissed as a common weed. However, it holds significant medicinal value, representing the untapped potential of local Sri Lankan flora.",
        medicinalUse: "Valued for its anti-diabetic properties, it is used in managing blood sugar levels. Its inclusion in the project highlights how even commonly overlooked plants can provide affordable healthcare options.",
        identificationNotes: "Features glossy, elongated leaves. While distinct, under certain lighting conditions or at different growth stages, its leaves can appear similar to other common climbing plants and vines."
    },
    {
        name: "Karapincha",
        scientificName: "Murraya koenigii",
        image: "/AayuFind-Karapincha.JPG",
        description: "A staple in Sri Lankan cuisine, Karapincha (Curry Leaf) is as much a medicinal herb as it is a culinary one. It is one of the most accessible and widely used plants for daily health support.",
        medicinalUse: "Commonly used in traditional remedies for managing high cholesterol and diabetes. Its widespread availability makes it an important plant for promoting natural, cost-effective healthcare.",
        identificationNotes: "Characterized by its distinctively shaped compound leaves. While easily recognizable for many, automated systems must still learn to distinguish it from other plants with similar leaf arrangements in cluttered environments."
    }
]

export default function PlantsPage() {
    return (
        <main className="bg-stone-900 text-white">
            {/* Hero Section */}
            <section className="bg-black/20 py-24 sm:py-32">
                <div className="container mx-auto px-6 text-center">
                    <Leaf className="mx-auto h-12 w-12 text-amber-500" />
                    <h1 className="mt-4 text-5xl font-serif font-light tracking-tight sm:text-6xl">
                        Featured Medicinal Plants
                    </h1>
                    <p className="mt-6 text-lg max-w-2xl mx-auto leading-8 text-stone-300">
                        Explore the initial set of four vital Ayurvedic plants that are the focus of the AayuFind research project. Each plays a crucial role in treating chronic diseases.
                    </p>
                </div>
            </section>

            {/* Plants Details Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 space-y-28">
                    {plantsData.map((plant, index) => (
                        <div key={plant.name} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Image Column */}
                            <div className={`order-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <img
                                    src={plant.image}
                                    alt={`Image of ${plant.name}`}
                                    className="w-full h-auto object-cover rounded-2xl shadow-2xl aspect-square"
                                />
                            </div>

                            {/* Text Content Column */}
                            <div className={`order-2 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <h2 className="text-4xl font-serif font-light tracking-tight text-white">
                                    {plant.name}
                                </h2>
                                <p className="mt-2 text-lg text-amber-500 font-mono">{plant.scientificName}</p>
                                <p className="mt-6 text-stone-300 leading-relaxed">
                                    {plant.description}
                                </p>

                                <div className="mt-8 space-y-6 border-l-2 border-amber-600/30 pl-6">
                                    <div>
                                        <h3 className="flex items-center gap-3 text-xl font-serif text-white">
                                            <HeartPulse className="h-6 w-6 text-amber-500" />
                                            Medicinal Significance
                                        </h3>
                                        <p className="mt-2 text-stone-400">
                                            {plant.medicinalUse}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="flex items-center gap-3 text-xl font-serif text-white">
                                            <Eye className="h-6 w-6 text-amber-500" />
                                            Identification Notes
                                        </h3>
                                        <p className="mt-2 text-stone-400">
                                            {plant.identificationNotes}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}