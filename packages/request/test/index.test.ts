import { request } from "../src/index";

let headers = {
  "x-access-token": "",
};
test("first test", async () => {
  const token = await request("/tenant-center/account/auth/password", {
    method: "POST",
    body: {
      account: "18402001413",
      captcha: { code: "" },
      inviteKey: "",
      loginEnterprise: "1448132942273982465",
      password: "12345678",
      rememberMe: "YES",
    },
  });
  console.log("beforeAll", token);
  expect(token).not.toBeNull();
  headers["x-access-token"] = token;
});

test("account test", async () => {
  const res = await request("/tenant-center/tenant/member", { method: "GET", headers });
  expect(res).toMatchObject({ account: "18402001413" });
});

test("user skin", async () => {
  const res = await request("/configuration/memberHabit/get", { method: "GET", headers, body: { key: "skin" } });
  expect(res).toBeDefined();
});

test("formdata test", () => {
  const formData = new FormData();
  formData.append("deptId", "");
  formData.append("memberId", "1298433602676252674");
  return expect(request("/tenant-center/department/checkMemberInDept", { method: "POST", headers, body: formData })).rejects.toMatchObject({
    code: 10093,
    success: false,
    data: null,
    message: "用户不在选中部门",
  });
});

test("no permission", () => {
  expect(request("/tenant-center/tenant/member")).rejects.toMatchObject({
    code: 3001,
    success: false,
    data: null,
    message: "无访问权限。",
  });
});
