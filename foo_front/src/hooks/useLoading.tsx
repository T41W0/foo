import { useState } from "react"


export const useLoading = (initialState: boolean) => {
    const [loading, setLoading] = useState(initialState);

    return [loading, setLoading];
}