const knex = require('../database/knex');

class SalesOrderRepository {
    async findOrder({ user_id }) {
        const sales_order = await knex("sales_order").where({ user_id: user_id }).whereNot({ status: 2 }).whereNot({ status: 1 });


        return sales_order;

    }

    async findOrderByUser({ user_id }) {
        const [sales_order] = await knex("sales_order").where({ user_id });

        if (!sales_order) {
            return null;
        }

        return sales_order;
    }

    async findOrderById({ user_id, id }) {

        const [sales_order] = await knex("sales_order").where({ user_id, id });

        if (!sales_order) {
            return null;
        }

        const details = await knex("sales_order_details")
            .innerJoin("dishes", "sales_order_details.dishes_id", "dishes.id")
            .where({ "sales_order_details.sales_order_id": id })
            .select(
                "sales_order_details.id",
                "sales_order_details.sales_order_id",
                "sales_order_details.dishes_id",
                "sales_order_details.quantity",
                "sales_order_details.value",
                "sales_order_details.created_at",
                "sales_order_details.update_date",
                "dishes.img",
                "dishes.name",
                "dishes.category_id",
                "dishes.price",
                "dishes.description"
            );

        return { ...sales_order, details };
    }


    async createOrder({ dishes_id, price, quantity, user_id }) {
        const [sales_order_id] = await knex('sales_order').insert({
            price: Number((price * quantity).toFixed(2)),
            user_id
        })

        await knex("sales_order_details").insert({
            sales_order_id,
            dishes_id,
            quantity,
            value: price
        });
    }

    async updateOrder({ dishes_id, price, quantity, user_id, sales_order_id, old_price }) {
        const date = new Date();
        await knex("sales_order")
            .update({
                price: Number((old_price + (price * quantity)).toFixed(2)),
                update_date: date.toISOString()
            })
            .where({
                user_id: user_id,
                id: sales_order_id
            });

        const sales_order_details = await knex("sales_order_details").where({ sales_order_id, dishes_id });

        if (!sales_order_details.length) {
            await knex("sales_order_details").insert({
                sales_order_id,
                dishes_id,
                quantity,
                value: price
            });
        } else {
            await knex("sales_order_details")
                .update({
                    quantity: Number(quantity) + sales_order_details[0].quantity,
                    update_date: date.toISOString()
                })
                .where({ sales_order_id, dishes_id });
        }
    }

    async deleteOrder({ id, user_id }) {
        await knex('sales_order').delete().where({ id, user_id })
    }


    async updateOrderByDetails({ id, user_id, old_price, price }) {
        const date = new Date();
        await knex("sales_order").update({
            price: Number((old_price - price).toFixed(2)),
            update_date: date.toISOString()
        })
            .where({
                user_id: user_id,
                id: id
            });
    }

    async updateOrderPriceWithDetails({ id, user_id, salesValue, old_price, newPrice,operation  }) {
        const date = new Date();

        let updatedPrice;
        if (operation === 'add') {
            updatedPrice = Number((salesValue + (newPrice - old_price)).toFixed(2));
        } else if (operation === 'subtract') {
            updatedPrice = Number((salesValue - (old_price - newPrice)).toFixed(2));
        } else {
            throw new AppError("Operação inválida", 400);
        }

        await knex("sales_order").update({
            price: updatedPrice,
            update_date: date.toISOString()
        })
            .where({
                user_id: user_id,
                id: id
            });
    }
}

module.exports = SalesOrderRepository;