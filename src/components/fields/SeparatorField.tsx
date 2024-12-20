"use client";

import { RiSeparator } from "react-icons/ri";
import { ElementsType, FormElement } from "../FormElements";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
}

function PropertiesComponent() {
    return <p>No properties for this field</p>
};

function DesignerComponent() {

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">Separator Field</Label>
            <Separator />
        </div>
    )
}

function FormComponent() {
    return <Separator />
}