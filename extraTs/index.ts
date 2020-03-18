import { diamond } from './patterns/index';
import { equilateral } from './patterns/index';
import { hasPermission, validateUser } from './utils/index';
import { Iuser } from './interface';

diamond(10);
equilateral(8);
hasPermission('getUsers', 'trainer', 'write');

const user: Iuser[] = [
    {
        traineeEmail: 'trainee1@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech'
    },
    {
        traineeEmail: 'aryan.singhal@successive.tech',
        reviewerEmail: 'rahul.sadhukhan@successive.tech'
    },
    {
        traineeEmail: 'trainee1@gmail.com',
        reviewerEmail: 'reviewer1@hotmail.com'
    },
    {
        traineeEmail: 'Aman$2@successive.tech',
        reviewerEmail: 'vinay.chaudhary@successive.tech'
    }
];

validateUser(user);
