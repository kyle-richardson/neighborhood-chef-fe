import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import Ingredient from "./Ingredient.js";

const AddIngredient = ({ ingredientList, setIngredientList }) => {
  const [formInput, setFormInput] = useState({
    name: "",
    quantity: "",
    measurement: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const submitIngredient = (e) => {
    e.preventDefault();
    const newIngredient = {
      id: ingredientList.length + 1,
      name: formInput.name,
      quantity: formInput.quantity,
      measurement: formInput.measurement,
    };
    setIngredientList([...ingredientList, newIngredient]);
    setFormInput({ name: "", quantity: "", measurement: "" });
  };

  const removeIngredient = (id) => {
    setIngredientList(ingredientList.filter((item) => item.id !== id));
  };

  return (
    <div style={{ marginTop: "55px", marginBottom: "25px" }}>
      <Typography style={{ marginBottom: "10px" }}>
        Request for guests to bring ingredients
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid #f0f0f0",
          borderRadius: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="createFormInputDiv" style={{ width: "30%" }}>
              <input
                type="text"
                name="name"
                value={formInput.name}
                onChange={handleChange}
                placeholder="Ingredient"
              />
            </div>

            <div
              className="createFormInputDiv"
              style={{ width: "10%", marginLeft: "2%" }}
            >
              <input
                type="numbers"
                name="quantity"
                value={formInput.quantity}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="Quantity"
              />
            </div>

            <div className="eventTimeDiv" style={{ marginLeft: "2%" }}>
              <label>
                Measurement
                <Select
                  name="measurement"
                  value={formInput.measurement}
                  onChange={handleChange}
                  id="greenSelect"
                  disableUnderline={true}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={"Cup"}>Cup</MenuItem>
                  <MenuItem value={"Cups"}>Cups</MenuItem>
                  <MenuItem value={"Gallon"}>Gallon</MenuItem>
                  <MenuItem value={"Gallons"}>Gallons</MenuItem>
                  <MenuItem value={"Pound"}>Pound</MenuItem>
                  <MenuItem value={"Pounds"}>Pounds</MenuItem>
                  <MenuItem value={"Ounce"}>Ounce</MenuItem>
                  <MenuItem value={"Ounces"}>Ounces</MenuItem>
                  <MenuItem value={"Pint"}>Pint</MenuItem>
                  <MenuItem value={"Pints"}>Pints</MenuItem>
                  <MenuItem value={"Quart"}>Quart</MenuItem>
                  <MenuItem value={"Quarts"}>Quarts</MenuItem>
                  <MenuItem value={"Teaspoon"}>Teaspoon</MenuItem>
                  <MenuItem value={"Teaspoons"}>Teaspoons</MenuItem>
                  <MenuItem value={"Tablespoon"}>Tablespoon</MenuItem>
                  <MenuItem value={"Tablespoon"}>Tablespoons</MenuItem>
                </Select>
              </label>
            </div>

            <button
              disabled={
                !formInput.name || !formInput.quantity || !formInput.measurement
              }
              className={
                !formInput.name || !formInput.quantity || !formInput.measurement
                  ? "inactive"
                  : ""
              }
              type="button"
              onClick={submitIngredient}
              style={{
                color: "white",
                fontSize: "1.6rem",
                background: "#82df96",
                borderRadius: "10px",
                border: "none",
                fontWeight: "bold",
                wordSpacing: "15px",
                cursor: "pointer",
                padding: "15px 10px",
                marginLeft: "2%",
              }}
            >
              Add +
            </button>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          ></div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "60%" }}>
        {ingredientList.map((item) => {
          return (
            <Ingredient
              item={item}
              removeIngredient={removeIngredient}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddIngredient;
