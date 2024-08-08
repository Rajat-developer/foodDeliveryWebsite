import React from "react";
import { useCart, useDispatchCart } from "../ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="container m-auto mt-5">
        <div className="text-center fs-3 text-light ">The Cart is Empty!</div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("Order Response:", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col" className=" text-light">
                #
              </th>
              <th scope="col" className=" text-light">
                Name
              </th>
              <th scope="col" className=" text-light">
                Quantity
              </th>
              <th scope="col" className=" text-light">
                Option
              </th>
              <th scope="col" className=" text-light">
                Amount
              </th>
              <th scope="col" className=" text-light"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row" className=" text-light">
                  {index + 1}
                </th>
                <td className=" text-light">{food.name}</td>
                <td className=" text-light">{food.qty}</td>
                <td className=" text-light">{food.size}</td>
                <td className=" text-light">{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn  text-danger  bg-light fs-6  "
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    Delete
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-light ">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
