exports.up = knex => knex.schema.createTable("address", table => {
    table.increments("id");
    table.text("street").notNullable();
    table.text("neighborhood").notNullable();
    table.text("number").notNullable();
    table.text("city").notNullable();     
    table.text("uf").notNullable();  
    table.text("zipcode").notNullable();
    table.integer("user_id").references("id").inTable("users").notNullable();
});
 
exports.down = knex => knex.schema.dropTable("address");