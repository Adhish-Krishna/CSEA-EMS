type Fn = jest.Mock<any, any>;
export interface PrismaMock {
  users: { findFirst: Fn; findMany: Fn; create: Fn; update: Fn; };
  emailverification: { findFirst: Fn; create: Fn; };
  usersecuritycode: { findFirst: Fn; create: Fn; update: Fn; };
  clubmembers: { findFirst: Fn; };
  globaladmins: { findFirst: Fn; create: Fn; };
  events: { findFirst: Fn; create: Fn; update: Fn; };
  organizingclubs: { create: Fn; };
  eventconvenors: { create: Fn; };
}

export const prismaMock: PrismaMock = {
  users: { findFirst: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
  emailverification: { findFirst: jest.fn(), create: jest.fn() },
  usersecuritycode: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn() },
  clubmembers: { findFirst: jest.fn() },
  globaladmins: { findFirst: jest.fn(), create: jest.fn() },
  events: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn() },
  organizingclubs: { create: jest.fn() },
  eventconvenors: { create: jest.fn() },
};

export const resetPrismaMock = () => {
  Object.values(prismaMock).forEach((model: any) => {
    Object.values(model).forEach((fn: any) => fn.mockReset());
  });
};