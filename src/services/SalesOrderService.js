const AppError = require("../utils/AppError");

class SalesOrderService {
    constructor(salesOrderRepository) {
        this.salesOrderRepository = salesOrderRepository;
    }
    async getOrdersByUser({ user_id }) {
        try {
            const salesOrder = await this.salesOrderRepository.findOrderByUser({ user_id });

            if (!salesOrder) {
                throw new AppError("Não há pedidos existentes", 404);
            }
            return salesOrder;

        } catch (error) {
            throw new AppError(error.message || "Erro ao buscar os pedidos", error.statusCode || 400);
        }
    }

    async getAllOrders({ user_id }) {
        try {
            const salesOrder = await this.salesOrderRepository.findAllOrder({ user_id });

            if (!salesOrder) {
                throw new AppError("Não há pedidos existentes", 404);
            }
            return salesOrder;

        } catch (error) {
            throw new AppError(error.message || "Erro ao buscar os pedidos", error.statusCode || 400);
        }
    }

    async getOrderById({ user_id, id }) {
        try {
            const salesOrder = await this.salesOrderRepository.findOrderById({ user_id, id });

            if (!salesOrder) {
                throw new AppError("Pedido não existe", 404);
            }

            return salesOrder;
        } catch (error) {
            throw new AppError(error.message || "Erro ao buscar os pedidos", error.statusCode || 400);
        }
    }

    async execute({ dishes_id, price, quantity, user_id }) {
        const [salesOrderExists] = await this.salesOrderRepository.findOrder({ user_id });

        try {
            let salesOrder;
            if (!salesOrderExists) {
                salesOrder = await this.salesOrderRepository.createOrder({ dishes_id, price, quantity, user_id });

            }
            else {
                salesOrder = await this.salesOrderRepository.updateOrder({ dishes_id, price, quantity, user_id, sales_order_id: salesOrderExists.id, old_price: salesOrderExists.price });
            }

            return salesOrder;
        } catch (error) {
            throw new AppError("Erro ao criar o pedido", 400);
        }

    }

    async delete({ id, user_id }) {
        const [salesOrderExists] = await this.salesOrderRepository.findOrder({ user_id });
        
        if (!salesOrderExists) {
            throw new AppError("Pedido não existe", 404);
        }

        try {
            const salesOrder = await this.salesOrderRepository.deleteOrder({ id, user_id });
            return salesOrder;
        } catch (error) {
            throw new AppError("Erro ao deletar o pedido", 400);
        }
    }
}


module.exports = SalesOrderService;