import React from "react";
import Navbar from "./landing/Navbar";
import FooterSection from "./landing/FooterSection";


function PageWrapper({children}) {
    return (
        <>
            <div className="flex flex-col min-h-screen mx-auto">
            <Navbar />
            <main className="flex-1 w-full text-center">
            {children}
            </main>
            <FooterSection />
            </div>
        </>
    )
}

export default PageWrapper
