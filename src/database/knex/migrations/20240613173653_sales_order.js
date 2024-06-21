exports.up = knex => knex.schema.createTable("sales_order", table => {
    table.increments("id");
    table.float("price");
    table.integer("user_id").references("id").inTable("users");
    table.integer("status").defaultTo(0); // status 0 - pending, status 1 - confirmed, status 2 - cancelled
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("update_date").default(null);
});

exports.down = knex => knex.schema.dropTable("sales_order");