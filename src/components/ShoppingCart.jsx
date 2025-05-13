import { Offcanvas,Button, ListGroup, Image } from "react-bootstrap";
import { useCart } from "./CartContext";
import { useState } from "react";

function ShoppingCart(){
    const { cart, dispatch } = useCart();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
        <Button variant='primary' onClick={handleShow}> Cart ({cart.items.lenght})</Button>
        <Offcanvas show={show} onHide={handleClose} placement="start">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cart.items.lenght === 0 ? (
                    <p>Get something to your Cart</p>
                ) : (
                    <ListGroup>
                            {cart.items.map(item => (
                                <ListGroup.Item key={item.id} className="d-flex align-items-center">
                                    <Image src={item.image} alt={item.title} style={{ width: "50px", marginRight: "10px" }} />
                                    <div>
                                        <h6>{item.title}</h6>
                                        <p>Price: ${item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="ms-auto"
                                        onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                                    >
                                        Remove
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    <hr />
                    <h5>Total: ${totalPrice.toFixed(2)}</h5>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ShoppingCart;