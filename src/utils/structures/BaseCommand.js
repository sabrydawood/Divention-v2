


module.exports = class BaseCommand {
  constructor(name, category, aliases, nsfwOnly, ownerOnly, cooldown, options) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.nsfwOnly = Boolean(nsfwOnly);
    this.ownerOnly = Boolean(ownerOnly);
    this.cooldown = Number(cooldown)
    this.options = options
  }
}