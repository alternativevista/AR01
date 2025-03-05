//import the necessary Camera Kit modules.
import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D
} from '@snap/camera-kit'

//Create an async function to initialize the Camera Kit and start the video stream.
(async function() {
    //Bootstrap the Camera Kit using your API token.
    const cameraKit = await bootstrapCameraKit({
        apiKey: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQxMjA3NzY0LCJzdWIiOiJlOTc3YTJkNi05NWZhLTRmNTktOGNjNC1kMTU1YTdjZWI1MWR-U1RBR0lOR35kZWI5OThlMy0yN2MxLTRhMDktYjkwZi1hOGM1YTA4ZjJkNGIifQ.hV3NZWiLyTmXkX4H8w0oC0CtnbecyvuueCRDPW6uwWo'
    });
        
    //Create a new CameraKit session.
    const session = await cameraKit.createSession();

    //Replace the 'canvas' element with the live output from the CameraKit session.
    document.getElementById('canvas').replaceWith(session.output.live);

    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['230ef1b3-128a-4f79-bbeb-ce0c82b32767']);

    //Create a new media stream source from the first lens in the group.
    session.applyLens(lenses[0]);
    let mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'environment'
        }
    });

    //Create a CameraKit media stream source from the media stream.
    const source = createMediaStreamSource(
        mediaStream, {

            cameraType: 'back'
        }
    );

    //Add the source to the CameraKit session.
    await session.setSource(source);

//Set the render size of the CameraKit session to the size of the browser window.
session.source.setRenderSize( window.innerWidth, window.innerHeight);

    //Start the CameraKit session.
    session.play();
})();