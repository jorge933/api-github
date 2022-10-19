export class Utils {
  static bindModelToView(template: string, object: Object) {
    const objectEntries = Object.entries(object);

    const newTemplate = objectEntries.reduce((template, [key, value]) => {
      const regex = new RegExp(`{{ *${key}* }}`, "g");
      const newTemplate = template.replace(regex, value ?? "");
      return newTemplate;
    }, template);

    return newTemplate;
  }
}
