import React, {useState, useEffect} from "react";
import axios from "axios";
import "./ProductsPage.css";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState([]);
    const [lastPage, setLastPage] = useState([]);
    const [lastPageUrl, setLastPageUrl] = useState([]);
    const [prevPageUrl, setPrevPageUrl] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = (url = "http://localhost:8000/api/products") => {
        const token = localStorage.getItem("token");

        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(
                ({
                     data: {
                         data: products,
                         current_page,
                         total,
                         last_page,
                         last_page_url,
                         next_page_url,
                         from,
                         per_page,
                         prev_page_url,
                     },

                 }) => {
                    setCurrentPage(current_page);
                    setTotal(total);
                    setLastPage(last_page);
                    setProducts(products);
                    setLastPageUrl(last_page_url);
                    setPrevPageUrl(prev_page_url);
                    setNextPageUrl(next_page_url);
                }
            )
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <div className="products-page">
            <h2>Products</h2>

            <div className={"pagination"}>
                {prevPageUrl && (
                    <button
                        className="pagination-button"
                        onClick={() => fetchProducts(prevPageUrl)}
                    >
                        Back
                    </button>
                )}
        <span className="pagination-info">
          Page {currentPage} of {lastPage}
        </span>
        <span className="pagination-total">
    Total items: {total}
        </span>
                {nextPageUrl && (
                    <button
                        className="pagination-button"
                        onClick={() => fetchProducts(nextPageUrl)}
                    >
                        Next
                    </button>
                )}
            </div>
            {products.length === 0 && <p>No products available</p>}
            {products.length > 0 && (
                <ul className="product-list">
                    {products.map((product) => (

                        <li key={product.id} className="product-item">
                            <h3>{product.name}{console.log(product)}</h3>
                            <p>{product.description}</p>
                            <p>Price: {product.price} USD</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>
                                <img src={"https://picsum.photos/200?" + Math.random()}/>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            <div className={"pagination"}>
                {prevPageUrl && (
                    <button
                        className="pagination-button"
                        onClick={() => fetchProducts(prevPageUrl)}
                    >
                        Back
                    </button>
                )}
                <span className="pagination-info">
          Page {currentPage} of {lastPage}
        </span>
                <span className="pagination-total">
    Total items: {total}
        </span>
                {nextPageUrl && (
                    <button
                        className="pagination-button"
                        onClick={() => fetchProducts(nextPageUrl)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
