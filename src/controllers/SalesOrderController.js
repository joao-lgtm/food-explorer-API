const SalesOrderRepository = require("../repositories/SalesOrderRepository");
const SalesOrderService = require("../services/SalesOrderService");


class SalesOrderController {
    async show(request, response) {

        const user_id = request.user.id;

        const salesOrderRepository = new SalesOrderRepository();
        const salesOrderService = new SalesOrderService(salesOrderRepository);

        try {
            const salesOrder = await salesOrderService.getOrdersByUser({ user_id });

            return response.status(200).json(salesOrder);
        }
        catch (error) {
             return response.status(error.statusCode).json({error: error.message});
        }
    }

    async index(request, response) {

        const { id } = request.params;
        const user_id = request.user.id;

        const salesOrderRepository = new SalesOrderRepository();
        const salesOrderService = new SalesOrderService(salesOrderRepository);

        try {
            const salesOrder = await salesOrderService.getOrderById({ user_id, id });

            return response.status(200).json(salesOrder);
        }
        catch (error) {
            return response.status(error.statusCode).json({error: error.message});
        }
    }

    async create(request, response) {
        const { dishes_id, price, quantity } = request.body;
        const user_id = request.user.id;

        const salesOrderRepository = new SalesOrderRepository();
        const salesOrderService = new SalesOrderService(salesOrderRepository);

        try {
            const salesOrder = await salesOrderService.execute({ dishes_id, price, quantity, user_id });

            return response.status(201).json(salesOrder);
        } catch (error) {
             return response.status(error.statusCode).json({error: error.message});
        }
    }

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.user.id;

        const salesOrderRepository = new SalesOrderRepository();
        const salesOrderService = new SalesOrderService(salesOrderRepository);

        try {
            await salesOrderService.delete({ id, user_id });

            return response.status(200).json("pedido exluido com sucesso");
        } catch (error) {
             return response.status(error.statusCode).json({error: error.message});
        }
    }
}

module.exports = SalesOrderController;