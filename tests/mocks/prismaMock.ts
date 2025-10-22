type Fn = jest.Mock<any, any>;
export interface PrismaMock {
  users: {
    findFirst: Fn;
    create: Fn;
  };
  emailverification: {
    findFirst: Fn;
    create: Fn;
  };
}

export const prismaMock: PrismaMock = {
  users: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  emailverification: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

export const resetPrismaMock = () => {
  Object.values(prismaMock).forEach((model: any) => {
    Object.values(model).forEach((fn: any) => fn.mockReset());
  });
};