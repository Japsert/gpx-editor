import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function SiteHeader() {
  return (
    <header className="header px-8">
      <nav className="flex justify-center items-center relative h-16">
        {/* Main logo and title */}
        <div className="absolute">
          <Link href="/" className="flex gap-2">
            <Image src="/favicon.ico" alt="GPX Editor" width={32} height={32} />
            <span className="text-2xl font-semibold hover:text-gray-700">GPX Editor</span>
          </Link>
        </div>
        
        {/* Navigation links */}
        <div className="absolute right-0 flex gap-6 items-center">
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
      </nav>
    </header>
  );
}
