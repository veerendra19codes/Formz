import { Form } from '@prisma/client'
import React from 'react'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishFormBtn from './PublishFormBtn'
import Designer from './Designer'
import { DndContext } from '@dnd-kit/core'

function FormBuilder({ form }: { form: Form }) {
    return (
        <DndContext>


            <main className="flex flex-col w-full">
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
                <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
                    <Designer />
                </div>
            </main>
        </DndContext>
    )
}

export default FormBuilder
