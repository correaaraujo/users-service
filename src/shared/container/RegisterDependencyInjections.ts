import UserService from '@domain/services/UserService';
import { UserRepository } from '@infra/repository/UserRepository';
import { container } from 'tsyringe'

import Logger from '@infra/Logger/Logger'

container.registerSingleton('logger', Logger)
container.registerInstance('userRepository', UserRepository)
container.registerInstance('userService', UserService)
