import Image from "next/image";
import Link from "next/link";

const carMakes = [
  { name: "Acura", logo: "/acura-logo.webp" },
  { name: "Audi", logo: "/audi-logo.webp" },
  { name: "BMW", logo: "/bmw-logo.webp" },
  { name: "Buick", logo: "/buick-logo.webp" },
  { name: "Cadillac", logo: "/cadillac-logo.webp" },
  { name: "Chevrolet", logo: "/chevrolet-logo.webp" },
  { name: "Chrysler", logo: "/chrysler-logo.webp" },
  { name: "Dodge", logo: "/dodge-logo.webp" },
  { name: "Ford", logo: "/ford-logo.webp" },
  { name: "Honda", logo: "/honda-logo.webp" },
  { name: "Hyundai", logo: "/hyundai-logo.webp" },
  { name: "Jeep", logo: "/jeep-logo.webp" },
  { name: "Kia", logo: "/kia-logo.webp" },
  { name: "Lexus", logo: "/lexus-logo.webp" },
  { name: "Mazda", logo: "/mazda-logo.webp" },
  { name: "Mercedes", logo: "/mercedes-benz-logo.webp" },
  { name: "Nissan", logo: "/nissan-logo.webp" },
  { name: "Subaru", logo: "/subaru-logo.webp" },
  { name: "Toyota", logo: "/toyota-logo.webp" },
  { name: "Volkswagen", logo: "/volkswagen-logo.webp" },
];

export default function PartsByMakeSection() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Parts by Vehicle Make
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {carMakes.map((make, index) => (
            <Link
              href={`#`}
              key={index}
              className="bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center border border-gray-700 hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-md"
            >
              <Image
                src={`make-logo/${make.logo}`}
                alt={`${make.name} logo`}
                width={80}
                height={80}
                className="mb-4 object-contain"
              />
              <span className="font-semibold text-lg">{make.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
