"use client";

import type React from "react";
import { useState, type FormEvent, Suspense } from "react";
import Image from "next/image";
import { Phone, AlertCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  YEAR,
  ENGINE_SIZES,
  MAKE,
  PART,
  TRANSMISSION,
  PHONE_NUMBER,
  CALL_TO,
} from "@/app/config";

// Create a separate component for the part that uses useSearchParams
function HeroSectionContent({
  title,
  description,
  background,
  selectedMake,
  selectedPart,
}: {
  title: string;
  description: string;
  background: string;
  selectedMake: string;
  selectedPart: string;
}) {
  const router = useRouter();
  // Import useSearchParams inside this component
  const { useSearchParams } = require("next/navigation");
  const searchParams = useSearchParams();

  // Get UTM parameters for tracking
  const utmSource = searchParams.get("utm_source") || "Organic";
  const utmCampaign = searchParams.get("utm_campaign") || "";
  const utmMedium = searchParams.get("utm_medium") || "";

  // Form state
  const [model, setModel] = useState(selectedMake);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error message states
  const [yearMsg, setYearMsg] = useState(false);
  const [engineMsg, setEngineMsg] = useState(false);
  const [carMsg, setCarMsg] = useState(false);
  const [modelMsg, setModelMsg] = useState(false);
  const [transmissionMsg, setTransmissionMsg] = useState(false);
  const [partMsg, setPartMsg] = useState(false);
  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
const [selectedPartState, setSelectedPartState] = useState(selectedPart);

  // Handle make selection change to update model options
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "make") {
      setModel(e.target.value);
    }
  };

  // Get device type for analytics
  const getDeviceType = () => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent;
      if (/mobile/i.test(userAgent)) return "Mobile";
      if (/tablet/i.test(userAgent)) return "Tablet";
      return "Desktop";
    }
    return "Unknown";
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const year = formData.get("year") as string;
    const engineSize = formData.get("engine_size") as string;
    const make = formData.get("make") as string;
    const modelValue = formData.get("model") as string;
    const transmission = formData.get("transmission") as string;
    const part = formData.get("part") as string;
    const name = formData.get("fullname") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phone_number") as string;
    const zipCode = formData.get("zip_code") as string;

    let errorCount = 0;

    // Validate vehicle information
    if (year === "Year") {
      errorCount++;
      setYearMsg(true);
    } else {
      setYearMsg(false);
    }

    if (engineSize === "Engine Size") {
      errorCount++;
      setEngineMsg(true);
    } else {
      setEngineMsg(false);
    }

    if (make === "Choose Your Car") {
      errorCount++;
      setCarMsg(true);
    } else {
      setCarMsg(false);
    }

    if (modelValue === "Choose Model") {
      errorCount++;
      setModelMsg(true);
    } else {
      setModelMsg(false);
    }

    if (transmission === "Choose Transmission") {
      errorCount++;
      setTransmissionMsg(true);
    } else {
      setTransmissionMsg(false);
    }

    if (part === "Choose Part") {
      errorCount++;
      setPartMsg(true);
    } else {
      setPartMsg(false);
    }

    // Validate personal information
    if (name === "") {
      setNameMsg("Please enter your name.");
      errorCount++;
    } else {
      setNameMsg("");
    }

    if (email === "") {
      setEmailMsg("Please enter your e-mail.");
      errorCount++;
    } else {
      const emailRegex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (emailRegex.test(email)) {
        setEmailMsg("");
      } else {
        setEmailMsg("Invalid e-mail.");
        errorCount++;
      }
    }

    if (phoneNumber === "") {
      setPhoneMsg("Please enter your phone no.");
      errorCount++;
    } else {
      setPhoneMsg("");
    }

    if (errorCount === 0) {
      try {
        // Send data to email API
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year,
            engine_size: engineSize,
            make,
            model: modelValue,
            transmission,
            part,
            name,
            email,
            phone: phoneNumber,
            zip_code: zipCode,
            Source: utmSource,
            SourceCampaign: utmCampaign,
            SourceMedium: utmMedium,
            SearchBy: getDeviceType(),
          }),
        });

        if (!emailResponse.ok) {
          throw new Error("Sending mail failed");
        }

        // Send data to LeadSquare CRM
        const leadSquareResponse = await fetch(
          "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=u$r3da4c3dca5ffc341c492e6e816b41559&secretKey=46f2ff355dedea619d0600ed75d2563e9af03f78",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              { Attribute: "FirstName", Value: name },
              { Attribute: "EmailAddress", Value: email },
              { Attribute: "Phone", Value: phoneNumber },
              { Attribute: "mx_Zip", Value: zipCode },
              { Attribute: "mx1_Year", Value: year },
              { Attribute: "mx_Make", Value: make },
              { Attribute: "mx_Model", Value: modelValue },
              { Attribute: "mx_Engine_Size", Value: engineSize },
              { Attribute: "mx_Part", Value: part },
              { Attribute: "mx_Choose_Transmission", Value: transmission },
              { Attribute: "mx_VIN_NUMBER", Value: "" },
              { Attribute: "Source", Value: utmSource },
              { Attribute: "SourceCampaign", Value: utmCampaign },
              { Attribute: "SourceMedium", Value: utmMedium },
              { Attribute: "SearchBy", Value: getDeviceType() },
            ]),
          }
        );

        // Process responses
        const emailJson = await emailResponse.json();

        if (leadSquareResponse.ok) {
          const leadSquareJson = await leadSquareResponse.json();
          if (leadSquareJson.Status !== "Success") {
            console.error("LeadSquare error:", leadSquareJson);
          }
        } else {
          console.error("LeadSquare API call failed");
        }

        // Redirect on success
        if (emailJson.status === "success") {
          router.push("/success");
        } else {
          alert("Message Sent Failed.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-black text-white w-full">
      <div className="absolute inset-0 z-0 opacity-70">
        <Image
          src={background || "/placeholder.svg"}
          alt="Car parts background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container px-4 py-16 md:py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-2/5 space-y-4 hero-content">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p className="text-xl md:text-2xl font-light mt-4">{description}</p>

            {/* Phone section for mobile */}
            <div className="md:hidden mt-6">
              <a
                href={CALL_TO || `tel:${PHONE_NUMBER.replace(/[^0-9]/g, "")}`}
                className="bg-[#004260] rounded-lg p-4 flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href =
                    CALL_TO || `tel:${PHONE_NUMBER.replace(/[^0-9]/g, "")}`;
                }}
              >
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-3" />
                  <div>
                    <div className="text-xl font-bold">{PHONE_NUMBER}</div>
                    {/* <div className="text-xs">Call now to order</div> */}
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="w-full md:w-3/5 lg:w-3/5 xl:w-3/5 form-container">
            <form
              className="bg-white/60 rounded-lg shadow-lg overflow-hidden"
              onSubmit={handleSubmit}
            >
              <div className="bg-[#004260] text-white text-center py-4 text-xl font-bold">
                Find A Part Now
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* Vehicle Information Section */}
                <div className="space-y-4">
                  <h3 className="text-[#004260] font-semibold text-lg border-b border-[#004260]/30 pb-2">
                    Vehicle Information
                  </h3>

                  {/* First row - Year, Make, Model, Part */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label
                        htmlFor="year"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Year
                      </label>
                      <select
                        id="year"
                        name="year"
                        className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                      >
                        {YEAR.map((year, index) => (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      {yearMsg && (
                        <p className="text-red-600 text-sm mt-1">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          Choose Year.
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="make"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Make
                      </label>
                      {/*<select
                        id="make"
                        name="make"
                        onChange={handleChange}
                        className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                      >
                        {Object.keys(MAKE).map((make, index) => (
                          <option
                            key={index}
                            value={make}
                            selected={
                              selectedMake.toLowerCase() === make.toLowerCase()
                            }
                          >
                            {make}
                          </option>
                        ))}
                      </select>*/}
                      <select
  id="make"
  name="make"
  value={selectedMake}
  onChange={handleChange}
  className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                      >"

  {Object.keys(MAKE).map((make, index) => (
    <option key={index} value={make}>
      {make}
    </option>
  ))}
</select>

                      {carMsg && (
                        <p className="text-red-600 text-sm mt-1">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          Choose Your Car.
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="model"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Model
                      </label>
                      <select
                        id="model"
                        name="model"
                        className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                      >
                        {MAKE[model as keyof typeof MAKE] &&
                          MAKE[model as keyof typeof MAKE].map(
                            (modelOption, index) => (
                              <option key={index} value={modelOption}>
                                {modelOption}
                              </option>
                            )
                          )}
                      </select>
                      {modelMsg && (
                        <p className="text-red-600 text-sm mt-1">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          Choose Model.
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="part"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Part Needed
                      </label>
                     {/* <select
                        id="part"
                        name="part"
                        className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                      >
                        {PART.map((part, index) => (
                          <option
                            key={index}
                            value={part}
                            selected={selectedPart === part}
                          >
                            {part}
                          </option>
                        ))}
                      </select>*/}
                      <select
  id="part"
  name="part"
  value={selectedPartState}
  onChange={(e) => setSelectedPartState(e.target.value)} // Add this if not handled elsewhere
  className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
>
  {PART.map((part, index) => (
    <option key={index} value={part}>
      {part}
    </option>
  ))}
</select>

                      {partMsg && (
                        <p className="text-red-600 text-sm mt-1">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          Choose Part.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Second row - Engine Size, Transmission, and empty spaces */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label
                        htmlFor="engine_size"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Engine Size
                      </label>
                      <select
                        id="engine_size"
                        name="engine_size"
                        className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                      >
                        {ENGINE_SIZES.map((size, index) => (
                          <option key={index} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      {engineMsg && (
                        <p className="text-red-600 text-sm mt-1">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          Choose Engine Size.
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="transmission"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Transmission
                      </label>
                      <select
                        id="transmission"
                        name="transmission"
                        className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                      >
                        {TRANSMISSION.map((transmission, index) => (
                          <option key={index} value={transmission}>
                            {transmission}
                          </option>
                        ))}
                      </select>
                      {transmissionMsg && (
                        <p className="text-red-600 text-sm mt-1">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          Choose Transmission.
                        </p>
                      )}
                    </div>

                    {/* Empty columns to maintain 4-column layout */}
                    <div className="hidden lg:block"></div>
                    <div className="hidden lg:block"></div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-4">
                  <h3 className="text-[#004260] font-semibold text-lg border-b border-[#004260]/30 pb-2">
                    Contact Information
                  </h3>

                  {/* Contact row - Name, Email, Phone, Zip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label
                        htmlFor="fullname"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                        placeholder="Your name"
                      />
                      {nameMsg && (
                        <p className="text-red-600 text-sm mt-1">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          {nameMsg}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                        placeholder="Email Address*"
                      />
                      {emailMsg && (
                        <p className="text-red-600 text-sm mt-1">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          {emailMsg}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone_number"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        className="custom-select w-full h-12 text-[#4E4E4E] text-[15px] block rounded-md px-3 border-2 border-[#004260] focus:border-[#004260] focus:ring focus:ring-[#004260]/30 focus:outline-none"
                        placeholder="Phone No."
                      />
                      {phoneMsg && (
                        <p className="text-red-600 text-sm mt-1">
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          {phoneMsg}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="zip_code"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
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
                <div className="space-y-3">
                  {/* Mandatory checkbox */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms-consent"
                        name="terms-consent"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-[#004260] border-gray-300 rounded focus:ring-[#004260]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms-consent"
                        className="font-medium text-gray-700"
                      >
                        I agree to receive SMS updates and consent to the{" "}
                        <a
                          href="https://usedpartscentral.com/terms-and-conditions"
                          className="text-[#004260] font-bold hover:underline"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="https://usedpartscentral.com/privacy-policy"
                          className="text-[#004260] font-bold hover:underline"
                        >
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>
                  </div>

                  {/* Optional checkbox */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketing-consent"
                        name="marketing-consent"
                        type="checkbox"
                        className="h-4 w-4 text-[#004260] border-gray-300 rounded focus:ring-[#004260]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="marketing-consent"
                        className="font-medium text-gray-700"
                      >
                        By checking this box, I consent to receive SMS from
                        Parts Central, including conversational, marketing,
                        promotional, and customer care messages. Messaging
                        frequency may vary. Message & data rates may apply.
                        Reply STOP to opt out or HELP for support. For more
                        details, visit our{" "}
                        <a
                          href="https://usedpartscentral.com/privacy-policy"
                          className="text-[#004260] font-bold hover:underline"
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                          href="https://usedpartscentral.com/terms-and-conditions"
                          className="text-[#004260] font-bold hover:underline"
                        >
                          Terms of Service
                        </a>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#004260] hover:bg-[#0000FF] text-white py-3 rounded-md transition-colors font-bold flex items-center justify-center mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Find My Part
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Phone section for desktop */}
            <div className="hidden md:block mt-4">
              <a
                href={CALL_TO || `tel:${PHONE_NUMBER.replace(/[^0-9]/g, "")}`}
                className="bg-[#004260] rounded-lg p-4 flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href =
                    CALL_TO || `tel:${PHONE_NUMBER.replace(/[^0-9]/g, "")}`;
                }}
              >
                <div className="flex items-center">
                  <Phone className="h-8 w-8 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">{PHONE_NUMBER}</div>
                    {/* <div className="text-sm">Call now to order</div> */}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Loading fallback for Suspense
function HeroSectionFallback({
  title,
  description,
  background,
}: {
  title: string;
  description: string;
  background: string;
}) {
  return (
    <section className="relative bg-black text-white w-full">
      <div className="absolute inset-0 z-0 opacity-70">
        <Image
          src={background || "/placeholder.svg"}
          alt="Car parts background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container px-4 py-16 md:py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-2/5 space-y-2 hero-content">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p className="text-xl md:text-2xl font-light">{description}</p>
          </div>

          <div className="w-full md:w-3/5 lg:w-3/5 xl:w-3/5 form-container">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#004260] text-white text-center py-4 text-xl font-bold">
                Find A Part Now
              </div>
              <div className="p-6 md:p-8 flex items-center justify-center">
                <div className="animate-pulse">Loading form...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main component that uses Suspense
export default function HeroSection({
  title = "Best Quality <br/><span class='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#004260]'>Used Auto Parts</span>",
  description = "Choose High Quality Recycled OEM Parts",
  background = "/stock-1updated.webp?height=600&width=1200",
  selectedMake = "Choose Your Car",
  selectedPart = "Choose Part",
}: {
  title?: string;
  description?: string;
  background?: string;
  selectedMake?: string;
  selectedPart?: string;
}) {
  return (
    <Suspense
      fallback={
        <HeroSectionFallback
          title={title}
          description={description}
          background={background}
        />
      }
    >
      <HeroSectionContent
        title={title}
        description={description}
        background={background}
        selectedMake={selectedMake}
        selectedPart={selectedPart}
      />
    </Suspense>
  );
} 