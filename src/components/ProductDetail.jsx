import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Added Link
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useCart } from "../components/CartContext"; // Fixed import path

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useCart(); // Access dispatch function from CartContext
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load product details.");
                setLoading(false);
            });
    }, [id]);

    const deleteProduct = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios
                .delete(`https://fakestoreapi.com/products/${id}`)
                .then(() => {
                    setDeleted(true);
                    setTimeout(() => navigate("/products"), 2000);
                })
                .catch((error) => {
                    setError("Failed to delete product. Please try again.");
                });
        }
    };

    const addToCart = () => {
        if (product) {
            dispatch({ type: "ADD_TO_CART", payload: product });
        }
    };

    if (loading) return <p>Loading product...</p>;
    if (error) return <p>{error}</p>;
    if (deleted) return <Alert variant="success">Product deleted successfully!</Alert>;

    return (
        <Container className="mt-5">
            <Card>
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>Category: {product.category}</Card.Text>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Button variant="primary" className="me-2" onClick={addToCart}>
                        Add to Cart
                    </Button>
                     {/* Edit Product Button */}
                    <Link to={`/editproduct/${id}`}>
                    <Button variant="warning" className="me-2">Edit Product</Button>
                    </Link>
                    <Button variant="danger" className="me-2" onClick={deleteProduct}>
                        Delete Product
                    </Button>
                </Card.Body>
            </Card>
            <Button variant="link" onClick={() => navigate("/products")} className="mt-3">
                Back to Products
            </Button>
        </Container>
    );
}

export default ProductDetails;