import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white w-full">
      <div className="container py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Parts Central LLC</h3>
            <p className="text-gray-400">
              76 Imperial Dr Suite E<br />
              Evanston, WY 82930, <br />
              USA
            </p>
            <p className="text-gray-400 mt-4 max-w-xs">
              Your trusted source for high-quality used OEM auto parts with a
              warranty and nationwide shipping
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">INFORMATION</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", link: "/about" },
                { name: "Contact Us", link: "/contact" },
                { name: "Privacy Policy", link: "/privacy-policy" },
                { name: "Shipping Policy", link: "/shipping-policy" },
                { name: "Refund/Return Policy", link: "/refund-policy" },
                { name: "Terms and Conditions", link: "/terms-and-conditions" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">HAVE QUESTIONS?</h3>
            <p className="text-gray-400">Call Now:</p>
            <p className="text-white text-lg font-bold">
              <Link
                href="tel:8883382540"
                className="hover:text-[#004260] transition"
              >
                (888) 338-2540
              </Link>
            </p>
            <p className="text-gray-400 mt-4">Email Us:</p>
            <p className="text-white">
              <Link
                href="mailto:partscentralus@gmail.com"
                className="hover:text-red-400 transition"
              >
                partscentralus@gmail.com
              </Link>
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, url: "https://facebook.com" },
                { Icon: Instagram, url: "https://instagram.com" },
                { Icon: Twitter, url: "https://twitter.com" },
                { Icon: Youtube, url: "https://youtube.com" },
              ].map(({ Icon, url }, index) => (
                <Link
                  key={index}
                  href={url}
                  aria-label="Social Media"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 border-t border-gray-800 py-6 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Parts Central. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
