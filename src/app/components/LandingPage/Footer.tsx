import React from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 px-2 sm:px-6 py-12 bg-[#272932]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Rocket className="mr-2 text-[#711381]" size={30} strokeWidth={2} />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#711381] to-purple-600">
              ProfileX
            </span>
          </div>
          <p className="text-gray-400">
            Empowering professionals to showcase their best work.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-[#711381]">Platform</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/templates"
                className="text-gray-400 hover:text-white"
              >
                Templates
              </Link>
            </li>
            <li>
              <Link href="/features" className="text-gray-400 hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-gray-400 hover:text-white">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-[#711381]">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-gray-400 hover:text-white">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-[#711381]">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/help" className="text-gray-400 hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 pt-8 border-t border-gray-800 text-gray-500">
        © {new Date().getFullYear()} ProfileX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
