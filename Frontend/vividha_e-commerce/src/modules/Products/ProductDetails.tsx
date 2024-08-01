import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types/productType";
import {
  Container,
  Typography,
  Grid,
  Chip,
  CardContent,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Webcam from "react-webcam";

// Container for the entire page
const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: calc(100vh - 100px); /* Adjust based on navbar/footer height */
`;

// Container for images to ensure fixed size
const StyledImageContainer = styled(Box)`
  width: 100%;
  max-width: 500px; /* Set maximum width for the image container */
  height: 400px; /* Set fixed height for the image container */
  position: relative; /* Position relative for positioning of child elements */
  overflow: hidden; /* Hide overflow to maintain aspect ratio */
  border-radius: 8px; /* Optional: rounded corners */
`;

// Style for the images to fit within the container
const StyledImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the container while maintaining aspect ratio */
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  max-width: 600px;
  .slick-prev,
  .slick-next {
    z-index: 1;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
`;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/product/getProductById/${id}`
        );
        if (response) {
          setProduct(response.data);
        }
      } catch (err) {
        console.log(err);
        throw new Error("Unable to fetch the details");
      }
    };
    fetchProductDetail();
  }, [id]);

  const handleCapture = (imageSrc: string | null) => {
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setShowWebcam(false);
    } else {
      console.error("Failed to capture image");
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
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ flexGrow: 1, pt: 2, pb: 2 }}>
      <StyledContainer>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7}>
            <StyledSlider {...sliderSettings}>
              {product.images.map((image, index) => (
                <div key={index}>
                  <StyledImageContainer>
                    <StyledImage src={image} alt={product.name} />
                  </StyledImageContainer>
                </div>
              ))}
            </StyledSlider>
          </Grid>
          <Grid item xs={12} md={5}>
            <CardContent className="text-center">
              <Typography variant="h4" className="font-bold mb-4">
                {product.name}
              </Typography>
              <Typography variant="h5" className="text-gray-700 mb-4">
                ${product.price}
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4">
                Category: {product.category}
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4">
                Availability: {product.available ? "In Stock" : "Out of Stock"}
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4">
                Stock: {product.stock}
              </Typography>
              <Grid container spacing={1} justifyContent="center">
                {product.sizes.map((size) => (
                  <Grid item key={size}>
                    <Chip label={size} />
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowWebcam(true)}
                sx={{ mt: 4 }}
              >
                Style Yours
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </StyledContainer>

      {/* Webcam Modal */}
      <Dialog
        open={showWebcam}
        onClose={() => setShowWebcam(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Capture Your Style</DialogTitle>
        <DialogContent>
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" style={{ width: "100%" }} />
          ) : (
            <Webcam
              audio={false}
              height={400}
              width={600}
              screenshotFormat="image/jpeg"
              onUserMediaError={() => alert("Unable to access webcam")}
              ref={(webcam) => {
                if (webcam) {
                  const captureButton = document.getElementById("capture");
                  if (captureButton) {
                    captureButton.addEventListener("click", () => {
                      const imageSrc = webcam.getScreenshot();
                      handleCapture(imageSrc);
                    });
                  }
                }
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          {capturedImage && (
            <Button onClick={handleUpload} color="primary" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
          )}
          <Button onClick={() => setShowWebcam(false)} color="secondary">
            Close
          </Button>
          {!capturedImage && (
            <Button id="capture" color="primary">
              Capture
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetails;
