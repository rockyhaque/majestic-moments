import { connectDB } from "@/lib/connectDB"
import { services } from "@/lib/services";

export const GET = async () => {
    const db = await connectDB();
    const serviceCollection = db.collection('services')
    try {
        await serviceCollection.deleteMany();
        const res = await serviceCollection.insertMany(services);
        return Response.json({message: "Seeded Successfully"})
    } catch (error) {
        console.log(error)
    }
}