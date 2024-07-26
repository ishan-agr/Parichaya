import React, { useState, useEffect } from 'react';
import { VerifyYourIdentity } from '../../Components/verifyYourIdentity';
import { ClickPhoto } from '../../Components/clickPhoto';
import { useNavigate } from 'react-router-dom'; // For navigation
import { ToastContainer, toast } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Import styles for Toastify
import './SelfieScreen.css';

const SelfieScreen = () => {
    const [mode, setMode] = useState('photo'); // 'photo' or 'video'
    const [videoUrl, setVideoUrl] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        sessionStorage.setItem('camera_origin', 'takeselfie');
        sessionStorage.setItem('currentPage', '/takeselfie');
        sessionStorage.setItem('/camera', JSON.stringify(false));
        document.getElementsByTagName("HTML")[0].setAttribute("data-theme", localStorage.getItem("theme"));
    }, []);

    const switchMode = (mode) => {
        setMode(mode);
    }

    const handleVideoCapture = (event) => {
        const file = event.target.files[0];
        const videoUrl = URL.createObjectURL(file);
        setVideoUrl(videoUrl);
        setVideoFile(file);
    }

    const uploadVideo = () => {
        if (videoFile) {
            const formData = new FormData();
            formData.append('video', videoFile);

            fetch('http://localhost:8000/api/upload-video', { // Ensure the URL is correct
                method: 'POST',
                body: formData,
            }).then(response => response.json())
            .then(data => {
                console.log('Video uploaded:', data);
                toast.success('Video uploaded successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    onClose: () => navigate('/verifyselfie') // Redirect after toast
                });
            }).catch(error => {
                console.error('Error uploading video:', error);
                toast.error('Failed to upload video.');
            });
        }
    }

    return (
        <div className="">
            <VerifyYourIdentity selfie={true} />
            <div className="selfieDummyBody">
                <div className="card-body txt-clr">
                    <span className="h6 text-muted">Verify your identity</span>
                    <br />
                    <span className="text-muted">Please upload a selfie or video for KYC verification</span>
                    <br /><br />
                    <div className="mode-toggle">
                        <button onClick={() => switchMode('photo')} className={mode === 'photo' ? 'active' : ''}>Photo</button>
                        <button onClick={() => switchMode('video')} className={mode === 'video' ? 'active' : ''}>Video</button>
                    </div>
                    {mode === 'photo' && (
                        <>
                            <ClickPhoto current="/takeselfie" next="/verifyselfie" />
                            {/* <img className="card-img-top" src="./selfie.png " alt="Card image" height="325" /> */}
                        </>
                    )}
                    {mode === 'video' && (
                        <>
                            <input type="file" accept="video/*" onChange={handleVideoCapture} />
                            {videoUrl && (
                                <video width="320" height="240" controls>
                                    <source src={videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            <button onClick={uploadVideo}>Upload Video</button>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SelfieScreen;
