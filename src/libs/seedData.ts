import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';

const seedData = async () => {
  const user = {
    name: 'Vinay Chaudhary',
    address: 'Ghaziabad',
    email: 'vinay.chaudhary@successive.tech',
    dob: '07/25/1998',
    mob: 7789839178,
    hobbies: ['watching movies', 'hiking'],
    role: 'head-trainer'
  };

  try {
    const count = await UserRepository.count();
    if (count === 0) {
      const { password } = config;
      const hash = await bcrypt.hash(password, 10);
      UserRepository.create(undefined, { ...user, password: hash });
      console.log('Data seeded');
    }
    else
      console.log(`Data is already seeded`);
  } catch (err) {
    throw err;
  }
};

export default seedData;
