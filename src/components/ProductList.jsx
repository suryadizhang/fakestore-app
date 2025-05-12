import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    {/* useEffect only runs once on the initial component render, at least if you have an empty dependency array.
        If we add other variables into the dependency array, then we list them as dependencies. And if the value of any dependency
        changes, then useEffect() runs again. */}
    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch products.");
                setLoading(false);
            })
    }, []);

    if (loading) return <p>Loading products...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <Container>
                <Row>
                    {products.map((product) => (
                        // A key is a special prop that React uses to keep track of which items in a list have been modified.
                        // This helps improve performance & prevent errors.
                        // It is also good practice to utilize unique ids in a list.
                        // md is a Bootstrap property that defines how much space this column will take up.
                        <Col key={product.id} md={4} className="mb-3">
                            <Card>
                                <Card.Img variant="top" src={product.image} alt={product.title} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>${product.price}</Card.Text>
                                </Card.Body>
                                <Link className="custom-button" to={`/products/${product.id}`}>View Details</Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default ProductList;