import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

function Home() {

    return (
        <Container className="text-center mt-5">
            <h1>Welcome to FakeStore</h1>
            <p className="mb-4">Explore a wide variety of products at unbeatable prices.</p>
            <Link to="/products">
                <Button variant="primary">Go to Product Listing</Button>
            </Link>
        </Container>
    )
}

export default Home;