import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  useEffect(() => {
    setFinalPrice(qty * parseInt(options[size]));
  }, [qty, size]);

  const options = props.options || {};
  const priceOptions = Object.keys(options);

  return (
    <div className="card-container">
      <div
        className="card mt-3"
        style={{
          width: "250px",
          height: "380px",
          borderRadius: "15px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src={props.foodItem.img}
          alt="Food"
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5
            className="card-title"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.foodItem.name}
          </h5>
          <div className="d-flex justify-content-center">
            <select
              className="m-2 bg-success rounded"
              style={{ width: "70px", fontSize: "1rem" }}
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 bg-success rounded"
              style={{ width: "100px", fontSize: "1rem" }}
              ref={priceRef}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
          <div className="d-inline h-100 fs-5" style={{ textAlign: "center" }}>
            ₹{finalPrice}/-{" "}
            <hr
              style={{ width: "80%", margin: "auto", border: "1px solid #ddd" }}
            />
          </div>
          <button
            className="btn btn-success justify-center ms-2"
            style={{ width: "200px", fontSize: "1.2rem", margin: "auto" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
