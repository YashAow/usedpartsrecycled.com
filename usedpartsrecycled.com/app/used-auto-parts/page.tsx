import HeroSection from "@/components/hero-section";
import SearchByMakeDynamic from "@/components/lazy-search-by-make-wrapper";
{/*
export const metadata = {
  title: "Used Auto Parts for Sale | Quality Used Car Parts",
  description: "Professional-inspected used auto parts meeting industry standards. Save 30-70% on OEM parts with warranties.",
  alternates: {
    canonical: "https://partscenteral.us/used-auto-parts",
  },
  openGraph: {
    images: [{
      url: '/banner-hero.webp',
      width: 1200,
      height: 630,
      alt: 'Quality Used Auto Parts',
    }]
  }
};*/ }

export default function UsedAutoPartsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-hidden">
      <HeroSection
        title="Used Auto Parts"
        description="Unlock Quality, Savings, and Performance with Affordable Used Auto Parts"
        background="/banner-hero.webp"
      />

      <div className="mx-auto w-full max-w-screen-xl flex flex-col p-4 py-6 lg:py-8">
        <section className="prose prose-lg max-w-none overflow-hidden">
          <h1 className="sr-only">Used Auto Parts</h1>
          
          <p className="text-gray-700 text-[17px] overflow-hidden">
            Give your ride new life with quality used auto parts at the best prices. 
            Parts Central is your trusted source for <strong>used auto parts stores</strong>.
            Whether you are doing any DIY project, major repairs, or just simple maintenance that you&apos;re undertaking, 
            our Web-based platform is committed to providing the best deals on car parts for sale at unbeatable prices.
          </p>

          <section aria-labelledby="source-title " className="mt-10">
            <h2 id="source-title" className="font-sans text-[#002E5B] text-[25px] font-extrabold uppercase">
              Your Source for Used Auto Parts
            </h2>
            <p className="text-gray-700 text-[17px] mt-4">
              Finding the right parts in the world of vehicle repairs can be like searching for treasure, 
              as likened to a needle in a haystack. But here at Parts Central, we make the process easy. 
              Our big inventory is filled with used <strong>car parts for sale</strong> that are cautiously 
              inspected and re-inspected to meet our standards. From power plants and transmissions to 
              even the tiniest of parts, we have it all in stock, so you may need to get your vehicle right.
            </p>
          </section>

          <section aria-labelledby="benefits-title" className="mt-10">
            <h2 id="benefits-title" className="font-sans text-[#002E5B] text-[25px] font-extrabold italic">
              Why Buy from Parts Central?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg">1. Always Best Quality</h3>
                <p className="text-gray-700 text-[17px] mt-2">
                  Quality for us is not just a word; it&apos;s a commitment. Every single used part we supply 
                  has been comprehensively checked to perform as you would expect. Whether it is an engine or 
                  any other component, big or small, rest assured we do the job right with <strong>quality used auto parts.</strong>
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg overflow-hidden">
                <h3 className="font-bold text-lg">2. Unparalleled Convenience</h3>
                <p className="text-gray-700 text-[17px] mt-2 overflow-hidden">
                  We know minutes count when your car is down. That&apos;s why we design our used auto parts 
                  stores with convenience in mind. Conveniently browse our catalog from the comfort of your 
                  home and find exactly what you need without the aggravation of visiting multiple stores. 
                  Once you make your selection, we will ship your parts directly to you free of charge!
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg">3. A Haven for Car Enthusiasts</h3>
                <p className="text-gray-700 text-[17px] mt-2 overflow-hidden">
                  Whether you restore classic cars or tune up your daily driver, this is your one-stop shop: 
                  Parts Central. Our website is not exactly a marketplace but, foremost, a community for 
                  car enthusiasts. Get immersed in our world of replacement auto parts and find the hidden 
                  gems and super-rare finds here. We shall be happy to serve your passion with the best used 
                  car parts for sale on the market.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg overflow-hidden">
                <h3 className="font-bold text-lg">4. 365 Days of Service</h3>
                <p className="text-gray-700 text-[17px] mt-2">
                  Your car doesn&apos;t take a day off, and neither do we. Our dedicated sales team is happy 
                  to assist in finding those parts any time of the year. From emergencies to long projects, 
                  remember you need us; we&apos;ll be there.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="confidence-title" className="mt-10">
            <h2 id="confidence-title" className="font-sans text-[#002E5B] text-[25px] font-extrabold italic">
              Buy with Confidence, Drive with Confidence
            </h2>
            <p className="text-gray-700 text-[17px] mt-4 overflow-hidden">
              At Parts Central, you purchase more than a product. Buy peace of mind when buying used car parts. 
              Backed by quality, you can hit the road confidently with warranties that range from 60 to 90 days. 
              Free shipping across the continental United States makes it easier than ever to get your vehicle 
              back on the road.
            </p>
          </section>

          <section aria-labelledby="renewal-title" className="mt-10">
            <h2 id="renewal-title" className="font-sans text-[#002E5B] text-[25px] font-extrabold italic">
              Your Vehicle&apos;s Renaissance Awaits
            </h2>
            <p className="text-gray-700 text-[17px] mt-4 overflow-hidden">
              At Parts Central, every vehicle deserves another chance. From the most beloved and cherished 
              classics to the latest marvels of engineering, our used auto parts stores can get you all that 
              is required to restore, repair, and rejuvenate your ride. Come and explore our inventory today 
              for a difference in working with a trusted partner in the automotive industry.
            </p>
            <p className="text-gray-700 text-[17px] mt-4 overflow-hidden">
              Want to take your auto parts journey to a whole new level? Stop by our website and browse through 
              the countless car parts for sale, and you will be amazed at just how easily you will be able to 
              <strong> buy used car parts</strong> from a name you truly can trust. The next chapter of your 
              vehicle starts here. Let&apos;s make it a good one.
            </p>
          </section>
        </section>

        <SearchByMakeDynamic page="auto-parts" />
      </div>
    </main>
  );
}