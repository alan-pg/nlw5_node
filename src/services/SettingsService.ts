import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingRepository);
  }

  async create({ chat, username }: ISettingsCreate) {
    const userExists = await this.settingsRepository.findOne({
      username,
    });

    if (userExists) {
      throw new Error("User already exists.");
    }
    const settings = this.settingsRepository.create({
      chat,
      username,
    });

    await this.settingsRepository.save(settings);

    return settings;
  }

  async findByUsername(username: string) {
    const settins = await this.settingsRepository.findOne({ username });
    return settins;
  }

  async update(username: string, chat: boolean) {
    const settings = await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", {
        username,
      })
      .execute();
  }
}

export { SettingsService };
