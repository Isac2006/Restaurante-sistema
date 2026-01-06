import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary(); // Use ; no final de cada linha dentro da função
    table.string('name').notNullable();
    table.decimal('price').notNullable(); // 10 dígitos no total, 2 decimais
    
    // O método table.timestamps(true, true) cria created_at e updated_at automaticamente
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products');
}