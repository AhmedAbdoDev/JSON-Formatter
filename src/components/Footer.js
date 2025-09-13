/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 p-8 mt-auto">
      <div className="container mx-auto text-center">
        {/* About Me Section Content */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed">
            This is a simple yet powerful web tool designed to help developers
            format, validate, and view JSON data. It's a personal project built
            with Next.js and Tailwind CSS.
          </p>
        </div>

        {/* Quick Links & Connect Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          {/* Connect Links */}
          <div className="flex justify-center space-x-4 text-sm">
            <a
              href="https://github.com/AhmedAbdoDev"
              className="hover:text-white transition-colors"
              target="_blank"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/3bkrenoDev"
              className="hover:text-white transition-colors"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              href="https://ahmedabdodev.github.io/Portfolio"
              className="hover:text-white transition-colors"
              target="_blank"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-4 border-t border-gray-700 text-sm">
        &copy; {new Date().getFullYear()} JSON Formatter. All Rights Reserved.
      </div>
    </footer>
  );
}
