import React from "react";
import { TextFieldFormElement } from "./fields/TextField";
import { IconType } from "react-icons/lib";

export type ElementsType = "TextField";

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: IconType;
        label: string;
    }

    designerComponent: React.FC;
    formComponent: React.FC;
    propertiesComponent: React.FC;
}

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}

type FormElementsType = {
    [key in ElementsType]: FormElement;
}

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement
}