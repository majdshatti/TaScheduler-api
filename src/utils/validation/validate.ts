import mongoose from "mongoose";
import ObjectId from "mongoose";
import { check } from "express-validator";

// Utility functions
import { getErrorMessage } from "../";

let validate = (path: string) => {
  // Chainable object
  let chainablePath = {
    result: check(),

    //************************************************/
    //************ GENERAL VALIDATIONS ***************/
    //************************************************/

    //* Setting up Body() for express validator
    path: function () {
      this.result = check(path);
      return this;
    },

    //* Make sure a path is sent from the client
    isRequired: function () {
      this.result = this.result
        .exists({ checkFalsy: true })
        .withMessage(getErrorMessage("required", path))
        .bail();
      return this;
    },

    optional: function () {
      this.result = this.result.optional();
      return this;
    },

    //* Check string format
    isString: function () {
      this.result = this.result
        .isString()
        .withMessage(getErrorMessage("string", path))
        .bail();
      return this;
    },

    //* Check if a document is already exists
    isUnique: function (model: string) {
      this.result = this.result
        .custom(async value => {
          try {
            const document = await mongoose
              .model(model)
              .findOne({ [path]: value });
            // If a document is found then return error
            if (document)
              return Promise.reject(getErrorMessage("unique", path));
          } catch (error) {
            return Promise.reject(error);
          }
        })
        .bail();
      return this;
    },

    //* Check minimum characters allowed
    isLength: function (minLength: number, maxLength: number) {
      this.result = this.result
        .isLength({ min: minLength, max: maxLength })
        .withMessage(
          getErrorMessage("betweenLength", path, `${minLength}, ${maxLength}`)
        )
        .bail();
      return this;
    },

    //* Check date vaild format
    isDate: function () {
      this.result = this.result
        .isISO8601()
        .toDate()
        .withMessage(getErrorMessage("date", path))
        .bail();
      return this;
    },

    //* Check if email
    isEmail: function () {
      this.result = this.result
        .isEmail()
        .withMessage(getErrorMessage("email", path))
        .bail();
      return this;
    },

    //* Check if document exists in the db
    isExist: function (
      model: string,
      field: string,
      returnData: boolean = false
    ) {
      this.result = this.result
        .custom(async (value, { req }) => {
          try {
            const document = await mongoose
              .model(model)
              .findOne({ [field]: value });

            // If a document is found then return error
            if (!document)
              return Promise.reject(getErrorMessage("exist", path));

            if (returnData) req.body.validationResults = { [model]: document };
          } catch (error) {
            return Promise.reject(error);
          }
        })
        .bail();
      return this;
    },

    isObjectId: function () {
      this.result = this.result
        .custom(async value => {
          if (!ObjectId.isValidObjectId(value))
            return Promise.reject("Not valid object ID");
        })
        .bail();
      return this;
    },

    //************************************************/
    //********* PROJECT CUSTOM VALIDATIONS ***********/
    //************************************************/

    //* Check if startDate is smaller than dueDate
    isStartDateSmaller: function () {
      this.result = this.result
        .custom(async (value, { req }) => {
          try {
            const startDate = value.getTime();
            const dueDate = req.body.dueDate.getTime();
            if (startDate >= dueDate)
              return Promise.reject(getErrorMessage("exist", path));
          } catch (err) {
            return Promise.reject(err);
          }
        })
        .bail();

      return this;
    },

    //! THIS FUNCTION CANNOT BE USED WITH `ISEXIST FUNCTION` WITH RETURN TRUE FOR DATA
    //* Is status already the same
    isTaskStatusTheSame: function (status: string) {
      this.result = this.result
        .custom(async (value, { req }) => {
          console.log(value);
          try {
            const task = req.body.validationResults.Task;

            if (!task) return Promise.reject(getErrorMessage("exist", "task"));

            if (task.status == status)
              return Promise.reject(
                getErrorMessage("statusSame", "task", "Completed")
              );
          } catch (err) {
            console.log(err);
            return Promise.reject(getErrorMessage("serverError", "task"));
          }
        })
        .bail();

      return this;
    },

    // Return results for express validator to be executed
    exec: function () {
      return this.result;
    },
  };

  return chainablePath.path();
};

export default validate;
