import React from "react";
import "../../components/ProductList/ProductList.css";
const ProductList = ({ products, viewMode }) => {

    return (
        <>
            {products.length === 0 && <p>No products available</p>}
            {products.length > 0 && (
                <div className={`product-${viewMode}`}>
                    {products.map((product) => (
                        <div key={product.id} className="product-item">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: {product.price} USD</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>
                                <img
                                    src={
                                        "https://picsum.photos/200?" +
                                        Math.random()
                                    }
                                    alt=""
                                />
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductList;
