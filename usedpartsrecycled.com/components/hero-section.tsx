"use client";

import { useState, useCallback, memo, useMemo } from "react";
import Image from "next/image";
import { Phone, AlertCircle, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  YEAR,
  ENGINE_SIZES,
  MAKE,
  PART,
  TRANSMISSION,
  PHONE_NUMBER,
  CALL_TO,
} from "@/app/config";
import { log } from "console";

const PhoneLink = memo(({ isMobile }: { isMobile: boolean }) => (
  <a
    href={CALL_TO || `tel:${PHONE_NUMBER.replace(/[^0-9]/g, "")}`}
    className={`bg-[#004260] rounded-lg p-4 flex items-center justify-center ${
      isMobile ? "md:hidden mt-6 overflow-hidden" : "hidden md:block mt-4"
    }`}
    onClick={(e) => {
      e.preventDefault();
      window.location.href = CALL_TO || `tel:${PHONE_NUMBER.replace(/[^0-9]/g, "")}`;
    }}
  >
    <div className="flex items-center">
      <Phone className={isMobile ? "h-6 w-6 mr-3" : "h-8 w-8 mr-3"} />
      <div>
        <div className={isMobile ? "text-xl font-bold" : "text-2xl font-bold"}>
          {PHONE_NUMBER}
        </div>
      </div>
    </div>
  </a>
));
PhoneLink.displayName = "PhoneLink";

const Spinner = memo(() => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
));

const SubmitButton = memo(({ isSubmitting }: { isSubmitting: boolean }) => (
  <button
    type="submit"
    className="w-full bg-[#004260] hover:bg-[#0000FF] text-white py-3 rounded-md transition-colors font-bold flex items-center justify-center mt-6"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <>
        <Spinner />
        Processing...
      </>
    ) : (
      <>
        <Search className="h-5 w-5 mr-2" />
        Find My Part
      </>
    )}
  </button>
));

const ConsentCheckbox = memo(({ id, required, label }: {
  id: string;
  required: boolean;
  label: React.ReactNode;
}) => (
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        id={id}
        name={id}
        type="checkbox"
        required={required}
        className="h-4 w-4 text-[#004260] border-gray-300 rounded focus:ring-[#004260] overflow-hidden"
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
    </div>
  </div>
));

const ConsentCheckboxes = memo(() => (
  <div className="space-y-3">
    <ConsentCheckbox
      id="terms-consent"
      required={true}
      label={
        <>
          I agree to receive SMS updates and consent to the{' '}
          <a href="https://usedpartscentral.com/terms-and-conditions" className="text-[#004260] font-bold hover:underline">
            Terms of Service
          </a>{' '}and{' '}
          <a href="https://usedpartscentral.com/privacy-policy" className="text-[#004260] font-bold hover:underline">
            Privacy Policy
          </a>.
        </>
      }
    />
    <ConsentCheckbox
      id="marketing-consent"
      required={false}
      label={
        <>
          By checking this box, I consent to receive SMS from Parts Central, including conversational, marketing,
          promotional, and customer care messages. Messaging frequency may vary. Message & data rates may apply. 
          Reply STOP to opt out or HELP for support.
        </>
      }
    />
  </div>
));

