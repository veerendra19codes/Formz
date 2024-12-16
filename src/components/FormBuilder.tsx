"use client";

import { Form } from '@prisma/client'
import React from 'react'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishFormBtn from './PublishFormBtn'
import Designer from './Designer'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'

function FormBuilder({ form }: { form: Form }) {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, //10px;
        }
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300, // 300 ms
            tolerance: 5, // 5px
        }
    })

    const sensors = useSensors(mouseSensor, touchSensor);
    return (
        <DndContext sensors={sensors}>
            <main className="flex flex-col size-full flex-grow">
                <nav className="flex justify-between border-b-2 gap-3 p-4 items-center">
                    <h2 className='truncate font-medium'>
                        <span className="to-muted-foreground">
                            Form:
                        </span>
                        {form.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <PreviewDialogBtn />
                        {!form.published && (
                            <>
                                <SaveFormBtn />
                                <PublishFormBtn />
                            </>
                        )}
                    </div>
                </nav>
                <div className="flex size-full  flex-grow items-center justify-center relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    )
}

export default FormBuilder
