const frisby = require("frisby"); //frisbyを読み込む

//APIのURLを指定
const api_url = "https://script.google.com/macros/s/AKfycbx2yRBfrP0hX2iQ61G8UNkE1tHUzkOSEoxMjK6eHVEtY-I9tHvF3n-IrY5jYS2SJ-X9/exec";

//正常系
it("GAS APIテスト：正常", async () => {
    const res = await frisby.post(api_url, {
        body: "email=test@test.local&body=foooooo&channel=unit-test",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("受付けました。");
});

//Email不正
it("GAS APIテスト：Email不正", async () => {
    const res = await frisby.post(api_url, {
        body: "email=test&body=foooooo&channel=unit-test",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("エラーです。");
});

//問い合わせ不正
it("GAS APIテスト：問合せ内容不正", async () => {
    const res = await frisby.post(api_url, {
        body: "email=test@test.local&body=foooooooooooooo&channel=unit-test",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("エラーです。");
});

//値が空の不正
it("GAS APIテスト：値が空", async () => {
    const res = await frisby.post(api_url, {
        body: "",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("エラーです。");
});