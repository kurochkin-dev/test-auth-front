import React, {useState, useEffect} from "react";
import axios from "axios";
import "./ProductsPage.css";
import {FETCH_PRODUCTS_URL} from "./constants";
import Pagination from "../../components/Pagination/Pagination";
import ProductList from "../../components/ProductList/ProductList";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState([]);
    const [lastPage, setLastPage] = useState([]);
    const [lastPageUrl, setLastPageUrl] = useState([]);
    const [prevPageUrl, setPrevPageUrl] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState([]);
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchPage = (page = 0) => {
        return fetchProducts(`${FETCH_PRODUCTS_URL}?page=${page}`);
    };

    const fetchPrev = () => {
        return fetchProducts(prevPageUrl);
    }
    const fetchNext = () => {
        return fetchProducts(nextPageUrl);
    }
    const fetchLast = () => {
        return fetchProducts(lastPageUrl);
    }

    const toggleViewMode = () => {
        setViewMode(viewMode === "grid" ? "list" : "grid");
    };

    const fetchProducts = (url = FETCH_PRODUCTS_URL) => {
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
        <div className="wrapper">
            <div className="products-page">
                <h2>Products</h2>


                <div className={"view-mode-toggle"}>
                    <button onClick={toggleViewMode}>
                        Switch to {viewMode === "Grid" ? "list" : "Grid"} View
                    </button>
                </div>
                <Pagination
                    prevPageUrl={prevPageUrl}
                    nextPageUrl={nextPageUrl}
                    lastPageUrl={lastPageUrl}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    total={total}
                    fetchPrev={fetchPrev}
                    fetchPage={fetchPage}
                    fetchNext={fetchNext}
                    fetchLast={fetchLast}
                />

                <ProductList products={products}
                             viewMode={viewMode}
                />
                <Pagination
                    prevPageUrl={prevPageUrl}
                    nextPageUrl={nextPageUrl}
                    lastPageUrl={lastPageUrl}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    total={total}
                    fetchPrev={fetchPrev}
                    fetchPage={fetchPage}
                    fetchNext={fetchNext}
                    fetchLast={fetchLast}
                />
            </div>
        </div>
    );
};

export default ProductsPage;
