type Fn = jest.Mock<any, any>;
export interface PrismaMock {
  users: {
    findFirst: Fn;
    create: Fn;
    update: Fn;
  };
  emailverification: {
    findFirst: Fn;
    create: Fn;
  };
  usersecuritycode: {
    findFirst: Fn;
    create: Fn;
    update: Fn;
  };
  clubmembers: {
    findFirst: Fn;
  };
}

export const prismaMock: PrismaMock = {
  users: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  emailverification: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  usersecuritycode: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  clubmembers: {
    findFirst: jest.fn(),
  },
};

export const resetPrismaMock = () => {
  Object.values(prismaMock).forEach((model: any) => {
    Object.values(model).forEach((fn: any) => fn.mockReset());
  });
};