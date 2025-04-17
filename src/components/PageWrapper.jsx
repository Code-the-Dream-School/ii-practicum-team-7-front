import React from "react";



function PageWrapper({children}) {
    return (
        <>
            <h1>Header</h1>
            {children}
            <h2>Footer</h2>
            
        </>
    )
}

export default PageWrapper