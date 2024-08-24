import axios from "axios";
import { useEffect, useState } from "react";
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
} from "@mui/material";
import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StyleYours from "./StyleYours";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  // Replace with actual username from auth context or state
  const apiUrl = `http://BackendLoadBalancer-1876345350.us-east-1.elb.amazonaws.com/product/getProductById/${id}`;
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(apiUrl);
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

  const handleCapture = (imageSrc: string) => {
    console.log("Captured image:", imageSrc);
    // You can handle the captured image here if needed
  };
  const apiUrl1 =
    "http://BackendLoadBalancer-1876345350.us-east-1.elb.amazonaws.com/product/purchaseProduct";

  const handleOrder = async () => {
    try {
      const orderData = {
        username: "Piyush",
        productname: product?.name,
        amount: product?.price,
      };

      const response = await axios.post(apiUrl1, orderData);

      if (response.status === 201) {
        toast.success("Order placed successfully!");

        // Additional API call with purchase details
        const purchaseDetailsApiUrl =
          "https://k5rvdjbm98.execute-api.us-east-1.amazonaws.com/prod/publish-purchase";
        const purchaseDetails = {
          purchaseDetails: {
            userEmail: "piyushjoshi280601@gmail.com",
            itemName: product?.name,
            amount: product?.price,
          },
        };

        const purchaseResponse = await axios.post(
          purchaseDetailsApiUrl,
          purchaseDetails
        );

        if (purchaseResponse.status === 201) {
          toast.success("Purchase details recorded successfully!");
        } else {
          toast.error("Failed to record purchase details.");
        }
      } else {
        toast.error("Failed to place the order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order.");
    }
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
              {Array.isArray(product.images) ? (
                product.images.map((image, index) => (
                  <div key={index}>
                    <StyledImageContainer>
                      <StyledImage src={image} alt={product.name} />
                    </StyledImageContainer>
                  </div>
                ))
              ) : (
                <div>
                  <StyledImageContainer>
                    <StyledImage src={product.images} alt={product.name} />
                  </StyledImageContainer>
                </div>
              )}
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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOrder}
                sx={{ mt: 4, ml: 2 }}
              >
                Order Now
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </StyledContainer>

      <StyleYours
        open={showWebcam}
        onClose={() => setShowWebcam(false)}
        onCapture={handleCapture}
      />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </Box>
  );
};

export default ProductDetails;
