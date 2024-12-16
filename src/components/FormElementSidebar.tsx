import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from './FormElements'

function FormElementSidebar() {
    return (
        <div>
            Elements
            <SidebarBtnElement formElement={FormElements.TextField} />
        </div>
    )
}

export default FormElementSidebar
