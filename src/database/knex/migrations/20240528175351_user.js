exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("email").notNullable().unique();
    table.text("password").notNullable();
    table.text("address").notNullable();
    table.text("neighborhood").notNullable();
    table.text("number").notNullable();
    table.text("zipcode").notNullable();
    table.text("avatar");
    table.enu("role", ["admin", "client"]).notNullable().defaultTo("client");
    table.timestamp("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");
