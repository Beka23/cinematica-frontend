import React, { useState } from "react"

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'



function Search({ search, setSearch, voiceSearch, setVoiceSearch }) {

    const commands = [
        {
            command: [],
            callback: (redirectPage) => setRedirectURrl(redirectPage)
        }
    ]


    const { transcript } = useSpeechRecognition({ commands })
    const [redirectUrl, setRedirectURrl] = useState(" ")

    return (
        <div className="search">
            <input
                type="text"
                placeholder="🔎Find movies"
                value={search}
                onInput={(e) => setSearch(e.target.value)}
                onChange={setVoiceSearch(transcript)}
            >
            </input>
            
        </div>
    )
}

export default Search;

