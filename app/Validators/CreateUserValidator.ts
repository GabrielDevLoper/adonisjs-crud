import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({}, [rules.required()]),
    cpf: schema.string({}, [
      rules.unique({ table: "usuarios", column: "cpf" }),
      rules.required(),
    ]),
    password: schema.string({}, [rules.required()]),
  });

  public messages = {
    required: "O campo {{ field }} é obrigatório para criar uma nova conta",
    "cpf.unique": "CPF já está em uso",
  };
}
