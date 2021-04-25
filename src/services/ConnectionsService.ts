import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnetionsRepository";

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private ConnectionsRepository: Repository<Connection>;
  constructor() {
    this.ConnectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  async create({ socket_id, id, admin_id, user_id }: IConnectionCreate) {
    const connection = this.ConnectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.ConnectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connetion = await this.ConnectionsRepository.findOne({
      user_id,
    });

    return connetion;
  }
}

export { ConnectionsService };
