"use client";

import Image from "next/image";
import Link from "next/link";

const productCategories = [
  {
    title: "Engine Assembly",
    image: "/quality-home/Engine_Assembly.webp",
    description:
      "Quality Used Engine & Transmission Parts sold as complete assemblies",
  },
  {
    title: "Transmission",
    image: "/quality-home/transmission.webp",
    description:
      "Everything from an ECM Engine Computer and Electronic Control Modules to fit your car",
  },
  {
    title: "ABS Module",
    image: "/quality-home/ABS Module.webp",
    description:
      "Quality Used Auto Body Parts that make your car look road-worthy",
  },
  {
    title: "ABS System",
    image: "/quality-home/ABS System.webp",
    description:
      "Quality Used Mechanical Car Parts that get you back on the road for less money",
  },
  {
    title: "SPINDLE KNUCKLE - FRONT",
    image: "/quality-home/spindle.webp",
    description: "Attach the upper and lower components of the suspension",
  },
  {
    title: "HEAD LIGHT ASSEMBLY",
    image: "/quality-home/head_light_assembly.webp",
    description: "Important component of the car used for visibility",
  },
];

export default function ProductCategoriesSection() {
  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#004260] text-center mb-12">
          Quality Used Auto Parts
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm p-4 flex flex-col sm:flex-row items-center transition-transform hover:scale-[1.01]"
            >
              {/* Text Section */}
              <div className="sm:w-2/3 sm:pr-4 text-center sm:text-left">
                <h3 className="font-bold text-lg text-[#004260] mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {category.description}
                </p>
                <Link
                  href="#"
                  className="inline-block mt-4 bg-[#004260] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Know More
                </Link>
              </div>

              {/* Image Section */}
              <div className="sm:w-1/3 mt-4 sm:mt-0 flex justify-center sm:justify-end">
                <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100px, 120px"
                    className="object-contain"
                    priority={index < 2} // Prioritize first 2 images
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <Link
            href="#"
            className="inline-block border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
