import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function SiteHeader() {
  return (
    <header className="shadow z-40">
      <nav className="flex justify-center items-center relative h-16 mx-8">
        {/* Main logo and title */}
        <Link href="/" className="flex gap-2">
          <Image src="/favicon.ico" alt="GPX Editor" width={32} height={32} />
          <span className="text-2xl font-semibold hover:text-gray-700">
            GPX Editor
          </span>
        </Link>

        {/* Navigation links */}
        <div className="absolute right-0 gap-6 items-center hidden md:flex">
          <div className="">
            <Link href="/login" className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faUser} />
              <span className="header-link">Account</span>
            </Link>
          </div>

          <div className="">
            <Link
              href="https://github.com/Japsert/gpx-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
              <span className="header-link">GitHub</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="absolute right-0 block md:hidden">
          <button className="flex items-center justify-center w-10 h-10">
            <FontAwesomeIcon icon={faBars} size="xl" />
          </button>
        </div>
      </nav>
    </header>
  );
}
