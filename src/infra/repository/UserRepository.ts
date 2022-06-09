import User from './../../domain/model/User';
import { container } from 'tsyringe';
import { BaseRepository } from './base/BaseRepository'
import { IUserRepository } from '@infra/repository/interfaces/IUserRepository'

export class UserRepository extends BaseRepository implements IUserRepository {

  create = async (user: User) => await this.repository.user.create(
    {
      data: {
        name: "",
        email: "",
        password: "",
        status: "",
        type: "",
        updatedAt: undefined,
        profileId: ""
      }
    })
  update = async (user: any) => await this.repository.user.update({ where: { id: user.id }, data: user })
  delete = async (user: User) => await this.repository.user.update({ where: { id: user.id }, data: { status: 'DELETED' } })
  find = async () => await this.repository.user.findFirst()
  list = async () => await this.repository.user.findMany()
}

