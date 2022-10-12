import { Repository } from "../models/repository.model";
import { User } from "../models/user.models";

type UnionRepos = { finalDate: string; langClass: string };
type ObjectType = Repository | UnionRepos | User;

export class Utils {
  static bindModelToView(template: string, object: ObjectType) {
    const objectEntries = Object.entries(object);

    const newTemplate = objectEntries.reduce((template, [key, value]) => {
      const regex = new RegExp(`{{ *${key}* }}`, "g");
      const newTemplate = template.replace(regex, value ?? "");
      return newTemplate;
    }, template);

    return newTemplate;
  }
}
