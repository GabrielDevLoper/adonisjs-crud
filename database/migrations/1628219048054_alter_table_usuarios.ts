import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AlterTableUsuarios extends BaseSchema {
  protected tableName = "usuarios";

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string("password", 180).notNullable().after("cpf");
      table.string("remember_me_token").nullable().after("password");
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumns("password", "remember_me_token");
    });
  }
}
