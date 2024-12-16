"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text Field",
    helperText: "Helper text",
    required: false,
    placeHolder: "Value here...",
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(5),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(5),
})

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Fields",
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>form Component</div>,
    propertiesComponent: PropertiesComponent,
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}

type propertiesFormSchemaType = s.infer<typeof propertiesSchema>;
function PropertiesComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();

    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { label, required, helperText, placeHolder } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
                placeHolder
            }
        })
    }
    return <div>Form Properties for {element.extraAttributes.label}</div>
};


function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeHolder} />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    )
}