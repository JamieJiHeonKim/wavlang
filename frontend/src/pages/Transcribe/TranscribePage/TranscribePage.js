import { useState, useEffect } from 'react';
import './TranscribePage.scss';
import AudioPlayer from '../AudioPlayer';
import Transcribe from '../Whisper/TranscribeWhisper';
// import Transcribe from './assemblyAI/TranscribeAssembly';
import DropFileInput from '../DropFileInput/DropFileInput';
import Analysis from '../Analysis/Analysis';
import Alert from 'react-bootstrap/Alert';


function TranscribePage() {
    const [file, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [response, setResponse] = useState(null);
    const [scriptLoaded, setScriptLoaded] = useState(true);
    const [analysisType, setAnalysisType] = useState("Abstract Summary");
    const [transcriptionLoaded, setTranscriptionLoaded] = useState(false);
    const [keyPoints, setKeyPoints] = useState(null);
    const [analysisLoaded, setAnalysisLoaded] = useState(true);
    const [topic, setTopic] = useState(null);
    const [confirmation, setConfirmation] = useState(false);

    // props DropFileInput
    const onFileChange = (file) => {
        console.log(file);
        setFile(file);
        if (file) {
            setFileUploaded(true);
        }
    };

    const onAnalysisChange = (analysisType) => {
        setAnalysisType(analysisType);
        console.log(analysisType);
    }

    const handleTranscribeButton = (e) => {
        e.preventDefault();
        if(file) {
            if (window.confirm('If you are aware of the pricing and would like to proceed further, please click OK')) {
                setConfirmation(true);
            } else {
                setConfirmation(false);
            }
        } else {
            setConfirmation(true);
        }
    }

    const handleOverSizeFile = (audioFile) => {
        if(audioFile.size > 25000000) {
            return(
                <Alert key={'danger'} variant={'danger'}>
                    The uploaded file size exceeded Whisper AI's max file size (25MB).
                    Please split the audio file into shorter length.
                </Alert>
            )
        }
        else {
            return(
                <button type="submit" className="btn appointment-btn" onClick={handleTranscribeButton}>
                    Transcribe
                </button>
            )
        }
    }
    
    useEffect(() => {
        setConfirmation(false);
    }, [file, confirmation]);
    
    return (
        <section className='transcribe-section' >
            <div className='transcribe'>
                <h2 className='header'>
                    Transcription & Analysis
                </h2>
                <p>Please Select an Analysis Type & Topic Before Uploading an Audio File</p>
                <div className='main-page' data-aos="fade-up" data-aos-duration="2000">
                    <main>
                        <Analysis 
                            onAnalysisChange={(analysisType) => onAnalysisChange(analysisType)}
                        />
                        <br />
                        <div className='box'>
                            <p>
                                Upload an Audio File for Transcription
                            </p>
                            <DropFileInput 
                                onFileChange={(file) => onFileChange(file)}
                            />
                        </div>
                    { fileUploaded ? <AudioPlayer file={URL.createObjectURL(file)} fileName={file.name} /> : <></> }
                    {/* <button type="submit" className="btn appointment-btn" onClick={handleTranscribeButton}>
                        Transcribe
                    </button> */}
                    { file ? handleOverSizeFile(file) : null}
                    { confirmation ? <Transcribe file={file} analysisType={analysisType} topic={topic} /> : <Transcribe /> }
                    </main>
                </div>
            </div>
        </section>
    )
}

export default TranscribePage;