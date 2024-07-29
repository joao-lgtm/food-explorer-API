exports.up = knex => knex.schema.createTable("sales_order_details", table => {
    table.increments("id");
    table.integer("sales_order_id").references("id").inTable("sales_order").onDelete("CASCADE");
    table.integer("dishes_id").references("id").inTable("dishes");
    table.integer("quantity");
    table.text("value");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("update_date");
});

exports.down = knex => knex.schema.dropTable("sales_order_details");