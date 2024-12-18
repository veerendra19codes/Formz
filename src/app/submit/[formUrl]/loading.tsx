import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

function loading() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <ImSpinner2 className="animate-spin size-12" />
        </div>
    )
}

export default loading
