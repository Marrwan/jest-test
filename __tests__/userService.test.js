const { getUserByEmail, createUser, deleteUser, updateUser, assignUser } = require('../userService');
const { User } = require('../db');
const { mockDeep } = require('jest-mock-extended');

jest.mock('../db');

describe('User Service', () => {
  let mockUser;

  beforeEach(() => {
    mockUser = mockDeep();
    User.findOne = mockUser.findOne;
    User.create = mockUser.create;
    User.destroy = mockUser.destroy;
    User.update = mockUser.update;

  });

  it('should return a user by email', async () => {
    const mockEmail = 'test@example.com';
    const mockUserData = { name: 'Test User', email: mockEmail };

    mockUser.findOne.mockResolvedValue(mockUserData);

    const user = await getUserByEmail(mockEmail);
    console.log({user});
    expect(user).toEqual(mockUserData);
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockEmail } });
  });

  it('should create a new user', async () => {
    const newUserData = { name: 'New User', email: 'newuser@example.com' };
    mockUser.create.mockResolvedValue(newUserData);

    const user = await createUser(newUserData);
    expect(user).toEqual(newUserData);
    expect(User.create).toHaveBeenCalledWith(newUserData);
  });

  it('should delete a user by email', async () => {
    const mockEmail = 'test@example.com';
    mockUser.destroy.mockResolvedValue(1); 

    const result = await deleteUser(mockEmail);
    expect(result).toBe(1);
    expect(User.destroy).toHaveBeenCalledWith({ where: { email: mockEmail } });
  });

  it('should update a user by email', async () => {
    const mockEmail = 'test@example.com';
    const newUserData = { name: 'Updated User' };
    mockUser.update.mockResolvedValue([1]); 

    const result = await updateUser(mockEmail, newUserData);
    expect(result).toEqual([1]);
    expect(User.update).toHaveBeenCalledWith(newUserData, { where: { email: mockEmail } });
  });

  it('Should assign user', async()=>{
    const mockEmail = 'test@example.com';
    const mockClient = {number: 2};
    const mockUserData = {name: 'Test User', email: mockEmail};
    mockUser.findOne.mockResolvedValue(mockUserData);
    const result = await assignUser(mockEmail, mockClient)
    console.log({result});
    expect(result.clients).toEqual(mockClient)
  })
});
