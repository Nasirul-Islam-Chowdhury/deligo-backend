import { User } from '../app/modules/users/user.model';
import config from '../config';
import { USER_ROLE } from '../enums/user';

export const seedAdmin = async () => {
  const email = config.admin_seed_email as string;
  const password = config.admin_seed_password as string;

  const exists = await User.findOne({ email });
  if (exists) {
    return;
  }

  await User.create({
    email,
    password,
    role: USER_ROLE.ADMIN,
    needsPasswordChange: false,
    status: 'in-progress',
    isDeleted: false,
  });
};


