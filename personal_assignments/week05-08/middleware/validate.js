const validator = require("../helpers/validate");

const saveUser = (req, res, next) => {
  const validationRule = {
    userName: "required|string",
    password: "required|string",
    firstName: "required|string",
    lastName: "required|string",
    emailAddress: "required|email",
    preferredLanguage: "required|string",
    city: "string",
    state: "string",
    country: "required|string",
    public: "required|boolean"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next();
    }
  });
};

const saveRecipe = (req, res, next) => {
  const validationRule = {
    recipeName: "required|string",
    description: "string",
    source: "string",
    servings: "required|integer",
    prepTime: "required|integer",
    cookTime: "required|integer",
    category: "required|string",
    keywords: "string",
    ingredients: "required|string",
    instructions: "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser,
  saveRecipe
};
