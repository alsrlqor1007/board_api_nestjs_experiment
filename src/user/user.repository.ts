import { EntityRepository, Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(userDto: UserDto) {
        const { nickname, password } = userDto;
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt);

        const newUser = this.save({ nickname, password: hashed });

        return newUser;
    }
}