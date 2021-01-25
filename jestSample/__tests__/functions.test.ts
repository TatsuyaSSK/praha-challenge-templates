// todo: ここに単体テストを書いてみましょう！
import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from "../functions";

import { DatabaseMock } from "../util/index";
jest.mock("../util/index");
const MockedDatabase = DatabaseMock as jest.Mock;

import { NameApiService } from "../nameApiService";
jest.mock("../nameApiService");
const MockedNameApiService = NameApiService as jest.Mock;

test("1,1を渡して2を返す", () => {
  expect(sumOfArray([1, 1])).toBe(2);
});

test("1,2,3,4を渡して10を返す", () => {
  expect(sumOfArray([1, 2, 3, 4])).toBe(10);
});

test("空の配列を渡してエラーが返ってくる", () => {
  expect(sumOfArray([])).toBe(0);
});

/*
test("sumOfArray", () => {
  expect(() => sumOfArray(["a", "b"])).toThrow();
});
*/

test("1を渡して2を返す", () => {
  return asyncSumOfArray([1, 1]).then((result) => {
    expect(result).toBe(2);
  });
});

test("4を渡して10を返す", () => {
  return asyncSumOfArray([1, 2, 3, 4]).then((result) => {
    expect(result).toBe(10);
  });
});

test("空の配列を渡してエラーが返ってくる", () => {
  return asyncSumOfArray([]).then((result) => {
    expect(result).toBe(0);
  });
});

test("asyncSumOfArraySometimesZero", () => {
  const mockSave = jest.fn((numbers) => {
    throw "error";
  });
  MockedDatabase.mockImplementation(() => {
    return {
      save: mockSave,
    };
  });

  const DatabaseMocked = new DatabaseMock();
  return asyncSumOfArraySometimesZero([1, 1], DatabaseMocked).then((result) => {
    expect(result).toBe(0);
  });
});

test("asyncSumOfArraySometimesZero", () => {
  const mockSave = jest.fn((numbers) => console.log(numbers));
  MockedDatabase.mockImplementation(() => {
    return {
      save: mockSave,
    };
  });

  const DatabaseMocked = new DatabaseMock();
  return asyncSumOfArraySometimesZero([1, 1], DatabaseMocked).then((result) => {
    expect(result).toBe(2);
  });
});

test("asyncSumOfArraySometimesZero", () => {
  const mockSave = jest.fn((numbers) => console.log(numbers));
  MockedDatabase.mockImplementation(() => {
    return {
      save: mockSave,
    };
  });

  const DatabaseMocked = new DatabaseMock();
  return asyncSumOfArraySometimesZero([], DatabaseMocked).then((result) => {
    expect(result).toBe(0);
  });
});

test("getFirstNameThrowIfLong", () => {
  const mockgetFirstName = jest.fn(() => {
    return "aaa";
  });
  MockedNameApiService.mockImplementation(() => {
    return {
      getFirstName: mockgetFirstName,
    };
  });

  const NameApiServiceMocked = new NameApiService();
  return getFirstNameThrowIfLong(4, NameApiServiceMocked, {
    first_name: "aaa",
  }).then((result) => {
    expect(result).toBe("aaa");
  });
});

test("getFirstNameThrowIfLong", () => {
  const mockgetFirstName = jest.fn(() => {
    return "aaa";
  });
  MockedNameApiService.mockImplementation(() => {
    return {
      getFirstName: mockgetFirstName,
    };
  });

  const NameApiServiceMocked = new NameApiService();
  return expect(
    getFirstNameThrowIfLong(2, NameApiServiceMocked, { first_name: "aaa" })
  ).rejects.toThrow("first_name too long");
});
