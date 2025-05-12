import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button"
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleted, setDeleted] = useState(false);

    /*
    This is a function to delete a product. It makes an HTTP delete request to the FakeStoreAPI and passes in the product id to delete
    the desired product.
    */
    const deleteProduct = () => {
        axios.delete(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setDeleted(true);
                console.log("Product " + id + " has been deleted.")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    {/* 
        Upon any detected changes in the state of 'id', make an HTTP GET request to FakeStoreAPI 
        to retrieve the product details for that particular product id.
        Then, save the result in the 'product' variable. 
    */}
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load product details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;
    if (deleted) return (
        <Alert variant="success">
            Product has been deleted successfully!
        </Alert>
    );

    return (
        <Container>
            <Card className="product-card">
                <Card.Img className="product-image" variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>${product.price}</Card.Text>
                    <Card.Text>{product.category}</Card.Text>
                    <Button className="mx-2">Add to Cart</Button>
                    <Button onClick={deleteProduct}>Delete Product</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ProductDetails;