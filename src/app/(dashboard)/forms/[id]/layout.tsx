import React, { ReactNode } from 'react'

function layout({ children }: { children: ReactNode }) {
    // console.log("children:", children);
    return (
        <div className="flex flex-col flex-grow mx-auto px-4 md:mx-8">
            {children}
        </div>
    )
}

export default layout