const HeroSectionContent = memo(({ title, description, background, selectedMake, selectedPart }: {
  title: string;
  description: string;
  background: string;
  selectedMake: string;
  selectedPart: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const utmSource = searchParams.get("utm_source") || "Organic";
  const utmCampaign = searchParams.get("utm_campaign") || "";
  const utmMedium = searchParams.get("utm_medium") || "";
  const [makeState, setMakeState] = useState(selectedMake);
  const [model, setModel] = useState("Choose Model");
  const [partState, setPartState] = useState(selectedPart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ year: false, engine: false, make: false, model: false, transmission: false, part: false, name: "", email: "", phone: "" });
  const memoizedModels = useMemo(() => MAKE[makeState as keyof typeof MAKE] || [], [makeState]);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "make") {
      setMakeState(value);
      setModel("Choose Model");
    }
    if (name === "model") setModel(value);
    if (name === "part") setPartState(value);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const year = formData.get("year") as string;
    const engineSize = formData.get("engine_size") as string;
    const make = formData.get("make") as string;
    const modelVal = formData.get("model") as string;
    const transmission = formData.get("transmission") as string;
    const part = formData.get("part") as string;
    const name = formData.get("fullname") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone_number") as string;
    const zip = formData.get("zip_code") as string;
    const newErrors = {
      year: year === "Year",
      engine: engineSize === "Engine Size",
      make: make === "Choose Your Car",
      model: modelVal === "Choose Model",
      transmission: transmission === "Choose Transmission",
      part: part === "Choose Part",
      name: name ? "" : "Please enter your name.",
      email: email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Invalid e-mail." : "Please enter your e-mail.",
      phone: phone ? "" : "Please enter your phone no.",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(err => err !== false && err !== "")) {
      setIsSubmitting(false);
      return;
    }
    try {
      const emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, engine_size: engineSize, make, model: modelVal, transmission, part, name, email, phone, zip_code: zip, Source: utmSource, SourceCampaign: utmCampaign, SourceMedium: utmMedium, SearchBy: typeof window !== "undefined" && /mobile/i.test(window.navigator.userAgent) ? "Mobile" : /tablet/i.test(window.navigator.userAgent) ? "Tablet" : "Desktop" }),
      });
      const resJson = await emailRes.json();
      console.log(resJson);
      
      if (resJson.status === "success") {
        router.push("/success");
      } else {
        alert("Message Sent Failed." + resJson.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  }, [router, utmSource, utmCampaign, utmMedium]);

  return (
    <section className="relative bg-black text-white w-full overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-70">
        <Image
          src={background || "/placeholder.svg"}
          alt="Car parts background"
          fill
          className="object-cover"
          priority
          quality={80}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="container px-4 py-16 md:py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-2/5 space-y-4 hero-content">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {title} <br /> 
              {title === "Best Quality" && (
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#004260]">
                  USED AUTO PARTS
                </span>
              )}
            </h1>
            <p className="text-xl md:text-2xl font-light mt-4">{description}</p>
            <PhoneLink isMobile={true} />
          </div>

          <div className="w-full md:w-3/5 lg:w-1/2 xl:w-[600px] ml-auto mr-2 px-2 py-4">
            <form className="bg-white/60 rounded-lg shadow-lg mx-px overflow-hidden" onSubmit={handleSubmit}>
           
               <div className="bg-[#004260] text-white text-center py-4 text-xl font-bold">
                  Find A Part Now
                </div>
              <div className="p-6 md:p-8 space-y-6">
                  {/* Vehicle Information */}
                  <div className="space-y-4">
                    <h3 className="text-[#004260] font-semibold text-lg border-b border-[#004260]/30 pb-2">
                      Vehicle Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Year Field */}
                      <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                          Year
                        </label>
                        <select
                          id="year"
                          name="year"
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                        >
                          {YEAR.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        {errors.year && (
                          <p className="text-red-600 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            Choose Year.
                          </p>
                        )}
                      </div>

                      {/* Make Field */}
                      <div>
                        <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                          Make
                        </label>
                        <select
                          id="make"
                          name="make"
                          value={makeState}
                          onChange={handleChange}
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                        >
                          <option value="">Choose Your Car</option>
                          {Object.keys(MAKE).map((make) => (
                            <option key={make} value={make}>
                              {make}
                            </option>
                          ))}
                        </select>
                        {errors.make && (
                          <p className="text-red-600 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            Choose Your Car.
                          </p>
                        )}
                      </div>

                      {/* Model Field */}
                      <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                          Model
                        </label>
                        <select
                          id="model"
                          name="model"
                          value={model}
                          onChange={handleChange}
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                        >
                          {memoizedModels.map((modelOption) => (
                            <option key={modelOption} value={modelOption}>
                              {modelOption}
                            </option>
                          ))}
                        </select>
                        {errors.model && (
                          <p className="text-red-600 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            Choose Model.
                          </p>
                        )}
                      </div>

                      {/* Part Field */}
                      <div>
                        <label htmlFor="part" className="block text-sm font-medium text-gray-700 mb-1">
                          Part Needed
                        </label>
                        <select
                          id="part"
                          name="part"
                          value={partState}
                          onChange={(e) => setPartState(e.target.value)}
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                        >
                          {PART.map((part) => (
                            <option key={part} value={part}>
                              {part}
                            </option>
                          ))}
                        </select>
                        {errors.part && (
                          <p className="text-red-600 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            Choose Part.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Engine Size Field */}
                      <div>
                        <label htmlFor="engine_size" className="block text-sm font-medium text-gray-700 mb-1">
                          Engine Size
                        </label>
                        <select
                          id="engine_size"
                          name="engine_size"
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                        >
                          {ENGINE_SIZES.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        {errors.engine && (
                          <p className="text-red-600 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            Choose Engine Size.
                          </p>
                        )}
                      </div>

                      {/* Transmission Field */}
                      <div>
                        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                          Transmission
                        </label>
                        <select
                          id="transmission"
                          name="transmission"
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                        >
                          {TRANSMISSION.map((transmission) => (
                            <option key={transmission} value={transmission}>
                              {transmission}
                            </option>
                          ))}
                        </select>
                        {errors.transmission && (
                          <p className="text-red-600 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            Choose Transmission.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-[#004260] font-semibold text-lg border-b border-[#004260]/30 pb-2">
                      Contact Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="text-red-600 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                          placeholder="Email Address*"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone_number"
                          name="phone_number"
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                          placeholder="Phone No."
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 inline mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Zip Code Field */}
                      <div>
                        <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          id="zip_code"
                          name="zip_code"
                          className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                          placeholder="Zip Code"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Consent Checkboxes */}
                  <ConsentCheckboxes />
                  
                  {/* Submit Button */}
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
            </form>
            <PhoneLink isMobile={false} />
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSectionContent.displayName = "HeroSectionContent";

const HeroSection = ({
  title = "Best Quality",
  description = "Choose High Quality Recycled OEM Parts",
  background = "/herobackground.webp?height=600&width=1200",
  selectedMake = "Choose Your Car",
  selectedPart = "Choose Part",
}: {
  title?: string;
  description?: string;
  background?: string;
  selectedMake?: string;
  selectedPart?: string;
}) => {
  return <HeroSectionContent title={title} description={description} background={background} selectedMake={selectedMake} selectedPart={selectedPart} />;
};

export default HeroSection;
