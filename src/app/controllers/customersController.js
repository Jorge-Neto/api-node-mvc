import { Op } from "sequelize";
import { parseISO } from "date-fns";

import Customer from "../models/Customer";
import Contact from "../models/Contact";

const customers = [
  { id: 1, name: "Jorge", language: "JavaScript" },
  { id: 2, name: "Oliveira", language: "Java" },
  { id: 3, name: "Neto", language: "C++" },
];

class CustomersController {
  // List All Customers
  async index(req, res) {
    const {
      name,
      email,
      status,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.iLike]: name,
        },
      };
    }

    if (email) {
      where = {
        ...where,
        email: {
          [Op.iLike]: email,
        },
      };
    }

    if (status) {
      where = {
        ...where,
        status: {
          [Op.in]: status.split(",").map((item) => item.toUpperCase()),
        },
      };
    }

    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }
    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }
    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }
    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await Customer.findAll({
      where,
      include: [
        {
          model: Contact,
          attributes: ["id"],
        },
      ],
      order,
      limit,
      offset: limit * page - limit,
    });
    return res.json(data);
  }

  // List a Customer
  show(req, res) {
    const customerId = parseInt(req.params.id, 10);

    const customer = customers.find((item) => item.id === customerId);
    const status = customer ? 200 : 404;

    return res.status(status).json(customer);
  }

  // Create a Customer
  create(req, res) {
    const { name, language } = req.body;
    const id = customers[customers.length - 1].id + 1;

    const newCustomer = { id, name, language };
    customers.push(newCustomer);

    return res.status(201).json(newCustomer);
  }

  // Update a Customer
  update(req, res) {
    const id = parseInt(req.params.id, 10);
    const { name, language } = req.body;

    const index = customers.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers[index] = { id, name, language };
    }

    return res.status(status).json(customers[index]);
  }

  // Destroy a Customer
  destroy(req, res) {
    const id = parseInt(req.params.id, 10);

    const index = customers.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers.splice(index, 1);
    }

    return res.status(status).json(customers);
  }
}

export default new CustomersController();
