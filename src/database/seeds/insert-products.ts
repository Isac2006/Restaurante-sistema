import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
          { name: 'Hambúrguer', price: 25 },
    { name: 'Pizza', price: 40 },
    { name: 'Refrigerante', price: 8 },
        
    ]);
};
