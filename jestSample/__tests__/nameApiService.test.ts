import { NameApiService } from "../nameApiService";

test("NameApiService", () => {
  const nameApi = new NameApiService();
  return nameApi.getFirstName({ first_name: "aaa" }).then((result) => {
    expect(result).toBe("aaa");
  });
});

test("NameApiService", () => {
  const nameApi = new NameApiService();
  return expect(
    nameApi.getFirstName({ first_name: "aaaaaaaa" })
  ).rejects.toThrow("firstName is too long!");
});
