"use client";

import React from 'react'
import useDesigner from './hooks/useDesigner';
import PropertiesFormSidebar from './PropertiesFormSidebar';
import FormElementSidebar from './FormElementSidebar';

function DesignerSidebar() {
    const { selectedElement } = useDesigner();
    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
            {selectedElement && <PropertiesFormSidebar />}
            {!selectedElement && <FormElementSidebar />}

        </aside>
    )
}

export default DesignerSidebar
