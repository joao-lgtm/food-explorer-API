const knex = require('../database/knex');

class SalesOrderDetailsRepository {

    async findByid({ sales_order_id, user_id }) {
        const details = await knex("sales_order_details")
            .innerJoin("sales_order", "sales_order_details.sales_order_id", "sales_order.id")
            .innerJoin("dishes", "sales_order_details.dishes_id", "dishes.id")
            .where({ "sales_order.id": sales_order_id, "sales_order.user_id": user_id })
            .select(
                "sales_order_details.id as details_id",
                "sales_order_details.sales_order_id",
                "sales_order_details.dishes_id",
                "sales_order_details.quantity",
                "sales_order_details.value",
                "sales_order_details.created_at",
                "sales_order_details.update_date",
                "sales_order.user_id",
                "sales_order.price as order_price",
                "sales_order.status",
                "dishes.img",
                "dishes.name",
                "dishes.category_id",
                "dishes.price as dish_price",
                "dishes.description"
            );

        return details;

    }

    async deleteDetails({ id }) {
        const sales_order = await knex("sales_order_details").delete().where({ id });

        return sales_order;
    }

    async updateDetails({ sales_order_id, id, quantity }) {
        await knex("sales_order_details").update({
            quantity,
        }).where({
            id,
            sales_order_id
        })
    }


}

module.exports = SalesOrderDetailsRepository;