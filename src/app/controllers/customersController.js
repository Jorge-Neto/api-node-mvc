let customers = [
    { id: 1, name: "Jorge", language: "JavaScript" },
    { id: 2, name: "Oliveira", language: "Java" },
    { id: 3, name: "Neto", language: "C++" }
];

class CustomersController {

    // List All Customers
    index(req, res) {
        return res.json(customers);
    }

    // List a Customer
    show(req, res) {
        const customerId = parseInt(req.params.id);

        const customer = customers.find(item => item.id === customerId);
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
        const id = parseInt(req.params.id);
        const { name, language } = req.body;

        const index = customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers[index] = { id: id, name, language };
        }

        return res.status(status).json(customers[index]);
    }

    // Destroy a Customer
    destroy(req, res) {
        const id = parseInt(req.params.id);

        const index = customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers.splice(index, 1);
        }

        return res.status(status).json(customers);
    }

}

export default new CustomersController();
