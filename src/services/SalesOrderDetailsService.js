const AppError = require("../utils/AppError");
const SalesOrderRepository = require("../repositories/SalesOrderRepository");

class SalesOrderDetailsService {
    constructor(salesOrderDetailsRepository, salesOrderRepository) {
        this.salesOrderDetailsRepository = salesOrderDetailsRepository;
        this.salesOrderRepository = new SalesOrderRepository(salesOrderRepository);
    }
    async deleteById({ sales_order_id, detail_id, user_id }) {
        const sales = await this.salesOrderDetailsRepository.findByid({ sales_order_id, user_id });
        const salesExits = sales.find((sales) => sales.details_id === Number(detail_id));

        if (!salesExits) {
            throw new AppError("Detalhe não existe", 404);
        }

        try {
            if (sales.length === 1) {
                await this.salesOrderRepository.deleteOrder({ id: sales_order_id, user_id });
            }

            const price = Number((salesExits.quantity * salesExits.value).toFixed(2));
            await this.salesOrderRepository.updateOrderByDetails({ id: sales_order_id, user_id, old_price: salesExits.order_price, price })
            await this.salesOrderDetailsRepository.deleteDetails({ id: detail_id })

            return;
        } catch (error) {
            throw new AppError("Erro ao buscar detalhe", 400);
        }
    }

    async alterDetails({ sales_order_id, quantity, detail_id, user_id }) {
        const sales = await this.salesOrderDetailsRepository.findByid({ sales_order_id, user_id });

        const salesExits = sales.find((sales) => sales.details_id === Number(detail_id));

        if (!salesExits) {
            throw new AppError("Detalhe do pedido não encontrado", 404);
        }

        const salesValue = salesExits.order_price;
        const old_price = Number((salesExits.quantity * salesExits.value).toFixed(2));
        const newPrice = Number((quantity * salesExits.value).toFixed(2));

        let operation;
        if (salesExits.quantity > quantity) {
            operation = 'subtract';
        } else if (salesExits.quantity < quantity) {
            operation = 'add';
        } else {
            return;
        }
        try {
            await this.salesOrderRepository.updateOrderPriceWithDetails({ id: sales_order_id, user_id, salesValue, old_price, newPrice, operation });
            await this.salesOrderDetailsRepository.updateDetails({ sales_order_id, id: detail_id, quantity });
        } catch (error) {
            throw new AppError("Erro ao atualizar a quantidade do pedido", 400);
        }
    }

    async getQuantity({ id, user_id }) {
        try {
            const sales = await this.salesOrderDetailsRepository.findByid({ sales_order_id: id, user_id });

            const totalAmount = sales.reduce((acc, sale) => acc + sale.quantity, 0);

            return totalAmount;
        } catch (error) {
            throw new AppError("Erro ao atualizar a quantidade do pedido", 400);
        }
    }
}

module.exports = SalesOrderDetailsService;