// initializing installed dependencies
const express = require('express');
const cors = require('cors');
const multer = require('multer')
const FormData = require('form-data');
const { Readable } = require('stream');
const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffmetadata = require('ffmetadata');
const path = require('path');
const fileUpload = require('express-fileupload');
// const fs = require("fs").promises;

require('dotenv').config()

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
};
const apiKey = process.env.REACT_APP_ASSEMBLY_API_KEY;
const baseUrl = 'https://api.assemblyai.com/v2';

const headers = {
    authorization: apiKey
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());

const bufferToStream = (buffer) => {
    return Readable.from(buffer);
}

/**
 * Convert a time string of the format 'mm:ss' into seconds.
 * @param {string} timeString - A time string in the format 'mm:ss'.
 * @return {number} - The time in seconds.
 */
const parseTimeStringToSeconds = timeString => {
    const [minutes, seconds] = timeString.split(':').map(tm => parseInt(tm));
    return minutes * 60 + seconds;
}

const upload = multer();
ffmpeg.setFfmpegPath(ffmpegPath);

app.get('/', (req, res) => {
    res.send('Welcome to the Whisper Text-to-Speech API!');
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function getFiles(audioStream, tempFileName, endTime, outputFileName, timeDuration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            audioStream.pipe(fs.createWriteStream(tempFileName))
            .on('finish', () => {
                ffmetadata.read(tempFileName, (err, metadata) => {
                    if (err) reject(err);
                    const duration = parseFloat(metadata.duration);
                    if (endTime > duration) endTime = duration;

                    ffmpeg(tempFileName)
                        .setStartTime(startSeconds)
                        .setDuration(timeDuration)
                        .output(outputFileName)
                        .on('end', () => {
                            fs.unlink(tempFileName, (err) => {
                                if (err) console.error('Error deleting temp file:', err);
                            });

                            const trimmedAudioBuffer = fs.readFileSync(outputFileName);
                            fs.unlink(outputFileName, (err) => {
                                if (err) console.error('Error deleting output file:', err);
                            });

                            resolve(trimmedAudioBuffer);
                        })
                        .on('error', reject)
                        .run();
                });
            })
            .on('error', reject);
        }, 100000);
    });
};

function getAssemblyAIFile (audioData) {
    const res = axios.post(`${baseUrl}/upload`, audioData, {
        headers
    });
    return(res);
};

app.post('/api/transcribe_assemblyai', async (req, res) => {
    try {
        if (!req.files || !req.files.audioFile) {
            return res.status(400).json({ message: 'Audio file is required.' });
        }

        const audioFile = req.files.audioFile;
        const uploadResponse = await getAssemblyAIFile(audioFile.data);
        const uploadUrl = uploadResponse.data.upload_url;

        const data = {
            audio_url: uploadUrl,
            speaker_labels: true
        };

        const url = `${baseUrl}/transcript`;
        const response = await axios.post(url, data, { headers: headers });
        const transcriptId = response.data.id;
        const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`;

        while (true) {
            const pollingResponse = await axios.get(pollingEndpoint, { headers: headers });
            const transcriptionResult = pollingResponse.data;
            // const transcriptionHighlight = pollingResponse.data.auto_highlights_result;
            // console.log("transcriptionHighlight:", transcriptionHighlight);

            // if (transcriptionResult.status === 'completed' && transcriptionHighlight.status === 'success') {
            if (transcriptionResult.status === 'completed') {
                // console.log(transcriptionResult);
                // for (const utterance of transcriptionResult.utterance) {
                //     console.log(`Speaker ${utterance.speaker}: ${utterance.text}`)
                // }
                console.log(transcriptionResult.text);
                return res.json({ transcriptionResult, transcriptionHighlight });
            } else if (transcriptionResult.status === 'error') {
                throw new Error(`Transcription failed: ${transcriptionResult.error}`);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/transcribe_file', upload.single('file'), async (req, res) => {
    const audioFile = req.file;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    if (!audioFile) {
        res.status(400).json({ message: 'Audio file is required.' });
        return;
    }

    if (!startTime || !endTime) {
        res.status(400).json({ message: 'Start and end times are required.' });
        return;
    }

    // Parse and calculate the duration
    const startSeconds = parseTimeStringToSeconds(startTime);
    const endSeconds = parseTimeStringToSeconds(endTime);
    const timeDuration = endSeconds - startSeconds;

    try {
        const audioFile = req.file;
        if (!audioFile) {
            return res.status(400).json({ error: 'No audio file provided' });
        }
        console.log("audioFile:", audioFile);
        const audioStream = Readable.from(audioFile.buffer);
        console.log('audioStream:', audioStream);

        const trimAudio = async (audioStream, endTime) => {
            const tempFileName = `temp-${Date.now()}.mp3`;
            const outputFileName = `output-${Date.now()}.mp3`;
            getFiles(audioStream, tempFileName, endTime, outputFileName, timeDuration);
            
        };

        const trimmedAudioBuffer = await trimAudio(audioStream, endTime);

        // Call the OpenAI Whisper API to transcribe the audio file
        const formData = new FormData();
        formData.append('file', trimmedAudioBuffer, { filename: 'audio.mp3', contentType: audioFile.mimetype });
        formData.append('model', 'whisper-1');
        formData.append('response_format', 'json');
        console.log("formData:", formData);

        const config = {
            headers: {
                "Content-Type": `multipart/form-data; charset=UTF-8; boundary=${formData._boundary}`,
                "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
        };

        const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, config);
        const transcription = response.data.text;


        res.json({ transcription });
    } catch (error) {
        res.status(500).json({ error: 'Error transcribing audio' })
        console.log(error);
    }
});

app.post('/api/transcribe_whisperai', upload.single('file'), async (req, res) => {
    const model = req.body.model;
    const file = req.body.file;
    const response_format = req.body.response_format;
    const initial_prompt = req.body.initial_prompt;
    const verbose = req.body.verbose;

    try{
        const formData = new FormData();
        formData.append("model", model);
        formData.append("file", file);
        formData.append("response_format", response_format);
        formData.append("initial_prompt", initial_prompt);
        formData.append("verbose", verbose);
        // formData.append("language", language);
        setScriptLoaded(false);
        await axios
            .post("https://api.openai.com/v1/audio/transcriptions", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                // setResponse(res.data);
                // setAnalysisLoaded(false);
                // setScriptLoaded(true);
                // getAnalysisType(res, topic);
            })
            .catch((err) => {
                console.log(err)
                // setScriptLoaded(true);
            });
    } catch (error) {
        throw error;
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});