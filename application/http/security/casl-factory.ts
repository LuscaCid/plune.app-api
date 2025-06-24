import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility } from "@casl/ability";
import { User } from "../../../domain/models/user";

export enum Actions {
  Manage = "manage",
  Read = "read",
  Update = "update",
  Create = "create",
  Delete = "delete",
}

export type Subjects = InferSubjects<
  typeof User
> |
  "all";

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export class CaslFactory {
  static LOGIN_ERROR = "O usuáio necessita estar logado.";

  static defineAbilityForUser(user?: User) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

    //only additional validation for user authentication
    if (!user) {
      builder.cannot(Actions.Read, "all").because(CaslFactory.LOGIN_ERROR);
      builder.cannot(Actions.Delete, "all").because(CaslFactory.LOGIN_ERROR);
      builder.cannot(Actions.Create, "all").because(CaslFactory.LOGIN_ERROR);
      builder.cannot(Actions.Update, "all").because(CaslFactory.LOGIN_ERROR);
      builder.cannot(Actions.Manage, "all").because(CaslFactory.LOGIN_ERROR);
    }

    if (user && user.currentSelectedOrganization && user.currentSelectedOrganization.role == "Admin") {
      builder.can(Actions.Manage, "all");
    } else if (user) {
      builder.cannot(Actions.Create, "all").because("Apenas usuários Admin podem cadastrar");
      builder.can(Actions.Read, "all");
    }

    return builder.build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}