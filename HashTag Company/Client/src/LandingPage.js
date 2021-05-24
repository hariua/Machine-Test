import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

export default function LandingPage() {
    let history = useHistory()
    useEffect(()=>
    {
        history.push('/summaryFilter=All')
    })
    return (
        <div>
            
        </div>
    )
}
