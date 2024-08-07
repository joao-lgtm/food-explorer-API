exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("img");
    table.text("name");
    table.integer("category_id").references("id").inTable("categorys");
    table.text("price");
    table.text("description");
    table.timestamp("created_at").default(knex.fn.now());
});
exports.down = knex => knex.schema.dropTable("dishes"); 