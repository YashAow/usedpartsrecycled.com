import Link from "next/link";
import Image from "next/image";

export default function CallToActionSection() {
  return (
    <section className="relative py-16 text-white w-full">
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src="/stock-2.jpg?height=500&width=1600"
          alt="Car parts background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-[#004260]">
            Find Quality Used Auto Parts Now
          </h2>

          <p className="text-lg mb-8">
            Parts Central has always been your one-stop shop for replacement
            high quality used OEM automotive parts and accessories. Our experts
            are always a phone call away for quick, real-time advice, and
            efficiently respond to your queries. Our prices are competitive and
            we strive to provide the best parts at the most affordable prices.
            Give us a call today.
          </p>

          <div className="text-xl">
            <span>Call now at </span>
            <Link
              href="tel:8883382540"
              className="text-[#004260] font-bold hover:underline"
            >
              (888) 338-2540
            </Link>
            <span>
              {" "}
              and join the thousands of satisfied Parts Central customers.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
