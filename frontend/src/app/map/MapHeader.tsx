import React from "react";
import Link from "next/link";

export default function MapHeader() {
  return (
    <header>
      <nav className="relative flex bg-white shadow-sm px-8">
        <div className="container mx-auto flex items-center content-center">
          <Link
            href="/dashboard"
            className="flex items-center text-sm text-brand-400 hover:text-brand-500"
          >
            {/*<app-icon name="arrow_back" className="text-brand-400">
                <span className="material-icons-round">arrow-left</span>
            </app-icon>*/}
            <span className="ml-2 hidden md:inline">Back to Dashboard</span>
          </Link>
          <div className="flex items-center content-center flex-grow justify-center lg:w-auto gap-2">
            {/*<Image className="h-12 my-2 self-center mr-2" src="../../assets/Neolook_logo.webp">Neolook Logo</Image>*/}
            <h2 className="mb-0">Neolook</h2>
            {/*<span className="text-light" style="font-weight: 500; color: rgba(88, 172, 198, 1)">Professional</span>*/}
          </div>
          <ul className="flex">
            <li className="nav-item block">
              <Link
                href="/login"
                className="flex items-center text-sm text-neutral-400 hover:text-neutral-500"
              >
                {/*<app-icon name="logout" className="text-neutral-400" ng-reflect-name="group">
                        <span className="material-icons-round">group</span>
                    </app-icon>*/}
                <span className="ml-2 hidden md:inline">Log out</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
