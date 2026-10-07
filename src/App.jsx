import { useState } from "react";
import "./App.css";

function App() {
  // =========================
  // STATE
  // =========================

  const [started, setStarted] = useState(false);
  const [coffee, setCoffee] = useState("Cappuccino");
  const [size, setSize] = useState("Medium");
  const [sugar, setSugar] = useState("50%");
  const [toppings, setToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("idle");

  // =========================
  // DATA HARGA
  // =========================

  const coffeePrices = {
    Espresso: 15000,
    Americano: 18000,
    Cappuccino: 22000,
    Latte: 23000,
    Mocha: 25000,
  };

  const sizePrices = {
    Small: 0,
    Medium: 3000,
    Large: 5000,
  };

  const toppingPrices = {
    Caramel: 3000,
    "Whipped Cream": 4000,
    Chocolate: 3000,
  };

  // =========================
  // HITUNG TOTAL HARGA
  // =========================

  const toppingTotal = toppings.reduce(
    (total, topping) => total + toppingPrices[topping],
    0
  );

  const pricePerCup =
    coffeePrices[coffee] +
    sizePrices[size] +
    toppingTotal;

  const totalPrice = pricePerCup * quantity;

  // =========================
  // FORMAT RUPIAH
  // =========================

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // =========================
  // TOPPING
  // =========================

  const handleTopping = (topping) => {
    if (toppings.includes(topping)) {
      setToppings(
        toppings.filter((item) => item !== topping)
      );
    } else {
      setToppings([...toppings, topping]);
    }
  };

  // =========================
  // JUMLAH
  // =========================

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // =========================
  // ORDER
  // =========================

  const handleOrder = () => {
    setStatus("brewing");

    setTimeout(() => {
      setStatus("success");
    }, 3000);
  };

  // =========================
  // RESET
  // =========================

  const handleReset = () => {
    setStatus("idle");
    setQuantity(1);
    setToppings([]);
    setCoffee("Cappuccino");
    setSize("Medium");
    setSugar("50%");
  };

  return (
    <div className="app">

      {/* =========================
          HEADER
      ========================= */}

      <header className="header">
        <div>
          <h1>☕ Coffee Time</h1>
          <p>Your Daily Coffee</p>
        </div>

        <div className="coffee-icon">
          ☕
        </div>
      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main className="main-container">

        {/* =========================
            COFFEE MACHINE
        ========================= */}

        <section className="machine-section">

          <div className="machine">

            <div className="machine-top">
              COFFEE MACHINE
            </div>

            <div className="machine-screen">

              {/* TAMPILAN AWAL */}

              {!started && (
                <>
                  <div className="machine-icon">
                    ☕
                  </div>

                  <h2>Ready to Brew?</h2>

                  <p>
                    Choose your favorite coffee
                  </p>
                </>
              )}


              {/* SETELAH START */}

              {started && status === "idle" && (
                <>
                  <div className="coffee-cup">
                    ☕
                  </div>

                  <h2>{coffee}</h2>

                  <p>
                    Your coffee is waiting
                  </p>
                </>
              )}


              {/* BREWING */}

              {status === "brewing" && (
                <>
                  <div className="brewing-icon">
                    ☕
                  </div>

                  <h2>Brewing Coffee...</h2>

                  <p>
                    Preparing your coffee
                  </p>

                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                </>
              )}


              {/* COFFEE READY */}

              {status === "success" && (
                <>
                  <div className="success-icon">
                    ☕
                  </div>

                  <h2>Coffee Ready!</h2>

                  <p>
                    Enjoy your {coffee}
                  </p>

                  <strong>
                    {formatRupiah(totalPrice)}
                  </strong>
                </>
              )}

            </div>


            {/* START BUTTON */}

            {!started && (
              <button
                className="start-button"
                onClick={() => setStarted(true)}
              >
                START
              </button>
            )}


            {/* ORDER AGAIN */}

            {started && status === "success" && (
              <button
                className="start-button"
                onClick={handleReset}
              >
                ORDER AGAIN
              </button>
            )}

          </div>

        </section>


        {/* =========================
            FORM PEMESANAN
        ========================= */}

        {started && status !== "success" && (
          <section className="form-section">

            <div className="form-card">

              <h2>Order Coffee</h2>

              <p className="form-description">
                Customize your favorite coffee
              </p>


              {/* =========================
                  COFFEE + HARGA
              ========================= */}

              <div className="form-group">

                <label>
                  Coffee
                </label>

                <select
                  value={coffee}
                  onChange={(e) =>
                    setCoffee(e.target.value)
                  }
                >

                  <option value="Espresso">
                    Espresso - {formatRupiah(coffeePrices.Espresso)}
                  </option>

                  <option value="Americano">
                    Americano - {formatRupiah(coffeePrices.Americano)}
                  </option>

                  <option value="Cappuccino">
                    Cappuccino - {formatRupiah(coffeePrices.Cappuccino)}
                  </option>

                  <option value="Latte">
                    Latte - {formatRupiah(coffeePrices.Latte)}
                  </option>

                  <option value="Mocha">
                    Mocha - {formatRupiah(coffeePrices.Mocha)}
                  </option>

                </select>

              </div>


              {/* =========================
                  SIZE + HARGA
              ========================= */}

              <div className="form-group">

                <label>
                  Size
                </label>

                <div className="radio-group">

                  {Object.entries(sizePrices).map(
                    ([item, price]) => (
                      <label
                        className="radio-option"
                        key={item}
                      >

                        <input
                          type="radio"
                          value={item}
                          checked={size === item}
                          onChange={(e) =>
                            setSize(e.target.value)
                          }
                        />

                        <span>
                          {item}
                        </span>

                        <small>
                          +{formatRupiah(price)}
                        </small>

                      </label>
                    )
                  )}

                </div>

              </div>


              {/* =========================
                  SUGAR
              ========================= */}

              <div className="form-group">

                <label>
                  Sugar
                </label>

                <div className="radio-group">

                  {["0%", "50%", "100%"].map(
                    (item) => (
                      <label
                        className="radio-option"
                        key={item}
                      >

                        <input
                          type="radio"
                          value={item}
                          checked={sugar === item}
                          onChange={(e) =>
                            setSugar(e.target.value)
                          }
                        />

                        <span>
                          {item}
                        </span>

                      </label>
                    )
                  )}

                </div>

              </div>


              {/* =========================
                  TOPPING + HARGA
              ========================= */}

              <div className="form-group">

                <label>
                  Topping
                </label>

                <div className="checkbox-group">

                  {Object.entries(toppingPrices).map(
                    ([item, price]) => (

                      <label
                        className="checkbox-option"
                        key={item}
                      >

                        <input
                          type="checkbox"
                          checked={toppings.includes(item)}
                          onChange={() =>
                            handleTopping(item)
                          }
                        />

                        <span>
                          {item}
                        </span>

                        <span className="topping-price">
                          +{formatRupiah(price)}
                        </span>

                      </label>

                    )
                  )}

                </div>

              </div>


              {/* =========================
                  QUANTITY
              ========================= */}

              <div className="form-group">

                <label>
                  Quantity
                </label>

                <div className="quantity">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>

                </div>

              </div>


              {/* =========================
                  TOTAL
              ========================= */}

              <div className="total-box">

                <span>
                  Total
                </span>

                <strong>
                  {formatRupiah(totalPrice)}
                </strong>

              </div>


              {/* =========================
                  ORDER NOW
              ========================= */}

              <button
                className="order-button"
                onClick={handleOrder}
              >
                ☕ ORDER NOW
              </button>

            </div>

          </section>
        )}

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer>
        <p>
          Coffee Machine © 2026
        </p>
      </footer>

    </div>
  );
}

export default App;