import React from "react";
import Navbar from './components/Navbar';
import FooterSection from './components/FooterSection';

function PageWrapper({children, loggedIn, setLoggedIn, setUser, user}) {
    return (
        <>
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} user={user}/>
            <main>{children}</main>
            <FooterSection />
        </>
    )
}

export default PageWrapper