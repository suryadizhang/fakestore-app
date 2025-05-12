import { Link } from "react-router-dom";

function Home() {

    return (
        <>
            <h1 className="my-5">Welcome</h1>
            <Link className="custom-button" to="/products">View all products</Link>
        </>
    )
}

export default Home;