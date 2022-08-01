import { Request, Response, NextFunction } from "express";
import { validationResult, matchedData } from "express-validator";
import { getErrorMessage } from "../utils";

const results = () => (req: Request, res: Response, next: NextFunction) => {
  // Stores error occured while validating
  const errors = validationResult(req).formatWith(({ msg, param, value }) => ({
    message: msg,
    path: param,
    value,
  }));

  // Return error response with validation results
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  // An array of unmatched body attributes
  let unMatchedFields = [];

  // An array for storing validated attributes
  let fields = [];

  // Get the key attributes from validated data
  const validatedData = matchedData(req, { includeOptionals: true });

  // Store keys
  for (const key in validatedData) {
    fields.push(key);
  }

  if (req.body.validationResults) {
    fields.push("validationResults");
  }

  // Extra attributes errors
  if (req.body) {
    for (const bodyFields in req.body) {
      if (!fields.includes(bodyFields)) {
        unMatchedFields.push({
          path: bodyFields,
          message: getErrorMessage("extraFields", bodyFields),
        });
      }
    }
  }

  // Return error response with validation results
  if (unMatchedFields.length > 0) {
    return res.status(400).json({
      success: false,
      errors: unMatchedFields,
    });
  }

  next();
};

export default results;
