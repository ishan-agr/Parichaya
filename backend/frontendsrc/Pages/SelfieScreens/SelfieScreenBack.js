import React, { Component } from 'react';
import { VerifyYourIdentity } from '../../Components/verifyYourIdentity';
import { RetakeLooksGood } from '../../Components/retakeLooksGood';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles for Toastify
import './SelfieScreen.css';

class SelfieScreenBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: null,
            videoFrame: null,
            isLoading: true, // Track loading state
            isVerified: false, // Track verification status
        };
    }

    componentDidMount() {
        document.getElementsByTagName("HTML")[0].setAttribute("data-theme", localStorage.getItem("theme"));
        
        // Fetch the video URL and verification status from the backend
        this.fetchVideoUrl();
    }

    fetchVideoUrl = () => {
        // Replace with your Django endpoint
        fetch('http://localhost:8000/api/get-latest-video-url/')
            .then(response => response.json())
            .then(data => {
                const { videoUrl, isVerified } = data;
                if (videoUrl) {
                    this.setState({ videoUrl, isVerified }, () => {
                        // Extract video frame once URL is set
                        this.extractVideoFrame();
                    });
                } else {
                    this.setState({ isLoading: false });
                    console.error('No video URL returned from server');
                }
            })
            .catch(error => {
                console.error('Error fetching video URL:', error);
                this.setState({ isLoading: false }); // Stop loading in case of error
            });
    };

    extractVideoFrame = () => {
        const video = document.createElement('video');
        video.src = this.state.videoUrl;
        video.crossOrigin = 'anonymous';
        video.controls = false;
        video.muted = true; // Mute the video to avoid sound issues

        video.addEventListener('loadeddata', () => {
            if (video.readyState >= 2) { // Check if video is ready
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                this.setState({
                    videoFrame: canvas.toDataURL('image/png'),
                    isLoading: false, // Set loading to false once frame is ready
                });
                
                // Show toast notification based on verification status
                if (this.state.isVerified) {
                    toast.success('Face Verified successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else {
                    toast.error('Face not verified. Please retake the selfie.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            } else {
                console.error('Video not ready for frame extraction');
                this.setState({ isLoading: false });
            }
        });

        video.addEventListener('error', (event) => {
            console.error('Error playing video:', event);
            this.setState({ isLoading: false });
        });

        video.play().catch(error => {
            console.error('Error playing video:', error);
            this.setState({ isLoading: false });
        });
    };

    handleLooksGood = () => {
        this.props.history.push('/verifyGovernmentIDFront'); // Navigate to the correct page
    };

    handleRetake = () => {
        this.props.history.push('/takeselfie');
    };

    render() {
        const { videoFrame, isLoading, isVerified } = this.state;

        return (
            <div className="">
                <VerifyYourIdentity selfie={true} />
                <div className="selfieRealBody">
                    <div className="card-body">
                        <span className="h6 text-muted">Your selfie</span>
                        <br />
                        <span className="text-muted">Make sure your whole face is visible without any glare or blur</span>
                        <br />
                        <br />
                        {isLoading ? (
                            <div className="text-center">
                                <p>Loading video frame...</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                {videoFrame ? (
                                    <>
                                        <img className='responsive' src={videoFrame} alt="Video frame" height="auto" width="95%" />
                                        <p>{isVerified ? 'Face Verified' : 'Face Not Verified'}</p>
                                    </>
                                ) : (
                                    <p>No video frame available</p>
                                )}
                            </div>
                        )}
                    </div>
                    <RetakeLooksGood
                        current='/verifyselfie'
                        looksGoodPath='/takeGovernmentIDFront' // Ensure this is the correct path
                        onLooksGood={this.handleLooksGood}
                        onRetake={this.handleRetake}
                    />
                </div>
                <ToastContainer /> {/* Add ToastContainer to render toasts */}
            </div>
        );
    }
}

export default SelfieScreenBack;
