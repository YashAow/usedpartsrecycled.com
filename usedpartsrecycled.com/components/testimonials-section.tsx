import Image from "next/image";

const testimonials = [
  {
    text: "Quality Auto Parts exceeded my expectations! They sourced a rare component for my vintage BMW that I couldn't find anywhere else. Their attention to detail and commitment to finding the precise OEM match was impressive. Quick shipping and friendly support - they've earned a loyal customer!",
    name: "Alex",
    location: "Portland, OR",
    image: "/testimonials_user.jpg",
  },
  {
    text: "I had an outstanding experience with Quality Auto Parts! They managed to find a rare part for my vintage BMW that no other supplier could source. Their dedication to quality and ensuring an exact OEM match truly impressed me. Fast shipping and excellent customer service sealed the deal. Highly recommended!",
    name: "Jack",
    location: "Orlando, FL",
    image: "/testimonials_recycled_2.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-100 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold mb-4 text-[#004260]">
            Customer Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-[#004260]">
            Discover why thousands of car enthusiasts trust Quality Auto Parts
            for their automotive needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                <Image
                  src={testimonial.image || "testimonials_user.jpg"}
                  alt={`${testimonial.name}'s avatar`}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-[#004260]"
                />
              </div>

              <p className="text-gray-600 italic mb-6 flex-grow">
                "{testimonial.text}"
              </p>

              <div className="bg-[#004260] text-white w-full py-3 rounded-lg">
                <p className="font-semibold text-lg">{testimonial.name}</p>
                <p className="text-sm opacity-90">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Rated 4.8/5 based on 2,347+ customer reviews
          </p>
        </div>
      </div>
    </section>
  );
}
