import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { IAuthRequest } from "../interfaces";

const filter =
  (model: string, populate?: string) =>
  async (req: Request, res: Response | any, next: NextFunction) => {
    let query;
    const request = req as IAuthRequest;

    const reqQuery = { ...req.query };

    // Don't filter over query operators
    const removeFields = ["select", "sort", "page", "limit", "populate"];

    removeFields.forEach(param => delete reqQuery[param]);

    // Greate than, less than, ..etc queries support
    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`
    );

    // Reparse the json string after cleaning
    let params = JSON.parse(queryStr);

    if (model === "Task" || model === "Project") {
      params.user = request.user._id;
    }

    query = mongoose.model(model).find(params);

    // SELECT fields
    if (req.query.select) {
      const select = req.query.select as string;
      const fields = select.split(",").join(" ");
      query = query.select(fields);
    }

    // SORTING fields
    if (req.query.sort) {
      const sort = req.query.sort as string;
      const sortBy = sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const pagination = { next: {}, prev: {} };
    const total = await query.clone().countDocuments();

    let pageCount = 1;

    // PAGINATION
    if (req.query.limit) {
      let page: number = 1;
      let limit: number = 10;

      if (req.query.page) page = +req.query.page;

      if (req.query.limit) limit = +req.query.limit;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      pageCount = Math.ceil(total / limit);

      query = query.skip(startIndex).limit(limit);

      if (endIndex < total) {
        pagination.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        pagination.prev = {
          page: page - 1,
          limit,
        };
      }
    }

    // POPULATE
    if (populate) {
      let select;
      if (req.query.populate) {
        select = req.query.populate as string;
        select = select.split(",").join(" ");
      }
      query = query.populate({
        path: populate,
        select,
      });
    }

    const results = await query.lean();

    res.filter = {
      success: true,
      rowCount: total,
      pageCount,
      pagination,
      data: results,
    };

    next();
  };

export default filter;
