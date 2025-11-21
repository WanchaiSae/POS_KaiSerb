import { response } from "express";
import Product from "../models/ProductModel.js";

export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll({
      raw: true,
    });

    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.error(error);

    const statusCode = error.name === "SequelizeValidationError" ? 400 : 500;

    return res.status(statusCode).json({
      status: "error",
      message: `Unable to get Product: ${error.message}`,
    });
  }
};

export const getProductId = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Product.findAll({
      where: {
        product_id: id,
      },
      raw: true,
    });

    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.error(error);

    const statusCode = error.name === "SequelizeValidationError" ? 400 : 500;

    return res.status(statusCode).json({
      status: "error",
      message: `Unable to get Product: ${error.message}`,
    });
  }
};

export const addProduct = async (req, res) => {
  const { product_id, category_id, name_th, price, image_url, is_available } =
    req.body;

  try {
    const response = await Product.create({
      product_id: product_id,
      category_id: category_id,
      name_th: name_th,
      price: price,
      image_url: image_url,
      is_available: is_available,
    });

    return res.status(201).json({
      status: "success",
      message: "Added Product Successfully.",
      data: response,
    });
  } catch (error) {
    console.error(error);

    const statusCode = error.name === "SequelizeValidationError" ? 400 : 500;

    return res.status(statusCode).json({
      status: "error",
      message: `Unable to create Category: ${error.message}`,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const checkID = await Product.findByPk(id);

    if (!checkID) {
      return res.status(404).json({
        message: "ID Product Not Found.",
      });
    }

    const response = await Product.destroy({
      where: {
        product_id: id,
      },
    });

    return res.status(200).json({
      data: response,
      status: "success",
      message: "Deleted Product Successfully.",
    });
  } catch (error) {
    console.error("Error deleting product: " + error);
    return res.status(500).json({
      status: "error",
      message: "Unable to delete product",
    });
  }
};
