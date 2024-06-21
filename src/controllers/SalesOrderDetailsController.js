const SalesOrderDetailsRepository = require("../repositories/SalesOrderDetailsRepository");
const SalesOrderDetailsService = require("../services/SalesOrderDetailsService");

class SalesOrderDetailsController {
    async delete(request, response) {
        const user_id = request.user.id;
        const { sales_order_id, detail_id } = request.body;

        const salesOrderDetailsRepository = new SalesOrderDetailsRepository();
        const salesOrderDetailsService = new SalesOrderDetailsService(salesOrderDetailsRepository);

        try {
            await salesOrderDetailsService.deleteById({ sales_order_id, detail_id, user_id })

            return response.status(200).json("excluido com sucesso");

        } catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    }

    async update(request, response) {
        const user_id = request.user.id;
        const { sales_order_id, quantity, price, detail_id } = request.body;

        const salesOrderDetailsRepository = new SalesOrderDetailsRepository();
        const salesOrderDetailsService = new SalesOrderDetailsService(salesOrderDetailsRepository);

        try {
            await salesOrderDetailsService.alterDetails({ sales_order_id, quantity, price, detail_id, user_id })
            return response.status(200).json("alterado com sucesso");
        } catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    }

    async show(request, response) {
        const user_id = request.user.id;
        const { sales_order_id } = request.body;

        const salesOrderDetailsRepository = new SalesOrderDetailsRepository();
        const salesOrderDetailsService = new SalesOrderDetailsService(salesOrderDetailsRepository);

        try {
            const quantity = await salesOrderDetailsService.getQuantity({ sales_order_id, user_id });
            return response.status(200).json({ quantity });
        } catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    }
}

module.exports = SalesOrderDetailsController;