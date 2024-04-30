import React from "react"
const Input = () => {
    return (
        <div>
            <label htmlFor="hs-trailing-button-add-on" className="sr-only">Label</label>
            <div className="flex rounded-lg shadow-sm">
                <input
                    type="text"
                    id="hs-trailing-button-add-on"
                    name="hs-trailing-button-add-on"
                    className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
                <button
                    type="button"
                    className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                    Button
                </button>
            </div>
        </div>
    )
}

export default Input