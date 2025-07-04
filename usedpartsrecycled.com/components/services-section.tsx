import Image from "next/image";

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#004260]">SERVICES</h2>
          <p className="text-xl text-[#004260]">
            MILLIONS OF QUALITY USED OEM PARTS
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex justify-center mb-6">
              <Image
                src="/waranty.png?height=80&width=80"
                alt="Warranty Icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              60 DAY WARRANTY
            </h3>
            <ul className="text-gray-600 space-y-3 list-disc pl-5">
              <li>We provide a warranty on most Parts Central type.</li>
              <li>
                We offer extended warrantees on many products at competitive
                prices.
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex justify-center mb-6">
              <Image
                src="/search_recyled.png?height=80&width=80"
                alt="Shipping Icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              FREE SHIPPING
            </h3>
            <ul className="text-gray-600 space-y-3 list-disc pl-5">
              <li>
                We ship Parts Central used auto and truck parts to anywhere in
                the US and many international locations.
              </li>
              <li>
                We offer FREE Shipping within the continental 48 US States.
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex justify-center mb-6">
              <Image
                src="/free-shipping-recycled.png?height=80&width=80"
                alt="Search Icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              SEARCH ALL BRANDS
            </h3>
            <ul className="text-gray-600 space-y-3 list-disc pl-5">
              <li>
                From aftermarket or replacement parts, we will help you find the
                best.
              </li>
              <li>Find offers for all brands and models in one place.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
