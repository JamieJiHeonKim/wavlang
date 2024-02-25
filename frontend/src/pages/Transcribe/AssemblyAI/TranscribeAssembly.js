import { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_ASSEMBLY_API_KEY;

function TranscribeAssemblyAI({file}) {
    const [result, setResult] = useState(null);
    const [isDone, setIsDone] = useState(false);

    const run = async () => {
        const formData = new FormData();
        formData.append('audioFile', file);
        try {
            const response = await fetch(`http://localhost:8080/api/transcribe_assemblyai`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const res = await response.json()
                setIsDone(true);
                setResult(res.transcriptionResult.text);
            } else {
                console.error('Transcription failed:', response);
            }
        } catch (error) {
            console.error('Error submitting audio file:', error);
        }
    };

    useEffect(() => {
        if (!file) {
            return;
        }
        run();
    }, [file])

    return(
        <div>
            {result}
        </div>
    )
}

export default TranscribeAssemblyAI;
