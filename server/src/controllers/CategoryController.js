import Category from "../models/CategoryMode.js";

export const getCategory = async (req, res) => {
  const categorie = await Category.findAll({
    raw: true,
  });

  return res.status(200).json(categorie);
};

export const addCategory = async (req, res) => {
  const { name_th, name_en, display_order } = req.body;

  try {
    const response = await Category.create({
      name_th: name_th,
      name_en: name_en,
      display_order: display_order,
    });

    return res.status(201).json({
      status: "success",
      message: "Category created successfully.",
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

export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const updateData = req.body;

  // 1. ตรวจสอบเบื้องต้นว่ามีการส่งข้อมูลมาอัปเดตหรือไม่
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "No fields provided for update.",
    });
  }

  try {
    // 2. ตรวจสอบว่า Category มีอยู่จริงหรือไม่
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        message: `Category with ID ${categoryId} not found`,
      });
    }

    // 3. ใช้เมธอด .update() บน Instance Object โดยตรง (ถ้าใช้ .findByPk)
    // นี่คือวิธีที่ง่ายและสะอาดที่สุดในการอัปเดตรายการเดียว
    const updatedCategory = await category.update(updateData);

    return res.status(200).json({
      message: "Category updated successfully.",
      data: updatedCategory.get(),
    });
  } catch (error) {
    console.error("Update Error: ", error);

    return res.status(500).json({
      message: `Unable to update Category.`,
    });
  }
};

export const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const checkId = await Category.findByPk(id);
    if (checkId === null) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    const response = await Category.destroy({
      where: {
        category_id: id,
      },
    });

    return res.status(200).json({
      status: "status",
      message: "Category deleted successfully.",
      data: response,
    });
  } catch (error) {
    console.log(error);

    const statusCode = error.name === "SequelizeValidationError" ? 400 : 500;

    return res.status(statusCode).json({
      status: "error",
      message: `Unable to delete Category ${error.message}`,
    });
  }
};
