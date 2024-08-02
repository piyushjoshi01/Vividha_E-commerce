import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import Webcam from "react-webcam";
import axios from "axios";

interface WebcamCaptureProps {
  open: boolean;
  onClose: () => void;
  onCapture: (imageSrc: string) => void;
}

const StyleYours: React.FC<WebcamCaptureProps> = ({
  open,
  onClose,
  onCapture,
}) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      onCapture(imageSrc);
    } else {
      console.error("Failed to capture image");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCapturedImage(base64String);
        onCapture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!capturedImage) {
      console.error("No image captured");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://ncwop1k0f6.execute-api.us-east-1.amazonaws.com/dev/image",
        { image: capturedImage },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Capture Your Style</DialogTitle>
      <DialogContent>
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" style={{ width: "100%" }} />
        ) : (
          <Box>
            <Webcam
              audio={false}
              height={400}
              width={600}
              screenshotFormat="image/jpeg"
              onUserMediaError={() => alert("Unable to access webcam")}
              ref={webcamRef}
            />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {capturedImage && (
          <Button onClick={handleUpload} color="primary" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        )}
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        {!capturedImage && (
          <>
            <Button onClick={handleCapture} color="primary">
              Capture
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              color="primary"
            >
              Use Mobile Camera
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StyleYours;
