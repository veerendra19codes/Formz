import React from 'react'
import useDesigner from './hooks/useDesigner'
import { FormElements } from './FormElements';
import { Button } from './ui/button';
import { AiOutlineClose } from "react-icons/ai";

function PropertiesFormSidebar() {
    const { selectedElement, setSelectedElement } = useDesigner();
    if (!selectedElement) return null;

    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;

    return (
        <div className="flex flex-col p-2">
            <div className="flex justify-between items-center">
                <p className="text-sm text-foreground">Element Properties</p>
                <Button size={"icons"}
                    variant={"ghost"}
                    onClick={() => {
                        setSelectedElement(null);
                    }}>
                    <AiOutlineClose />
                </Button>
            </div>
            <PropertiesForm elementInstance={selectedElement} />
        </div>
    )
}

export default PropertiesFormSidebar
