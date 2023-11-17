import React from "react";
import { useRouteError } from "react-router-dom"


export default function Error() {
    const error = useRouteError()

    return (
        <>
            <h1>Sorry, there as been an error!</h1>
            <h3>Error status: {error.message}</h3>
        </>
        
    )
}