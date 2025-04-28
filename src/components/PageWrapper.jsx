import React from "react";
import Navbar from "./landing/Navbar";
import FooterSection from "./landing/FooterSection";


function PageWrapper({children}) {
    return (
        <>
            <div className="pagewrapper">
            <Navbar />
            {children}
            <FooterSection />
            </div>
            
        </>
    )
}

export default PageWrapper