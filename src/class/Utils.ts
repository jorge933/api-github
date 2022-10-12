import { Repository } from "../models/repository.model";

type UnionRepos = { finalDate: string; langClass: string };

export class Utils {
  static bindModelToView(template: string, object: Repository | UnionRepos) {
    const objectEntries = Object.entries(object);

    const newTemplate = objectEntries.reduce((template, [key, value]) => {
      const regex = new RegExp(`{{ *${key}* }}`, "g");
      const newTemplate = template.replace(regex, value ?? "");
      return newTemplate;
    }, template);

    return newTemplate;
  }
}
